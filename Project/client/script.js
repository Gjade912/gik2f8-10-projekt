todoForm.title.addEventListener('keyup', (e) => validateField(e.target));
todoForm.title.addEventListener('blur', (e) => validateField(e.target));

todoForm.description.addEventListener('input', (e) => validateField(e.target));
todoForm.description.addEventListener('blur', (e) => validateField(e.target));


todoForm.points.addEventListener('keyup', (e) => validateField(e.target));
todoForm.points.addEventListener('blur', (e) => validateField(e.target));


todoForm.addEventListener('submit', onSubmit);


const todoListElement = document.getElementById('todoList');

let titleValid = true;
let descriptionValid = true;
let pointsValid = true;


const api = new Api('http://localhost:5000/tasks');


function validateField(field) {

  const { name, value } = field;


  let = validationMessage = '';

  switch (name) {

    case 'title': {

      if (value.length < 2) {
        
        titleValid = false;
        validationMessage = "The field 'Unit Name' must have at minimum 2 characters.";
      } else if (value.length > 100) {
       
        titleValid = false;
        validationMessage =
          "The field 'Unit Name' can't have more then 100 characters.";
      } else {
       
        titleValid = true;
      }
      break;
    }
    
    case 'description': {
      
      if (value.length > 500) {
        descriptionValid = false;
        validationMessage =
          "The field 'Equipment' can't have more then 500 characters.";
      } else {
        descriptionValid = true;
      }
      break;
    }

    case 'points': {
      
      if (value.length === 0) {
       
        pointsValid = false;
        validationMessage = "The field points is obligatory.";
      } else {
        pointsValid = true;
      }
      break;
    }
  }

  field.previousElementSibling.innerText = validationMessage;
  
  field.previousElementSibling.classList.remove('hidden');
}

function onSubmit(e) {

  e.preventDefault();
  
  if (titleValid && descriptionValid && pointsValid) {
    
    console.log('Submit');

    
    saveTask();
  }
}


function saveTask() {
  
  const task = {
    title: todoForm.title.value,
    description: todoForm.description.value,
    points: todoForm.points.value,
    completed: false
  };

  api.create(task).then((task) => {
    
    if (task) {
      
      renderList();
    }
  });
}


function renderList() {
  
  console.log('rendering');

  api.getAll().then((tasks) => {

    todoListElement.innerHTML = '';

    /* tasks.sort(function(a, b){
      if(a.points < b.points) { return -1; }
      if(a.points > b.points) { return 1; }
      return 0;
    }) */
    if (tasks && tasks.length > 0) {
      tasks.forEach((task) => {
        todoListElement.insertAdjacentHTML('beforeend', renderTask(task));
      });
    }
  });
}

function renderTask({ id, title, description, points, completed }) {
  let html = `
    <li class="select-none mt-2 py-2 border-b border-[#9a1115]">
      <div class="flex items-center">
        <h3 class="mb-3 flex-1 text-xl font-bold text-[#9a1115] uppercase">${title}</h3>
        <div>
          <span>${points}</span>
          <button onclick="deleteTask(${id})" class="inline-block bg-[#9a1115] text-xs text-[#bbc6c9] border border-[#a47552] px-3 py-1 rounded-md ml-2">Remove</button>
          <input type="checkbox" onchange="updateTask(${id}, this.checked)" class="appearance-none inline-block bg-[#9a1115] text-xs text-[#bbc6c9] border border-[#a47552] px-2 py-1 rounded-md ml-2 checked:bg-blue-500"`;
          
  if (completed == true){
    html += `checked`
  }
          
  html+= `>
    </div>
  </div>`;

  description &&
    (html += `
      <p class="ml-8 mt-2 text-xs italic">${description}</p>
  `);

  html += `
    </li>`;
  return html;
}

function deleteTask(id) {
  api.remove(id).then((result) => {
    renderList();
  });
}

function updateTask(id, checked) {
  console.log(checked)
  api.update(id, checked).then((result) => {
    renderList();
  });
}



renderList();
