const desc = document.getElementById('desc');
const myContainer = document.getElementById('div_container');
const myDiv = document.getElementById('myDiv');
const myDiv2 = document.getElementById('myDiv2');
const md = document.getElementById('main_div');
const myBody = document.getElementById('body');

const OneCountryValue = document.getElementById('country_name');
const OneCountryButton = document.getElementById('OneCountryButton');

const getCountries = async () => {
  myContainer.innerHTML = '';
  let request = '';
  if (OneCountryValue.value) {
    request = 'https://witcher-project.herokuapp.com/table/countries/'+OneCountryValue.value;
  }else{
    request = 'https://witcher-project.herokuapp.com/table/countries/';
  }
  const response = await fetch(request);
  const myJson = await response.json();

  myJson.forEach(element => {
    const newElem = document.createElement('div');
    const description = document.createElement('div');
    const name = document.createElement('div');
    const capital = document.createElement('div');
    const flag = document.createElement('div');
    const ruler = document.createElement('div');
    const deleteButton = document.createElement('button');
    const editButton = document.createElement('button');

    myContainer.appendChild(newElem);

    newElem.className = 'card';
    name.className = 'card-title';
    description.className = 'list-group-item';
    capital.className = 'list-group-item';
    flag.className = 'list-group-item';
    ruler.className = 'list-group-item';
    
    deleteButton.className = 'btn btn-danger deleteAction';
    deleteButton.innerHTML = "Delete";
    deleteButton.value = element.name;

    editButton.className = 'btn btn-info editAction';
    editButton.innerHTML = "Edit";
    editButton.value = element.name;

    name.innerHTML = element.name;
    description.innerHTML = "<b>Description: </b>"+element.description;
    capital.innerHTML = "<b>Class: </b>"+element.capital;
    flag.innerHTML = "<b>Flag: </b>"+element.flag;
    ruler.innerHTML = "<b>Ruler: </b>"+element.ruler;

    newElem.appendChild(name);
    newElem.appendChild(description);
    newElem.appendChild(capital);
    newElem.appendChild(flag);
    newElem.appendChild(ruler);
    newElem.appendChild(deleteButton);
    newElem.appendChild(editButton);

  });
  deleteFunc();
  editFunction();
}

OneCountryButton.addEventListener('click', getCountries);

function deleteFunc(){

  const del = document.getElementsByClassName('btn btn-danger deleteAction');
  for (let index = 0; index < del.length; index++) {
    console.log(del[index]);
    del[index].addEventListener('click', ()=>{
          deleteElement(del[index].value);
        });
  }
}

function deleteElement(countryName){
  fetch('https://witcher-project.herokuapp.com/admin/countries/' + countryName, {
    method: 'DELETE'
  });
  setTimeout(getCountries,500);
}

function editFunction(){
  const editButton = document.getElementsByClassName('btn btn-info editAction');
  for (let index = 0; index < editButton.length; index++) {
      editButton[index].addEventListener('click', ()=>{
          generateForm(editButton[index].value);
          });
    }
}

function generateForm(countryName){
  myContainer.innerHTML = '';
  var newName = document.createElement('input');
  var newRuler = document.createElement('input');
  var newDesc = document.createElement('input');
  var newCapital = document.createElement('input');
  var newFlag = document.createElement('input');

  newName.placeholder = 'name';
  newName.value = countryName;
  newRuler.placeholder = 'ruler';
  newDesc.placeholder = 'description';
  newCapital.placeholder = 'capital';
  newFlag.placeholder = 'flag';

  myContainer.appendChild(newName);
  myContainer.appendChild(newDesc);
  myContainer.appendChild(newCapital);
  myContainer.appendChild(newFlag);
  myContainer.appendChild(newRuler);

  const submitEditButton = document.createElement('button');
  submitEditButton.innerHTML = 'Edit';
  submitEditButton.id = 'submitEditButton';
  myContainer.appendChild(submitEditButton);

  submitEditButton.addEventListener('click', () => {
    editCountries(countryName, newName, newRuler, newDesc, newCapital, newFlag);
});
}

function editCountries(countryName, newName, newRuler, newDesc, newCapital, newFlag){
  fetch('https://witcher-project.herokuapp.com/admin/change/countries/' + countryName, {
  method: 'POST',
  body: JSON.stringify({name: newName.value,
      description: newDesc.value,
      ruler: newRuler.value,
      capital: newCapital.value,
      flag: newFlag.value
      })
});
setTimeout(getCountries,500);
}