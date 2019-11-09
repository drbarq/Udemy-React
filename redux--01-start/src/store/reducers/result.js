import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../utility'

const initialState = {
    results: []
}

const resultReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return updateObject(state, {results: state.results.concat({id: new Date(), value: action.result})})
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter(result => result.id !== action.resultID)
            return updateObject(state, {results: updatedArray})
        default:
            return state
    }
}
export default resultReducer


// return {
//     ...state,
//     results: state.results.concat({id: new Date(), value: action.result})
//     // use concat so it returns a new array, push mutates the original array
// }


// return {
//     ...state,
//     results: updatedArray
// }