const log = console.log.bind(console)

const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `选择器 ${selector} 写错了, 请仔细检查并且复习三种基本的选择器`
        alert(s)
        return null
    } else {
        return element
    }
}

const append = (sel, html) => {
    e(sel).insertAdjacentHTML('beforeend', html)
}

/*
- todo
    - click
        - input
            - add_todo
        - click
            - complete
            - delete
            - update
*/

const todoAdd = (todo) => {
    todos.push(todo)
    let t = templateTodo(todo)
    append('.todos', t)
}

const todoDelete = (todo) => {
    let id = Number(todo.dataset.id)
    todos.splice(id, 1)
    todo.remove()
}

const bindEventAdd = () => {
    e('.input-buttons').addEventListener('click', event => {
        let content = e('.gua-input').value
        let id = todos.length
        let todo = {
            content,
            id,
            completed: false,
        }
        todoAdd(todo)
    })
}

const bindEventDelete = () => {
    e('.todos').addEventListener('click', event => {
         let self = event.target
         if (self.classList.contains('delete')) {
            let todo = self.parentElement
            todoDelete(todo)
         }
    })
}

window.todos = [
    {
        "id": 0,
        'content': 'Finish Music Player',
        'completed': false,
    },
    {
        "id": 1,
        'content': 'Finish Video Player',
        'completed': false,
    },
]

const templateTodo = (todo) => {
    let { content, completed, id } = todo
    // Todo completed 
    // let done = completed ? 
    let c = content
    let t = `
    <li class="todo" data-id="${id}">
    <input type="checkbox" id="todo_${id}">
    <label for="todo_${id}">
        <span class="check gua-complete"></span>
        ${c}
    </label>
    <i class="far fa-trash-alt delete">delete</i>
</li>
    `
    return t
}

const templateTodos = () => {
    let t = ''
    for (let todo of todos) {
        t += templateTodo(todo)
    }
    return t
}

const loadTodos = () => {
    let t = templateTodos()
    append('.todos', t)
}

const init = () => {
    loadTodos()
}

const bindEvents = function() {
    bindEventAdd()
    bindEventDelete()
}

const __main = function() {
    init()
    bindEvents()
}

__main()
// Finish Plant Zombie