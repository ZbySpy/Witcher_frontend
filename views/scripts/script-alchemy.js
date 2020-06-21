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
    const editButton = document.createElement('button');

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

    editButton.className = 'btn btn-info editAction';
    editButton.innerHTML = "Edit";
    editButton.value = element.name;

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
    newElem.appendChild(editButton);
  });
  deleteFunc();
  editFunction();
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


function editFunction(){
  const editButton = document.getElementsByClassName('btn btn-info editAction');
  for (let index = 0; index < editButton.length; index++) {
      editButton[index].addEventListener('click', ()=>{
          generateForm(editButton[index].value);
          });
    }
}

function generateForm(alchemyName){
  myContainer.innerHTML = '';
  var newName = document.createElement('input');
  var newAcqu = document.createElement('input');
  var newDesc = document.createElement('input');
  var newLocali = document.createElement('input');
  var newLoot = document.createElement('input');
  
  var newCarddo = document.createElement('div');

  newName.placeholder = 'name';
  newName.value = alchemyName;
  newAcqu.placeholder = 'acquisition';
  newDesc.placeholder = 'description';
  newLocali.placeholder = 'localization';
  newLoot.placeholder = 'loot';
  newCarddo.class ='card-body';

  
  myContainer.appendChild(newCarddo);
  myContainer.appendChild(newName);
  myContainer.appendChild(newAcqu);
  myContainer.appendChild(newDesc);
  myContainer.appendChild(newLocali);
  myContainer.appendChild(newLoot);

  const submitEditButton = document.createElement('button');
  submitEditButton.innerHTML = 'Edit';
  submitEditButton.id = 'submitEditButton';
  myContainer.appendChild(submitEditButton);

  submitEditButton.addEventListener('click', () => {
    editAlchemies(alchemyName, newName, newAcqu, newDesc, newLocali, newLoot);
});
}

function editAlchemies(alchemyName, newName, newAcqu, newDesc, newLocali, newLoot){
  fetch('https://witcher-project.herokuapp.com/admin/change/alchemies/' + alchemyName, {
  method: 'POST',
  body: JSON.stringify({name: newName.value,
      description: newDesc.value,
      acquisition: newAcqu.value,
      localization: newLocali.value,
      loot: newLoot.value
      })
});
setTimeout(getAlchemy,500);
}