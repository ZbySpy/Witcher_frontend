//const monsterButton = document.getElementById('monsterButton');
const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const newDesc = document.getElementById('description');
const newName = document.getElementById('name');
const newFlag = document.getElementById('flag');
const newRuler = document.getElementById('ruler');
const newCapital = document.getElementById('capital');
const addCountry = document.getElementById('addCN');

 
function addElement(){
  fetch('https://witcher-project.herokuapp.com/admin/countries/', {
    method:"POST",
    body: JSON.stringify({name: newName.value,
      capital: newCapital.value,
      description: newDesc.value,
      flag: newFlag.value,
      ruler: newRuler.value,
       })
      })
      setTimeout(500);
    }
  
    addCountry.addEventListener('click', addElement);