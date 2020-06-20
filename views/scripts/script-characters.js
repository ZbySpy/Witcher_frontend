const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const OneCharacterValue = document.getElementById('character_name');
const OneCharacterButton = document.getElementById('OneCharacterButton');

const getCharacters = async () => {
  myContainer.innerHTML = '';
  let request = '';
  if (OneCharacterValue.value) {
    request = 'https://witcher-project.herokuapp.com/table/characters/'+OneCharacterValue.value;
  }else{
    request = 'https://witcher-project.herokuapp.com/table/characters/';
  }
  const response = await fetch(request);
  const myJson = await response.json();

  myJson.forEach(element => {
    const newElem = document.createElement('div');
    const description = document.createElement('div');
    const name = document.createElement('div');
    const gender = document.createElement('div');
    const nationality = document.createElement('div');
    const race = document.createElement('div');
    const deleteButton = document.createElement('button');

    myContainer.appendChild(newElem);

    newElem.className = 'card';
    name.className = 'card-title';
    description.className = 'list-group-item';
    gender.className = 'list-group-item';
    nationality.className = 'list-group-item';
    race.className = 'list-group-item';
    
    deleteButton.className = 'btn btn-danger deleteAction';
    deleteButton.innerHTML = "Delete";
    deleteButton.value = element.name;

    name.innerHTML = element.name;
    description.innerHTML = "<b>Description: </b>"+element.description;
    gender.innerHTML = "<b>Gender: </b>"+element.gender;
    nationality.innerHTML = "<b>Nationality: </b>"+element.nationality;
    race.innerHTML = "<b>Race: </b>"+element.race;

    newElem.appendChild(name);
    newElem.appendChild(description);
    newElem.appendChild(gender);
    newElem.appendChild(nationality);
    newElem.appendChild(race);
    newElem.appendChild(deleteButton);
  });
  deleteFunc();
}
OneCharacterButton.addEventListener('click', getCharacters);

function deleteFunc(){

  const del = document.getElementsByClassName('btn btn-danger deleteAction');
  for (let index = 0; index < del.length; index++) {
    console.log(del[index]);
    del[index].addEventListener('click', ()=>{
          deleteElement(del[index].value);
        });
  }
}

function deleteElement(characterName){
  fetch('https://witcher-project.herokuapp.com/admin/characters/' + characterName, {
    method: 'DELETE'
  });
  setTimeout(getCharacters,500);
}