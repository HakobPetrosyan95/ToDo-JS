// selectors
const input = document.querySelector('.inputText');
const submit = document.querySelector('.submitText');
const todoList = document.querySelector('.todo-list');
const modalWindow = document.querySelector('.modalWindow');
const emptyWindow = document.querySelector('.emptyWindow');
const yes = document.querySelector('.yes');
const no = document.querySelector('.no');
const ok = document.querySelector('.ok')


// database
let data = [
    {id: 'da124', text: 'React', done: false},
    {id: '1d68v', text: 'Vue', done: true},
    {id: 'sd4876', text: 'Angular', done: false},
];


// event listeners 
document.addEventListener('DOMContentLoaded', onLoadHtml);
submit.addEventListener('click', addTodo);
todoList.addEventListener('click', handlerTodoList);
no.addEventListener('click', () => modalWindow.style.display = 'none');
ok.addEventListener('click', ()=> emptyWindow.style.display = 'none')




// functions
function onLoadHtml() {
    renderTodoList();
}

function renderTodoList() {
    todoList.innerHTML = '';

    data.forEach(elem => {
        const todo = document.createElement('div');
        todo.className = elem.done ? 'todo active' : 'todo';
        todo.id = elem.id;

        const check = document.createElement('input');
        check.type = 'checkbox';
        check.className = 'check'
        check.checked = elem.done;
        todo.appendChild(check);

        const text = document.createElement('span');
        text.className = 'text';
        text.innerText = elem.text;
        todo.appendChild(text);

        const deleteTodo = document.createElement('span');
        deleteTodo.className = 'delete';
        deleteTodo.innerHTML = '&times;';
        deleteTodo.addEventListener('click', () => {
            show(elem.id); 
        });
        todo.appendChild(deleteTodo);


        todoList.appendChild(todo);

       
    });
}

function addTodo(event) {
    event.preventDefault();

    if(!input.value || input.value.trim() === ""){
        empty();
    }else{
        const newTodo = {
            id: Date.now().toString(),
            text: input.value,
            done: false,
        }
    
        data.push(newTodo);
        renderTodoList();
        input.value = '';  
    }

    
}

function handlerTodoList(event) {
    const currentId = event.target.parentElement.id;
 
    if (event.target.className === 'check') {
        doneTodo(currentId);
    }

    if (event.target.className === 'delete') {
        show(currentId);
    }
   
}

function doneTodo(id) {
    data.forEach(elem => {
        if (elem.id === id) {
            elem.done = !elem.done;
        }
    })

    renderTodoList();
}

function show(id) {
    modalWindow.style.display = 'block'
    yes.addEventListener('click',()=>deleteToDoo(id));
}



function deleteToDoo(id){
    
    data = data.filter(elem => elem.id !== id);

    modalWindow.style.display = 'none';

    renderTodoList();    

}


function  empty(){
    emptyWindow.style.display = 'block';
}

