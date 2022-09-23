// Elements
const elForm = document.querySelector('.todoForm');
const elInput = document.querySelector('.todoInput');
const elList = document.querySelector('.todoList');
const elBtnControls = document.querySelector('.btn-controls')
const elBtnAllChild = document.querySelector('.all>strong');
const elBtnCompChild = document.querySelector('.completed>strong');
const elBtnUnCompChild = document.querySelector('.unCompleted>strong');
const elBtnDelCompleted = document.querySelector('.delCompleted');
// Todo Arry
const todos = [];
// Function's
function renderTodos(arr, node) {
    let allTodo=todos.length;
    let completedTodo=todos.filter((evt)=>evt.isCompleted===true).length;
    elBtnAllChild.textContent = allTodo;
    elBtnCompChild.textContent = completedTodo;
    elBtnUnCompChild.textContent = allTodo-completedTodo;
    elList.innerHTML = null;
    for (const todo of arr) {
            const newLi = document.createElement('li');
            const newBtn = document.createElement('button');
            const newCheckbox = document.createElement('input');
            newBtn.classList.add('btn-del');
            newBtn.textContent = 'delete';
            newBtn.dataset.todoId = todo.id;
            newBtn.setAttribute('type', 'button');
            newCheckbox.dataset.todoId = todo.id;
            newCheckbox.type = 'checkbox';
            newCheckbox.classList.add('todo-checkbox')
            if (todo.isCompleted) {
                newCheckbox.checked = true;
                newLi.style.color='grey';
                newLi.style.backgroundColor='rgba(0, 128, 0, 0.383)';}
            newLi.innerHTML = todo.title;
            newLi.appendChild(newCheckbox)
            newLi.appendChild(newBtn);
            node.appendChild(newLi);
}};
// Button Event's
elList.addEventListener('click', (evt) => {
    const todoValidation = evt.target.matches('.btn-del');
    const todoCheck = evt.target.matches('.todo-checkbox')
    const todoId = Number(evt.target.dataset.todoId);
    if (todoValidation) {
        const foundTodoIndex = todos.findIndex(todo => todo.id === todoId)
        todos.splice(foundTodoIndex, 1);
        renderTodos(todos, elList);
    } else if (todoCheck) {
        const todoId = Number(evt.target.dataset.todoId);
       const foundTodo = todos.find(todo => todo.id === todoId);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        renderTodos(todos, elList);
}});

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const inputValue = elInput.value.trim()
    if (!inputValue == '') {
        const newtodo = {
            id: todos[todos.length - 1]?.id + 1 || 0,
            title: inputValue,
            isCompleted: false
        }
        todos.push(newtodo);

        renderTodos(todos, elList)
        elInput.value = null
    }
    else {
        alert('Siz hechnimani kitirmadingi qaytadan urunib ko\'ring')
}});

elBtnControls.addEventListener('click',(evt)=>{
    const targetValue=evt.target;
    if(targetValue.matches('.all')){
        renderTodos(todos, elList)
    }else if(targetValue.matches('.completed')){
        const foundTodo=todos.filter(todo=>todo.isCompleted===true);
        renderTodos(foundTodo, elList);
    }else if(targetValue.matches('.unCompleted'))
    {
        const foundTodo=todos.filter(todo=>todo.isCompleted===false);
        renderTodos(foundTodo, elList);
}});