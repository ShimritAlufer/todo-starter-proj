import { todoService } from "../../services/todo.service.js";
import { store } from "../store.js";
import { SET_TODO, REMOVE_TODO, TOGGLE_TODO, CHANGE_TODO_COLOR } from "../reducers/todo.reducer.js";


export function loadTodos(filterBy){
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({type: SET_TODO, todos})
        })
        .catch (err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todos', err)
            throw err
        })
}

export function toggleTodo(todoToSave){
    return todoService.save(todoToSave)
        .then((savedTodo) => {
            store.dispatch({ type:TOGGLE_TODO, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> Cannot toggle todos', err)
            throw err
        })
}

export function changeTodoColor(todoId, color) {
  return {
    type: 'CHANGE_TODO_COLOR',
    todoId,
    color
  }
}
