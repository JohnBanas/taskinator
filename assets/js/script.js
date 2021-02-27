//counter made to track id # of created element that contains created tasks
var taskIdCounter = 0;
// formEl connects to form element in HTML (DOM)
var formEl = document.querySelector("#task-form");
//connects to <ul> with id tasks-to-do and creates a variable container for all created <li> info
var tasksToDoEl = document.querySelector("#tasks-to-do");
//creates a variable container for an addEventListener so that I can then specify 
//(!!using the taskIdCounter id # on new tasks created!!) when a edit or delete button is clicked
var pageContentEl = document.querySelector("#page-content");

//A function container to hold input data and selection choice for new tasks.
//If either is left empty sends alert. Also resets form fields after each new task is created.
//places info in object taskDataObject and sends to createTaskEl
var taskFormHandler = function(event){
  //prevents website from reloading each time a form is filled and submitted 
  event.preventDefault();
  //input data and selection choice variable containers
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
  //check "if" the inputs are empty "strings"
  if(!taskNameInput || !taskTypeInput) {
    window.alert("You need to fill out the task form!");
    //if either is empty(!="opposite") return "true" and window alert and return "false" 
    //to stop function and make them fill out form correctly
    return false;
  }
  //if both are filled out move on and reset form as well
  formEl.reset();
  
  //package data as an object
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };
  //send as an argument to createTaskEl
  createTaskEl(taskDataObj);
}

//variable container to create new tasks
var createTaskEl = function(taskDataObj) {
  //create list item in DOM
  var listItemEl = document.createElement("li");
  //give created item a class="task-item"
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
  var taskActionsEl = createTaskActions(taskIdCounter);
  
  //add to each task item created
  listItemEl.appendChild(taskActionsEl);

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for the next unique id
  taskIdCounter++;
}
//connects to form element HTML (DOM) on form submit
//runs function 'taskFormHandler' to create new list item and info containers
formEl.addEventListener("submit", taskFormHandler);

//creates buttons on new tasks and places them in
//div while creating the same taskId as the new task by
//appending that function in listItemEl with the taskIdCounter 
//as an argument 
var createTaskActions = function(taskId) {
  //create div for buttons with class="task-actions"
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create edit button
  var editButtonEl = document.createElement("button");
  //button text is Edit
  editButtonEl.textContent = "Edit";
  //button classes
  editButtonEl.className = "btn edit-btn";
  //button id and task id # for retrieval with .getAttribute
  //which will be used in later variable to give specificity to individual
  //edit and delete buttons as there will be multiple as we add tasks.
  editButtonEl.setAttribute("data-task-id",taskId);

  //button placed in action container div
  actionContainerEl.appendChild(editButtonEl);

  //create delete button
  var deleteButtonEl = document.createElement("button");
  //delete button text is delete
  deleteButtonEl.textContent = "Delete";
  //button classes
  deleteButtonEl.className = "btn delete-btn";
  //creating task id # similiar to edit button
  deleteButtonEl.setAttribute("data-task-id", taskId);

  //place button in container div
  actionContainerEl.appendChild(deleteButtonEl);
  
  //create select element for task status
  var statusSelectEl = document.createElement("select");
  //select element class
  statusSelectEl.className = "select-status";
  //select element and give it possible attribute inputs and id reference #
  statusSelectEl.setAttribute("name","status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);

  //place select element in div container
  actionContainerEl.appendChild(statusSelectEl);

  //for loop using array of status choices
  var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
      //create option element based on statusChoices array for loop
      var statusOptionEl = document.createElement("option");
      //text content based on loop "i" position in array statusChoices
      statusOptionEl.textContent = statusChoices[i];
      //creating option element value as the loop "i" position in statusChoices array
      statusOptionEl.setAttribute("value", statusChoices[i]);

      //append options element to select
      statusSelectEl.appendChild(statusOptionEl);
    }
    //returns div with all previous buttons/select/option elements 
    //appended in
  return actionContainerEl;
}
//this variable identifies the specific 'delete' buttons we created in actionContainerEl
var taskButtonHandler = function(event) {
  //get target element from event (what button is clicked and what can we contain that info in
  //so we can access that at a later time?) and place in variable
  var targetEl = event.target;
  //edit button clicked
  if (targetEl.matches(".edit-btn")) {
    //id for specific edit button
    var taskId = targetEl.getAttribute("data-task-id");
    //pass argument of the specific task id # to specify which edit button
    editTask(taskId);
  }

  //create true value for 'delete buttons' on 'task add' function
   else if (targetEl.matches(".delete-btn")) {
    //get element task id to target specific delete button as there will be several tasks,
    // all with delete buttons
    var taskId = targetEl.getAttribute("data-task-id");
    //specify which delete button just like editTask
    deleteTask(taskId);
  }
};
//variable for function of deleting a created task
var deleteTask = function(taskId) {
  //if the clicked button is a delete button the 
  //taskId = that buttons "data-task-id" which also is the <li> id # as well
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //actual command to remove the task
  taskSelected.remove();
};
  //by selecting a <li> that has a data-task-id equal to 
  //the taskId passed in deleteTask function (which will equal 
  //the button that was clicked, because of our "if" statement)
  //this sets the var taskId =  to the .delete-btn that was clicked 
  //or the "event.target.matches" (this will also be true for the editTask function)

var editTask = function(taskId) {
  //get task list element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  //get content form task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;
  //reusing selectors from the taskFormHandler
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  //To make clear that we are editing the 'new task' button 
  //is changed to 'save task' during editing
  document.querySelector("#save-task").textContent = "Save Task";
  //include the tasks id # when we move the task to be edited, so it can be
  //saved and accessed
  formEl.setAttribute("data-task-id", taskId);
  }




pageContentEl.addEventListener("click", taskButtonHandler);



