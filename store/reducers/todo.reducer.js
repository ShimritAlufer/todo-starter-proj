export const SET_TODO = 'SET_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

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
        // case ADD_CAR:
        //     return {
        //         ...state,
        //         cars: [...state.cars, cmd.car]
        //     }
        // case UPDATE_CAR:
        //     return {
        //         ...state,
        //         cars: state.cars.map(car => car._id === cmd.car._id ? cmd.car : car)
        //     }
        
        default:
            return state
    }
}
