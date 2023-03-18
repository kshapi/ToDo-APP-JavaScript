const addBtn = document.querySelector('.add');
const all = document.querySelector('.all-todo');
const input = document.querySelector('.input input');
const todosCount = document.querySelector('.todos-count');


let check = false;
let item = [];
 
 if (localStorage.getItem(1)) {
   const values = localStorage.getItem(1).split(',');
   values.forEach(value => {
     item.push(value);
   });
 };
 //get counter from item length otherwise 0
 let counter = item ? item.length : 0;
 

const laodTodos = () => {
  
  ///Update todos count
  todosCount.textContent = `ToDo 's.   ${counter}`;
    
  item.forEach(todo => {
    //list element
    const list = document.createElement('div');
    list.className = 'list';
    list.innerHTML = `
    <div class="check">
       <span></span>
       <span></span>
    </div>
    <div class="screen">${todo}</div>
    <div class="del">
      <i class="fa-solid fa-trash"></i>
    </div>`;
    //appendding list in DOM
    all.appendChild(list);
      
      
    //destructure array and get elements
    const [checkBtn, text, deleteBtn] = list.children;
      
      
    //listner for Delete Button
    deleteBtn.addEventListener('click', () => {
       //passing list
        deletee(list);
    });
      
    text.addEventListener('click', () => {
        //passing text checkBtn;
        read(text, checkBtn);
    });
      
  });
  
};
laodTodos();


const todo = () => {
  if (input.value == '' ) {
    return;
  }
  //increes conuter Update todos count
  counter++;
  todosCount.textContent = `ToDo 's.   ${counter}`;
  
  //list element
  const list = document.createElement('div');
  list.className = 'list';
  list.innerHTML = `
  <div class="check">
    <span></span>
    <span></span>
  </div>
  <div class="screen">${input.value}</div>
  <div class="del">
    <i class="fa-solid fa-trash"></i>
    </div>`;
  all.appendChild(list);
  
  //destructur array and get elements
  const [checkBtn, text, deleteBtn] = list.children;
  
  //Set todos in localStorage
  item.push(text.innerText);
  localStorage.setItem(1,item);
  
  //input value to empty
  input.value = '';
  
  //listner for Delete Button
  deleteBtn.addEventListener('click',()=>{
  //passing list
    deletee(list);
  });
  
  text.addEventListener('click', () => {
    //passing checkBtn and text
    read(text, checkBtn);
  });
  
};
addBtn.addEventListener('click',todo);


//Deleting Element
function deletee (list){
   counter--;
  //adding animation
  list.style.transform = 'translate(-70px)';
  list.style.opacity = '0.3';
  
  setTimeout(()=> {
    list.remove();
  }, 300);
  
  //Update Todos count
  todosCount.textContent = `ToDo 's.   ${counter}`;
  
  
  //get values from localStorage and match the deleted value
  //then Set value again
  const match = list.querySelector('.screen').innerText;
  const oldValues = localStorage.getItem(1).split(',');
  let newValues = [];
  
  
  for(let i=0;i<oldValues.length;i++){
    if (oldValues[i] == match) {
      continue;
    };
    newValues.push(oldValues[i])
  };
  
  //
  item = newValues;
  localStorage.setItem(1,newValues);
}


//line Through 
function read (text, checkBtn) {
  const span = checkBtn.querySelectorAll('span');
  
  if (!check) {
    text.style.textDecoration = 'line-through';
    //check the box
    span.forEach(span => {
      span.style.display = 'inline-block';
    });
    check = true;
  }else {
    text.style.textDecoration = 'none';
    span.forEach(span => {
      span.style.display = 'none';
    });
    check = false;
   };
   
}

//kshapi