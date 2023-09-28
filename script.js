const form = document.getElementById('todo-form')
const input = document.getElementById('newTodo-input')
const list = document.getElementById ('list')
const template = document.getElementById('list-item-temp')
const LOCAL_STORAGE_PREFIX = 'ADVANCED_TODO_LIST'
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`
let todos = loadTodos()

todos.forEach(renderTodo)

list.addEventListener('change', e => {
  if (!e.target.matches('[data-list-item-checkbox]')) return
//Get the todo that is click on
const parent = e.target.closest('.list-item')
const todoId = parent.dataset.todoId
const todo = todos.fine(t => t.id === todoId ) 
todo.complete = e.target.checked
//save updated todo
saveTodos()

})

list.addEventListener ('click', e => {
  if(!e.target.matches('[data-button-delete]')) return

  const parent = e.target.closest ('.list-item')
  const Todo = parent.dataset.todoId
  // remove the todo from the screen
  parent.remove ()
  //remove the todo from the list
  todos = todos.filter (todo => todo.id !== Todo)
  //save the new todos
  saveTodos()
})


//Add Todo
// user will type in todo and click add todo butto. then add todo to the list above
form.addEventListener('submit', e => {
  e.preventDefault() 
  const todoName = input.value
  if (todoName === '') return

  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString()
  }
  todos.push(newTodo)
  renderTodo(newTodo)
  //todos.push(todoName)
  //renderTodo(todoName)
  saveTodos()
  input.values = ""
})

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true)
  const listItem = templateClone.querySelector('.list-item')
  listItem.dataset.todoId = todo.id 
  const textElement = templateClone.querySelector ('[data-list-item-text]')
  textElement.innerText = todo.name
  const checkbox = templateClone.querySelector('[data-list-item-checkbox]') // completing Tod0
  checkbox.checked = todos.complete
  list.appendChild(templateClone)
}

//Load Todo

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY)
  return JSON.parse(todosString) || []
}


//Save Todos
function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos) )

}
