(function(){

  API.getCharacters()
    .then(selectData)
    .then(render);

  function selectData(characters){
    return _.chain(characters)
      .map(createThumbnailUrl)
      .sample(50)
      .value();
  }

  function render(characters){
    UI.render(characters);
  }

  function createThumbnailUrl(character){
    var url;
    if(character.thumbnail){
      url = character.thumbnail.path + '.' + character.thumbnail.extension;
    } else {
      url = 'https://www.histography.com/static/images/person.7.jpg';
    }
    character.url = url;
    return character;
  };

})();
