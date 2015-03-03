(function(){
  var currentCharacter;

  window.UI = {
    render: render
  }

  var Sidebar = React.createClass({
    render: function(){
      var list = _.map(this.props.characters, function(character){
        var thumbnail = character.thumbnail;
        var thumbnailUrl = thumbnail ? thumbnail.path + '.' + thumbnail.extension : '';
        return (
          React.createElement('li', { key: character.id },
            React.createElement('img', {src: thumbnailUrl}),
            React.createElement('p', null, character.name)
          )
        )
      });
      return (
        React.createElement('ul', null, list)
      )
    }

  });

  function render(characters){
    React.render(
        React.createElement(Sidebar, {characters: characters}), 
        document.querySelector('#sidebar')
    );
  }
})();
