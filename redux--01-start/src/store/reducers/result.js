import * as actionTypes from '../actions/actions'

const initialState = {
    results: []
}

const resultReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
                // use concat so it returns a new array, push mutates the original array
            }
        case actionTypes.DELETE_RESULT:
            const updatedArray = state.results.filter(result => result.id !== action.resultID)
            return {
                ...state,
                results: updatedArray
            }
        default:
            return state
    }
}

export default resultReducer
