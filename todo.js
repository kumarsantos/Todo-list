//selectors

const todoInput=document.querySelector(".todo-input");//accessing input value from input text
const todoButton=document.querySelector(".todo-button");//accessing button value from html page
const todoList=document.querySelector(".todo-list");//accessing unorder list value from list
const filteroption=document.querySelector(".filter-todo");//fetching  value from list when option box value is selectec

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);//calling getTodos method which is loading the value in todos list from localstorage
todoButton.addEventListener('click',addTodo);//calling addTodo method which is inserting the value in todos list
todoList.addEventListener('click',deletechek);//calling deletecheck method which is deleting the value in todos list
filteroption.addEventListener('click',filterTodo);//calling filtertodo method which is selecting the value in todos list based on the option box value


//Funtons


function addTodo(event){//adding element in the list
  // console.log("hello");
event.preventDefault();//preventing default submit function


///Todo Div
const todoDiv=document.createElement("div");//creating div element the list
todoDiv.classList.add("todo");//addin the todo css class  in the div element
////li
const newTodo=document.createElement("li");//creating list element
newTodo.innerHTML=todoInput.value;//storing value of text box into newTodo
newTodo.classList.add("todo");//adding css class to the list element
todoDiv.appendChild(newTodo);//appending the list element in the the list
saveLocalTodos(todoInput.value);//calling saveLocalTodo method and passing value of list element to localstorage
/////check mark button
const completedbtn=document.createElement('button');
completedbtn.innerHTML='<input class="checkbox" type="checkbox" checked/>';
completedbtn.classList.add('complete-btn');
todoDiv.appendChild(completedbtn);


const trashbtn=document.createElement('button');//creating button element in the list
trashbtn.innerHTML='<button class="trash">Delete</button>';//setting delete button in the list
trashbtn.classList.add('trash-btn');//adding css class on the button
todoDiv.appendChild(trashbtn);//appending button in to the list


//append to list
todoList.appendChild(todoDiv);//appending all the todolist value to the main div element
todoInput.value="";//making input textbox value to empty
}
////////////////////////////////////////////
function deletechek(e)//called delete funtion
{
  // console.log(e.target);
  const item=e.target;//asigning the target value to the item which we want to delete
  if(item.classList[0]==='trash-btn'){//checking if list item contain classlist value trash-button or not
    const todo=item.parentElement;//if yes then asigning its parentnode to todo
    //////animation
    todo.classList.add('fall');//adding css class to todo element of list with animation transiton

    removeLocalTodos(todo);//removing the element from the list

    todo.addEventListener('transitionend',function(){//calling anonymous function it called only when transition ended
      todo.remove();//removing particular element  from the list
    })
  }
  /////check mark
  if(item.classList[0]==="complete-btn")//checking whethe list item contains class value complete-btn
  {
    const todo=item.parentElement;//if yes then its parentElement value is asigning to todo
    todo.classList.toggle("completed");//toggling value is setting to todo element which is selected for delete and removing and adding like toggle
  }
}


/////////////////////Filter function
function filterTodo(e)
{
  const todos=todoList.childNodes;//accesing all the nodes of todos
  todos.forEach(function(todo){//iterating todos values
    switch(e.target.value){//if e.(select option value) matching with cases
      case "All": todo.style.display="flex";//displaying selected values
          break;
      case "Completed": if(todo.classList.contains("completed")){//checking if todo contains how many completed values
        todo.style.display="flex";//showing completed values
      }
      else
      todo.style.display="none";//hidding completed values
      break;

      case "Uncompleted": if(!todo.classList.contains("completed")){//checking if todo contains how many Uncompleted values
        todo.style.display="flex";//showing Uncompleted values
      }
      else
      todo.style.display="none";//hidding Uncompleted values
      break;
    }
  });
}
///
function saveLocalTodos(todo){
  //check already exist or not
  let todos;
  if(localStorage.getItem('todos')===null){//checking whether todo is exists or not
    todos=[];//if not then creating
  }
  else{
    todos=JSON.parse(localStorage.getItem('todos'));//already exits then accessing and storing in todos
  }

  todos.push(todo);//storing the todo values in the list todos inside the localstorage
  localStorage.setItem("todos",JSON.stringify(todos));//updating the localstorage

}




function getTodos(){
  let todos;
  if(localStorage.getItem("todos")===null){//checking whether todo is exists or not
    todos=[];//if not then creating
  }
  else{
    todos=JSON.parse(localStorage.getItem("todos"));//already exits then accessing and storing in todos
  }
    todos.forEach(function(todo){//iterating values of todos
    const todoDiv=document.createElement("div");//creating div element
    todoDiv.classList.add("todo");////adding class todo in in div element
////li
const newTodo=document.createElement("li");//creating <li> element
newTodo.innerHTML=todo;//setting input in the list
newTodo.classList.add("todo");//adding class in the list
todoDiv.appendChild(newTodo);//append list in the main div
// saveLocalTodos(todoInput.value);
/////check mark button
const completedbtn=document.createElement('button');//creating button in the list
completedbtn.innerHTML='<input class="checkbox" type="checkbox" checked/>';//setting checkbox in the list
completedbtn.classList.add('complete-btn');//adding class in the checkbox
todoDiv.appendChild(completedbtn);//appending checkbox in the main div


const trashbtn=document.createElement('button');//creating delete button in the list
trashbtn.innerHTML='<button class="trash">Delete</button>';//seting the delete button in the 
trashbtn.classList.add('trash-btn');//adding the class in the delete button
todoDiv.appendChild(trashbtn);//appending the delete button in list

//append to list
todoList.appendChild(todoDiv);

  })
}

/////////deleting from local storage
function removeLocalTodos(todo){
  let todos;
  ///checking whether todos is exist in the localstorage or not
  if(localStorage.getItem("todos")===null){
    todos=[];//if not it create todos in localstorage
  }
  else{
    todos=JSON.parse(localStorage.getItem("todos"));//if already exits then access todos and store in todos
  }
  const todoindex=todo.children[0].innerText;//
  todos.splice(todos.indexOf(todoindex),1);//fetching indexof elementnode which we want to delete acording to its text value
  localStorage.setItem('todos',JSON.stringify(todos));//updating the localstorage by new todos list
}

