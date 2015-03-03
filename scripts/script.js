(function(){
  getCharacters()
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


  function getCharacterData(character){
    return _.pick(character, ['name', 'thumbnail']);
  }

  function getCharacters(){
    var total = 10000000;
    var offset;
    var auth = '&apikey=41504f332618087ba70eda07a2838ae1&hash=3380849e7affdd80dcf2c95f85ab51b1&ts=1';
    var baseUrl = 'http://gateway.marvel.com:80/v1/public/characters?';
    var limit = 1;
    var offset = 0;
    var url = baseUrl + 'limit=' + limit + '&offset=' + offset + auth;
    var characters = localStorage.getItem('superheroes');

    if(characters){
      return Promise.resolve(JSON.parse(characters));
    }

    return fetch(url)
      .then(getMetaData)
      .then(setTotal)
      .then(createUrls)
      .then(createPromises)
      .then(getAllData)
      .then(flattenData)
      .then(cacheData);

      function getMetaData(response){
        return response.json();
      }

      function setTotal(object){
        total = object.data.total;
        return total;
      }

      function createUrls(total){
        limit = 100;
        var urls = [];
        while(offset < total){
          var url = baseUrl + 'limit=' + limit + '&offset=' + offset + auth;
          urls.push(url);
          offset = offset + 100;
        }
        return urls;
      }

      function getAllData(promises){
        return Promise.all(promises).then(function(data){
          return data.map(function(object){
            return object.data.results;
          })
        });
      }

      function createPromises(urls){
        return urls.map(function(url){
          return fetch(url).then(function(response){
            return response.json();
          });
        });
      }

      function flattenData(data){
        return _.flatten(data);
      }

      function cacheData(data){
        var stringifiedData = JSON.stringify(data);
        localStorage.setItem('superheroes', stringifiedData)
        return data;
      }
  };
})();
