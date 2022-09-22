const elForm = document.querySelector('.todoForm');
const elInput = document.querySelector('.todoInput');
const elList = document.querySelector('.todoList');
const elBtnAll = document.querySelector('.all');
const elBtnComp = document.querySelector('.completed');
const elBtnUnComp = document.querySelector('.unCompleted');
const elBtnAllChild = document.querySelector('.all>strong');
const elBtnCompChild = document.querySelector('.completed>strong');
const elBtnUnCompChild = document.querySelector('.unCompleted>strong');
const elBtnDelCompleted = document.querySelector('.delCompleted');


const todos = [];

function renderTodos(arr, node) {
    elList.innerHTML = null;
    for (const todo of arr) {
        if (todo) {
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
                newLi.style.backgroundColor='rgba(0, 128, 0, 0.383)';
            }


            newLi.innerHTML = todo.title;
            newLi.appendChild(newCheckbox)
            newLi.appendChild(newBtn);
            node.appendChild(newLi);
        }



    }

}
function renderTodosComplted(arr, node, comp) {
    elList.innerHTML = null;
    for (const todo of arr) {
        if (todo.isCompleted === comp) {

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
                newCheckbox.checked = true
                newLi.style.color='grey';
                newLi.style.backgroundColor='rgba(0, 128, 0, 0.383)';
                
                newLi.setAttribute('class','grey')
            }


            newLi.innerHTML = todo.title;
            newLi.appendChild(newCheckbox)
            newLi.appendChild(newBtn);
            node.appendChild(newLi);
        }



    }

}
function schochik(boll) {
    let allTodo=0;
    let completedTodo=0;
    let unCompletedTodo=0;
    for (const todo of todos) {
        allTodo++;
        if (todo.isCompleted) {
            completedTodo++
        } else {
            unCompletedTodo++
        }



    };
    if(boll){
        completedTodo = 0;
        elBtnAllChild.textContent = allTodo-completedTodo;
        elBtnCompChild.textContent = completedTodo

    }
    else{
        elBtnAllChild.textContent = allTodo;
        elBtnCompChild.textContent = completedTodo;
        elBtnUnCompChild.textContent = unCompletedTodo;

    }


}
//   matches()   berilgan elementda quydagi atribut bor yoki yoqligini tekshiradi
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



    }
    schochik()
})
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
    }
    schochik(false)




})
elBtnDelCompleted.addEventListener('click',()=>{
    elList.textContent=null;
    for (const todo of todos) {
        let todoindex=Number(todos.findIndex(todo=>todo.isCompleted==true))
        if(todo.isCompleted){
            
            todos.splice(todoindex,1)
        }
        
        
    }
    renderTodos(todos, elList) 
    schochik(true)
    
    
})
elBtnAll.addEventListener('click', () => {
    renderTodos(todos, elList)
})
elBtnComp.addEventListener('click', () => {
    renderTodosComplted(todos, elList, true)
})
elBtnUnComp.addEventListener('click', () => {
    renderTodosComplted(todos, elList, false)
})


