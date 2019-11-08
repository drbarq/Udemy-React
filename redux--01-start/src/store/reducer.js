const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    switch ( action.type ) {
        case 'INCREMENT':
            // dont do this, doesnt deeply clone
            // const newState = Object.assign({}, state)
            // newState.counter = state.counter + 1 
            // return newState
            return {
                ...state,
                counter: state.counter + 1
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.val
            }
        case 'SUB':
            return {
                ...state,
                counter: state.counter - action.val
            }
        case 'STORE_RESULT':
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
                // use concat so it returns a new array, push mutates the original array
            }
        case 'DELETE_RESULT':
            const updatedArray = state.results.filter(result => result.id !== action.resultID)
            return {
                ...state,
                results: updatedArray
            }
        default:
            return state
    }
}

export default reducer




    // if (action.type === 'INCREMENT') {
    //     return {
    //         counter: state.counter + 1
    //     }
    // }
    // if (action.type === 'DECREMENT') {
    //     return {
    //         counter: state.counter - 1
    //     }
    // }
    // if (action.type === 'ADD') {
    //     return {
    //         counter: state.counter + action.val
    //     }
    // }
    // if (action.type === 'SUB') {
    //     return {
    //         counter: state.counter - action.val
    //     }
    // }
    // return state



            // const id = 2 
            // const newArray = [...state.results]
            // newArray.results.splice(id, 1)
            // return {
            //     ...state,
            //     results: newArray
            // }