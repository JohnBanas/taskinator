var taskIdCounter = 0;
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
  //add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  //Create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  //give the div a class name
  taskInfoEl.className = "task-info";
  //add all necessary HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  //listItemEl.textContent = taskNameInput; removed now that taskInfoEl is holding this information
  
  //add taskInfoEl to listItemEl
  listItemEl.appendChild(taskInfoEl);

  //function for task delete/edit/status
  var taskActionsEl =createTaskActions(taskIdCounter);
  
  //add to each task item created
  listItemEl.appendChild(taskActionsEl);

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for the next unique id
  taskIdCounter++;
}

formEl.addEventListener("submit", taskFormHandler);

var createTaskActions = function(taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id",taskId);

  //button placed in action container div
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);

  //place button in container div
  actionContainerEl.appendChild(deleteButtonEl);
  
  //create select element for task status
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name","status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  //place select element in div container
  actionContainerEl.appendChild(statusSelectEl);

  //for loop using array of status choices
  var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
      //create option element
      var statusOptionEl = document.createElement("option");
      statusOptionEl.textContent = statusChoices[i];
      statusOptionEl.setAttribute("value", statusChoices[i]);

      //append to select
      statusSelectEl.appendChild(statusOptionEl);
    }

  return actionContainerEl;
}