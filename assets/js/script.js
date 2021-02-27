var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event){
  event.preventDefault();
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  //check "if" the inputs are empty "strings"
  if(!taskNameInput || !taskTypeInput) {
    window.alert("You need to fill out the task form!");
    return false;
  }
  formEl.reset();
  
  //package data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  //send as an argument to createTaskEl
  createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
  //create list item in DOM
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";
  //Create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give the div a class name
  taskInfoEl.className = "task-info";
  //add all necessary HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  //listItemEl.textContent = taskNameInput; removed now that taskInfoEl is holding this information
  
  //add taskInfoEl to listItemEl
  listItemEl.appendChild(taskInfoEl);
  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
}

formEl.addEventListener("submit", taskFormHandler);