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

  var Item = React.createClass({
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
        return React.createElement(Item, { key: index, character: character })
      });
      return (
        React.createElement('section', {id: 'sidebar'},
          React.createElement('ul', null, list)
        )
      )
    }
  });

  var Main = React.createClass({
    render: function(){
      var name = this.props.hero ? this.props.hero.name : '';
      if(!name){
        React.createElement('section', { id: 'main' })
      }
      return (
        React.createElement('section', { id: 'main' },
          React.createElement('h1', null, name),
          React.createElement('h2', null, this.props.hero)
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
