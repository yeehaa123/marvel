(function(){

  var currentHero = {};
  var allCharacters;

  function setCurrentHero(hero){
    currentHero = hero;
    render(allCharacters, currentHero);
  }

  window.UI = {
    render: render
  };


  var SidebarItem = React.createClass({
    handleClick: function(){
      currentHero = setCurrentHero(this.props.character);
    },
    render: function(){
      var character = this.props.character;
      return (
        React.createElement('li', { onClick: this.handleClick },
          React.createElement('img', {src: character.url}),
          React.createElement('p', null, character.name)
        )
      )
    }
  });

  var Sidebar = React.createClass({
    render: function(){
      var list = _.map(this.props.characters, function(character, index){
        return React.createElement(SidebarItem, { key: index, character: character })
      });
      return (
        React.createElement('section', {id: 'sidebar'},
          React.createElement('ul', null, list)
        )
      )
    }
  });

  var EventsHeaderRow = React.createClass({
    render: function(){
      return (
        React.createElement('tr', null,
          React.createElement('th', { colSpan: 2 }, 'Events')
        )
      )
    }
  });

  var EventsRow = React.createClass({
    render: function(){
      return (
        React.createElement('tr', null,
          React.createElement('td', { colSpan: 2 }, this.props.title)
        )
      )
    }
  })

  var EventsTable = React.createClass({

    render: function(){
      var events = this.props.events.items;

      if(events.length < 1){
        return null;
      }

      var rows = _.map(events, function(event, index){
        return React.createElement(EventsRow, { key: index, title: event })
      });

      return (
        React.createElement('table', null,
          React.createElement(EventsHeaderRow, null),
          React.createElement('tbody', null, rows)
        )
      );
    }
  })

  var Main = React.createClass({
    render: function(){
      var hero = this.props.hero;
      var name = this.props.hero ? this.props.hero.name : '';
      if(!name){
        return (
          React.createElement('section', { id: 'placeholder' },
            React.createElement('h1', null, 'Please Select Your Hero')
          )
        )
      }
      return (
        React.createElement('section', { id: 'profile' },
          React.createElement('img', { src: hero.url }),
          React.createElement('h1', null, hero.name),
          React.createElement(EventsTable, { events: hero.events })
        )
      )
    }
  });

  var App = React.createClass({
    render: function(){
      return (
        React.createElement('div', {id: 'content' },
          React.createElement(Sidebar, { characters: this.props.characters }),
          React.createElement(Main,  { hero: this.props.hero})
      ))
    }
  });

  function render(characters, currentHero){
    allCharacters = characters;
    React.render(
      React.createElement(App, { characters: characters, hero: currentHero}),
      document.querySelector('#content')
    );
  }

})();
