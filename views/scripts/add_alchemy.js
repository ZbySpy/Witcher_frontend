const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const newDesc = document.getElementById('description');
const newName = document.getElementById('name');
const newType = document.getElementById('type');
const newAcqu = document.getElementById('acquisition');
const newLocalization = document.getElementById('localization');

const addAlchemy = document.getElementById('addAL');

 
function addElement(){
  fetch('https://witcher-project.herokuapp.com/admin/alchemies/', {
    method:"POST",
    body: JSON.stringify({name: newName.value,
      localization: newLocalization.value,
      description: newDesc.value,
      type: newType.value,
      acquisition: newAcqu.value,
       })
      })
      setTimeout(500);
      
    }
  
    addAlchemy.addEventListener('click', addElement);