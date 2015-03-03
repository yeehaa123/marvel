(function(){
  var currentCharacter = {};
  API.getCharacters()
    .then(selectData)
    .then(render);

  function render(characters){
    UI.render(characters);
  }

  function selectData(characters){
    return _.chain(characters)
      .sample(50)
      .value();
  }
})();
