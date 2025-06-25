import { TodoPreview } from "./TodoPreview.jsx"
import { changeTodoColor } from "../store/actions/todo.actions.js"
const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {

    const [confirmDeleteId, setConfirmDeleteId] = useState(null)

    function handleRemove(todoId) {
        onRemoveTodo(todoId)
        setConfirmDeleteId(null)
    }
    
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id}>
                    <TodoPreview todo={todo} onToggleTodo={()=>onToggleTodo(todo)} />
                    <section>
                        {confirmDeleteId === todo._id ? (
                           <React.Fragment>
                                <span>Are you sure?</span>
                                <button onClick={() => handleRemove(todo._id)}>Yes</button>
                                <button onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                            </React.Fragment>
                        ) : (
                            <button onClick={() => setConfirmDeleteId(todo._id)}>Remove</button>
                        )}
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}