export const SET_TODO = 'SET_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const CHANGE_TODO_COLOR ='CHANGE_TODO_COLOR'

const initialState = {
    todos: [],
    lasttodos: [],
    isDone: false
}


export function todoReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TODO:
            return {
                ...state,
                todos: cmd.todos
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case TOGGLE_TODO:
            return{
                ...state,
                isDone: !state.isDone
            }
        case CHANGE_TODO_COLOR:
            return {
                ...state,
                todos: state.todos.map(todo =>
                todo._id === cmd.todoId
                    ? { ...todo, color: cmd.color }
                    : todo
                )       
            }
       
        
        default:
            return state
    }
}
