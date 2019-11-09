export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const ADD = 'ADD'
export const SUB = 'SUB'
export const STORE_RESULT = 'STORE_RESULT'
export const DELETE_RESULT = 'DELETE_RESULT'

export const increment = () => {
    return {
        type: INCREMENT
    }
}

export const decrement = () => {
    return {
        type: DECREMENT
    }
}

export const add = (value) => {
    return {
        type: ADD,
        val: value
    }
}

export const sub = (value) => {
    return {
        type: SUB,
        val: value
    }
}

export const saveResult = (res) => {
    return {
        type: STORE_RESULT,
        result: res
    }
}

export const storeResult = (res) => {
    return function (dispatch) {
        setTimeout(() => {
            dispatch(saveResult(res))
        }, 2000)
    }
}

export const deleteResult = (resultID) => {
    return {
        type: DELETE_RESULT,
        resultID: resultID
    }
}