var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(){
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  //create list item in DOM
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  //Create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give the div a class name
  taskInfoEl.className = "task-info";
  //add all necessary HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
  //listItemEl.textContent = taskNameInput; removed now that taskInfoEl is holding this information
  
  //add taskInfoEl to listItemEl
  listItemEl.appendChild(taskInfoEl);
  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);