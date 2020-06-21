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
  editFunction();
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


function editFunction(){
    const editButton = document.getElementsByClassName('btn btn-info editAction');
    for (let index = 0; index < editButton.length; index++) {
        editButton[index].addEventListener('click', ()=>{
            generateForm(editButton[index].value);
            });
      }
}

function generateForm(monsterName){
    myContainer.innerHTML = '';
    var newName = document.createElement('input');
    var newClass = document.createElement('input');
    var newDesc = document.createElement('input');
    var newLocaliz = document.createElement('input');
    var newLoot = document.createElement('input');
    var newVun = document.createElement('input');

    newName.placeholder = 'name';
    newName.value = monsterName;
    newClass.placeholder = 'class';
    newDesc.placeholder = 'description';
    newLocaliz.placeholder = 'localization';
    newLoot.placeholder = 'loot';
    newVun.placeholder = 'vunerable to';

    myContainer.appendChild(newName);
    myContainer.appendChild(newClass);
    myContainer.appendChild(newDesc);
    myContainer.appendChild(newLocaliz);
    myContainer.appendChild(newLoot);
    myContainer.appendChild(newVun);

    const submitEditButton = document.createElement('button');
    submitEditButton.innerHTML = 'Edit';
    submitEditButton.id = 'submitEditButton';
    myContainer.appendChild(submitEditButton);

    submitEditButton.addEventListener('click', () => {
      editMonster(monsterName, newName, newClass, newDesc, newLocaliz, newLoot, newVun);
  });
}

function editMonster(monsterName, newName, newClass, newDesc, newLocaliz, newLoot, newVun){
    fetch('https://witcher-project.herokuapp.com/admin/change/monsters/' + monsterName, {
    method: 'POST',
    body: JSON.stringify({name: newName.value,
        class: newClass.value,
        description: newDesc.value,
        localization: newLocaliz.value,
        loot: newLoot.value,
        vunerableTo: newVun.value
        })
  });
  setTimeout(getMonsters,500);
  //window.location.replace("monster.html");
}