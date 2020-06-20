const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const OneMonsterValue = document.getElementById('monster_name');
const OneMonsterButton = document.getElementById('OneMonsterButton');

const getMonsters = async () => {
  myContainer.innerHTML = '';
  let request = '';
  if (OneMonsterValue.value) {
    request = 'https://witcher-project.herokuapp.com/table/monsters/'+OneMonsterValue.value;
  }else{
    request = 'https://witcher-project.herokuapp.com/table/monsters/';
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
    const vunerableTo = document.createElement('div');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    myContainer.appendChild(newElem);

    newElem.className = 'card';
    name.className = 'card-title';
    description.className = 'list-group-item';
    myClass.className = 'list-group-item';
    localization.className = 'list-group-item';
    loot.className = 'list-group-item';
    vunerableTo.className = 'list-group-item';

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
    vunerableTo.innerHTML = "<b>Vunerable to: </b>"+element.vunerableTo;

    newElem.appendChild(name);
    newElem.appendChild(description);
    newElem.appendChild(myClass);
    newElem.appendChild(localization);
    newElem.appendChild(vunerableTo);
    newElem.appendChild(loot);
    newElem.appendChild(deleteButton);
    newElem.appendChild(editButton);
  });
  deleteFunc();
}

OneMonsterButton.addEventListener('click', getMonsters);

function deleteFunc(){
  const del = document.getElementsByClassName('btn btn-danger deleteAction');

  for (let index = 0; index < del.length; index++) {
    console.log(del[index]);
    del[index].addEventListener('click', ()=>{
          deleteElement(del[index].value);
        });
  }
}

function deleteElement(monsterName){
  fetch('https://witcher-project.herokuapp.com/admin/monsters/' + monsterName, {
    method: 'DELETE'
  });
  setTimeout(getMonsters,500);
}

function editFunc(){
  const del = document.getElementsByClassName('btn btn-info editAction');

  for (let index = 0; index < del.length; index++) {
    console.log(del[index]);
    del[index].addEventListener('click', ()=>{
          deleteElement(del[index].value);
        });
  }
}