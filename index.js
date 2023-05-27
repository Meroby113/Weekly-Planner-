const daysOfWeek = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
const index = localStorage.getItem("buttonIndex");
document.title = daysOfWeek[index] + " Tasks";
const localStorageAdress = daysOfWeek[index];
const dayName = document.querySelector(".day");
dayName.innerText = daysOfWeek[index] + " Tasks";
window.onload = loadTasks;

var addButton = document.querySelector(".addButton");
var deleteTask = document.querySelector(".delete");
var taskList = document.querySelector(".taskList");
var input = document.querySelector(".newTaskInput");

addButton.addEventListener("click", function(){
    if(input.value == "") {
        alert("Task can not be empty!"); 
    } else {
        addTask();
    }
 
    
})

deleteTask.addEventListener("click", function(){ 
    
   
    if (taskList.innerHTML === "" ){
        alert("No exist task!")
    } else {
        const massage = confirm("Are you sure to delete all task");
        if (massage === true) {
            taskList.innerHTML = "";
            localStorage.clear();
        } 
        
    }
   
})
function underline() {
  let tasks = Array.from(JSON.parse(localStorage.getItem(localStorageAdress)));
  tasks.forEach(task => {
    if (task.task === this.previousElementSibling.value) {
      task.completed = !task.completed;
    }
  });
  localStorage.setItem(localStorageAdress, JSON.stringify(tasks));
  if(this.checked) {
    this.previousElementSibling.classList.add("underline");
  } else {
   this.previousElementSibling.classList.remove("underline");
  }
  
}

function loadTasks() {
  try {
    let tasks = Array.from(JSON.parse(localStorage.getItem(localStorageAdress)));

    tasks.forEach(task => {
        const div = document.createElement("div");
       
        if(task.completed) {
          const div = document.createElement("div");
          div.className = "list";
          var taskk = document.createElement("input");
          taskk.className = "taskInput underline";
          taskk.type = "text";
          taskk.value = task.task;
          taskk.readOnly = true;
          const checkbox = document.createElement("input");
          checkbox.className = "checkbox";
          checkbox.type = "checkbox";
          checkbox.addEventListener('change', underline);
          checkbox.checked = true;
          const trash = document.createElement("button");
          trash.className = "bin";
          const can = document.createElement("i");
          can.className = "fa-solid fa-trash-can  fa-2xl";
          trash.addEventListener('click', removeTask);
          trash.appendChild(can);
          div.appendChild(taskk);
          div.appendChild(checkbox);
          div.appendChild(trash);
          taskList.appendChild(div); 
         
        } else {
          const div = document.createElement("div");
          div.className = "list";
          var taskk = document.createElement("input");
          taskk.className = "taskInput";
          taskk.type = "text";
          taskk.value = task.task;
          taskk.readOnly = true;
          const checkbox = document.createElement("input");
          checkbox.className = "checkbox";
          checkbox.type = "checkbox";
          checkbox.addEventListener('change', underline);
          checkbox.checked = false;
          const trash = document.createElement("button");
          trash.className = "bin";
          const can = document.createElement("i");
          can.className = "fa-solid fa-trash-can  fa-2xl";
          trash.addEventListener('click', removeTask);
          trash.appendChild(can);
          div.appendChild(taskk);
          div.appendChild(checkbox);
          div.appendChild(trash);
          taskList.appendChild(div); 
        }
        taskList.insertBefore(div, taskList.children[0]);
      });
  } catch (error) {
    
  }
   
}

function addTask() {
   var input = document.querySelector(".newTaskInput");
    // return if task is empty
    if (input.value == "") {
      alert("Please add some task!");
      return false;
    }
     // check is task already exist
     try {
      let tasks = Array.from(JSON.parse(localStorage.getItem(localStorageAdress)));
      // task already exist
      var controller = false;
      tasks.forEach(todo => {
        if (todo.task === input.value) {
          alert("Task already exist!");
          input.value = "";
          controller = true;
          return;
        }
      }); 
  
      if (controller) return;
     } catch (error) {
      
     }
    
    // show on window 
    const div = document.createElement("div");
    div.className = "list";
    var task = document.createElement("input");
    task.className = "taskInput";
    task.type = "text";
    task.value = input.value;
    task.readOnly = true;
    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.type = "checkbox";
    checkbox.addEventListener('change', underline);
    const trash = document.createElement("button");
    trash.className = "bin";
    const can = document.createElement("i");
    can.className = "fa-solid fa-trash-can  fa-2xl";
    trash.addEventListener('click', removeTask);
    trash.appendChild(can);
    div.appendChild(task);
    div.appendChild(checkbox);
    div.appendChild(trash);
    taskList.appendChild(div); 
    // add task to local storage
    localStorage.setItem(localStorageAdress, JSON.stringify([...JSON.parse(localStorage.getItem(localStorageAdress) || "[]"), { task: input.value, completed: false }]));
  
    // clear input
    input.value = "";

   
  }

  function removeTask() {
    let tasks = Array.from(JSON.parse(localStorage.getItem(localStorageAdress)));
    tasks.forEach(task => {
      if (task.task === this.parentNode.children[0].value) {
        // delete task
        tasks.splice(tasks.indexOf(task), 1);
      }
    });
    localStorage.setItem(localStorageAdress, JSON.stringify(tasks));
    this.parentElement.remove();
  }

