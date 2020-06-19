const monsterButton = document.getElementById('monsterButton');
const desc = document.getElementById('desc');
const body = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');

const getAlchemy = async () => {
    const response = await fetch('https://witcher-project.herokuapp.com/table/alchemies');
    const myJson = await response.json();
  
    myJson.forEach(element => {
      const newElem = document.createElement('div');
      const description = document.createElement('div');
      const name = document.createElement('div');
      const myType = document.createElement('div');
      const localization = document.createElement('div');
      const acquisition = document.createElement('div');
  
      body.appendChild(newElem);
  
      newElem.className = 'card';
      name.className = 'card-title';
      description.className = 'list-group-item';
      myType.className = 'list-group-item';
      localization.className = 'list-group-item';
      acquisition.className = 'list-group-item';
      
  
      name.innerHTML = "<b>Name: </b>"+element.name;
      description.innerHTML = "<b>Description: </b>"+element.description;
      myType.innerHTML = "<b>Class: </b>"+element.type;
      localization.innerHTML = "<b>Localization: </b>"+element.localization;
      acquisition.innerHTML = "<b>Loot: </b>"+element.acquisition;
  
      newElem.appendChild(name);
      newElem.appendChild(description);
      newElem.appendChild(myType);
      newElem.appendChild(localization);
      newElem.appendChild(acquisition);
    });
  
  }