const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const OneAlchemyValue = document.getElementById('alchemy_name');
const OneAlchemyButton = document.getElementById('OneAlchemyButton');

const getAlchemy = async () => {
  myContainer.innerHTML = '';
  let request = '';
  if (OneAlchemyValue.value) {
    request = 'https://witcher-project.herokuapp.com/table/alchemies/'+OneAlchemyValue.value;
  }else{
    request = 'https://witcher-project.herokuapp.com/table/alchemies/';
  }
  const response = await fetch(request);
  const myJson = await response.json();

  myJson.forEach(element => {
    const newElem = document.createElement('div');
    const description = document.createElement('div');
    const name = document.createElement('div');
    const myClass = document.createElement('div');
    const localization = document.createElement('div');
    const loot = document.createElement('div');
    const acquisition = document.createElement('div');
    const deleteButton = document.createElement('button');

    myContainer.appendChild(newElem);

    newElem.className = 'card';
    name.className = 'card-title';
    description.className = 'list-group-item';
    myClass.className = 'list-group-item';
    localization.className = 'list-group-item';
    loot.className = 'list-group-item';
    acquisition.className = 'list-group-item';
    deleteButton.className = 'btn btn-danger deleteAction';
    deleteButton.innerHTML = "Delete";
    deleteButton.value = element.name;

    name.innerHTML = element.name;
    description.innerHTML = "<b>Description: </b>"+element.description;
    myClass.innerHTML = "<b>Class: </b>"+element.class;
    localization.innerHTML = "<b>Localization: </b>"+element.localization;
    loot.innerHTML = "<b>Loot: </b>"+element.loot;
    acquisition.innerHTML = "<b>Vunerable to: </b>"+element.acquisition;

    newElem.appendChild(name);
    newElem.appendChild(description);
    newElem.appendChild(myClass);
    newElem.appendChild(localization);
    newElem.appendChild(acquisition);
    newElem.appendChild(loot);
    newElem.appendChild(deleteButton);
  });
  deleteFunc();
}

OneAlchemyButton.addEventListener('click', getAlchemy);

function deleteFunc(){

  const del = document.getElementsByClassName('btn btn-danger deleteAction');
  for (let index = 0; index < del.length; index++) {
    console.log(del[index]);
    del[index].addEventListener('click', ()=>{
          deleteElement(del[index].value);
        });
  }
}

function deleteElement(alchemyName){
  fetch('https://witcher-project.herokuapp.com/admin/alchemies/' + alchemyName, {
    method: 'DELETE'
  });
  setTimeout(getAlchemy,500);
}