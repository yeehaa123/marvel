(function(){
  window.UI = {
    render: renderItems 
  };

  function renderItems(characters){
    _.each(characters, function(character){
      renderItem(character);
    });
  }

  function renderItem(character){
    var template = document.querySelector('#names');
    var insertionPoint = document.querySelector('#list');
    var clone = document.importNode(template.content, true);
    clone.querySelector('p').textContent = character.name;
    clone.querySelector('img').src = character.url; 
    insertionPoint.appendChild(clone);
  }
})();
