(function(){
  API.getCharacters()
    .then(selectData)
    .then(createList);

  function selectData(characters){
    return _.chain(characters)
      .sample(50)
      .value();
  }

  function createList(superheroes){
    var template = document.querySelector('#names');
    var list = document.querySelector('#list');

    _.each(superheroes, function(superhero){
      createListItem(superhero, template, list);
    });
  }

  function createListItem(superhero, template, insertionPoint){
    var thumbnail = superhero.thumbnail;
    var clone = document.importNode(template.content, true);
    var url;

    if(thumbnail){
      url = thumbnail.path + '.' + thumbnail.extension;
    } else {
      url = 'http://www.istar.ac.uk/wp-content/themes/iSTARMB/library/img/headshot_placeholder.jpg';
    }

    clone.querySelector('li p').textContent = superhero.name;
    clone.querySelector('li img').src = url;
    insertionPoint.appendChild(clone);
  };
})();
