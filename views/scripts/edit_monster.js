const myContainer = document.getElementById('div_container');



export function editFunction(){
    const editButton = document.getElementsByClassName('btn btn-info editAction');
    for (let index = 0; index < editButton.length; index++) {
        console.log(del[index]);
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
}

function editMonster(monsterName){
    fetch('https://witcher-project.herokuapp.com/admin/monsters/' + monsterName, {
    method: 'PUT',
    body: JSON.stringify({name: newName.value,
        class: newClass.value,
        description: newDesc.value,
        localization: newLocaliz.value,
        loot: newLoot.value,
        vunerableTo: newVun.value
        })
  });
  setTimeout(getMonsters,500);
  window.location.replace("monster.html");
}


