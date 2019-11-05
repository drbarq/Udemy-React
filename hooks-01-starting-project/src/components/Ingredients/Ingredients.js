import React, { useReducer, useEffect, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredients 
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter(ing => ing.id !== action.id)
    default: 
      throw new Error('Should not get here!')
  }
}

const httpReducer = (curHttpState, action) => {
  switch (action.type) {
    case 'SEND':
      return {loading: true, error: null}
    case 'RESPONSE':
      return {...curHttpState, loading: false }
    case 'ERROR':
      return {loading: false, error: action.errorMessage}
    case 'CLEAR':
      return {...curHttpState, error: null}
    default: 
      throw new Error('Should not be reached!')
  }
}


function Ingredients() {
  const [ userIngredients, dispatch ] = useReducer(ingredientReducer, [])
  const [ httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null})

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    dispatchHttp({type: 'SEND'})
    fetch('https://udemy-react-burgerhook.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      dispatchHttp({type:'RESPONSE'})
      return response.json()
    }).then(responseData => {
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient }})
    })      
  }

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({type: 'SEND'})
    fetch(`https://udemy-react-burgerhook.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      dispatchHttp({type:'RESPONSE'})
      dispatch({type: 'DELETE', id: ingredientId})
    }).catch(error => {
      dispatchHttp({type: 'ERROR', errorMessage: error.message})
    })
  }

  const clearError = () => {
    dispatchHttp({type: 'CLEAR'})
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler} 
        loading={httpState.loading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;


  // useEffect(() => {
  //   fetch('https://udemy-react-burgerhook.firebaseio.com/ingredients.json')
  //     .then(response => response.json())
  //     .then(responseData => {
  //       const loadedIngredients = []
  //       for( const key in responseData) {
  //         loadedIngredients.push({
  //           id: key, 
  //           title: responseData[key].title,
  //           amount: responseData[key].amount
  //         })
  //       }
  //       setUserIngredients(loadedIngredients)
  //     })
  // }, [])

      
    // setUserIngredients(userIngredients.filter(ingredient => ingredient.id !== ingredientId))
    // console.log(ingredientID)


          // setUserIngredients(prevIngredients => [
      //   ...prevIngredients, 
      //   { id: responseData.name, ...ingredient}
      // ])

      // setUserIngredients(prevIngredients => 
        // prevIngredients.filter((ingredient) => ingredient.id !== ingredientId))

            // setUserIngredients(filteredIngredients)
  // const [ userIngredients, setUserIngredients] = useState([])
        // setError('Something Went Wrong')
      // setIsLoading(false)    // setError(null)
      // setIsLoading(false)      // setIsLoading(false)      // setIsLoading(true)

  // const [ isLoading, setIsLoading ] = useState(false)
  // const [ error, setError ] = useState()

      // setIsLoading(true)