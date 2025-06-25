import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { loadTodos, removeTodo, toggleTodo } from "../store/actions/todo.actions.js"
//import { SET_TODO } from "../store/reducers/todo.reducer.js"

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {

    const todos = useSelector(state => state.todoModule.todos)
    //const dispatch = useDispatch()

    // Special hook for accessing search-params:
    const [searchParams, setSearchParams] = useSearchParams()

    const defaultFilter = todoService.getFilterFromSearchParams(searchParams)

    const [filterBy, setFilterBy] = useState(defaultFilter)

     useEffect(() => {
        loadTodos(filterBy)
            .then(todos => {
                showSuccessMsg('Load todos successfully')
            })
            .catch(err => {
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy])

     function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }

    function onRemoveTodo(todoId){
        removeTodo(todoId)
        .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    function onToggleTodo(todo){
        const todoToSave = { ...todo, isDone: !todo.isDone }
        toggleTodo(todoToSave)
        .then(() => {
            showSuccessMsg(`Todo is ${(savedTodo.isDone)? 'done' : 'back on your list'}`)
        })
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Cannot toggle todo ' + todoId)
        })
    }

    if (!todos) return <div>Loading...</div>
    return (
        <section className="todo-index">
            <TodoFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} onRemoveTodo={onRemoveTodo} onToggleTodo={onToggleTodo} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
            </div>
        </section>
    )
}