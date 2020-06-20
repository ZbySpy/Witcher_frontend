const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const newDesc = document.getElementById('description');
const newName = document.getElementById('name');
const newGender = document.getElementById('gender');
const newRace = document.getElementById('race');
const newNatio = document.getElementById('nationality');

const addCharacter = document.getElementById('addCH');
 
function addElement(){
  fetch('https://witcher-project.herokuapp.com/admin/characters/', {
    method:"POST",
    body: JSON.stringify({name: newName.value,
      nationality: newNatio.value,
      description: newDesc.value,
      gender: newGender.value,
      race: newRace.value,
       })
      })
      
    }
  
addCharacter.addEventListener('click', addElement);