    var tasks = [];
    var divTasks = document.getElementById('tasks');

function startTodo(){

   if(!localStorage.getItem('tasks')){
     var connection = new XMLHttpRequest();
     connection.open("GET", "tasks.json");

     connection.onload = function(){
       var parsedData = JSON.parse(connection.responseText);
       tasks = parsedData.tasks;
       saveTasks();
       showTasks();
     }
     connection.send();
   }
   else{
     loadtasks();
   }
   showTasks();
}

function saveTasks(){
    var tasksSaved = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasksSaved);
}

function loadtasks(){
    var getTasks = localStorage.getItem('tasks');
    tasks = JSON.parse(getTasks);
}

function showTasks(){

//  divTasks.removeChild(li);
//}
    for(var i = 0; i < tasks.length; i++){
  var li = document.createElement('li');
      li.id = `task-element-${i + 1}`;
      if(!document.getElementById(`task-element-${i + 1}`)){
  var h3 = document.createElement('h3');
      h3.innerHTML = tasks[i].title;
  var input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = tasks[i].done;
      if(tasks[i].done == true){
        input.onclick =  setTaskDone;
      }
      else{
        input.onclick =  setTaskNotDone;
      }
  var hr = document.createElement('hr');
  var small = document.createElement('small');
      small.innerHTML = tasks[i].date;
  var deleteTask =  document.createElement('button');
      deleteTask.innerHTML = 'Delete';
      deleteTask.onclick = removeTask;
      divTasks.appendChild(li);
      li.appendChild(h3);
      li.appendChild(input);
      li.appendChild(hr);
      li.appendChild(small);
      li.appendChild(deleteTask);
 }
 }
    if(!document.getElementById('addNew')){
      var div = document.createElement('div');
      div.id = 'addNew'
      var input1 = document.createElement('input');
      input1.type = 'text';
      input1.placeholder = 'new goal';
      var input2 = document.createElement('input');
      input2.type = 'text';
      input2.placeholder = 'date';
      br1 = document.createElement('br');
      br2 = document.createElement('br');
      br3 = document.createElement('br');
    //  br4 = document.createElement('br');
      var add = document.createElement('button');
      add.innerHTML = 'Add new goals';
      add.onclick = addNew;

      document.body.insertBefore(div, divTasks);
      div.appendChild(input1);
      div.appendChild(br1);
      div.appendChild(br2);
      div.appendChild(input2);
      div.appendChild(br3);
      div.appendChild(add);
   }
}


function setTaskDone(){
  var li = event.target.parentNode;
  for(i = 0; i < tasks.length; i++){
    if(li.children[0].innerHTML == tasks[i].title){
      tasks[i].done = false;
    }
  }
  saveTasks();
}

function setTaskNotDone(){
  var li = event.target.parentNode;
  for(i = 0; i < tasks.length; i++){
    if(li.children[0].innerHTML == tasks[i].title){
      tasks[i].done = true;
    }
  }
  saveTasks();
}

function removeTask(){
  var li = event.target.parentNode;
   divTasks.removeChild(li);
   for(i = 0; i < tasks.length; i++){
     if(li.children[0].innerHTML == tasks[i].title){
       tasks.splice(i, 1);
     }
   }
     saveTasks();
 }

 function Goal(goal,date) {
   this.title = goal;
   this.done  = false;
   this.date  = date;
 };

 function addNew(){
    var div = document.getElementById('addNew');
    var input = div.getElementsByTagName('input');
    var goal = input[0].value.trim();
    var date = input[1].value.trim();
    if(goal != '' && date != ''){
      var new_goal = new Goal(goal,date);
      tasks.push(new_goal);
    }
      saveTasks();
      showTasks();

 }
window.onload = startTodo;
