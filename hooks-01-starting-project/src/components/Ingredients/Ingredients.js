import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'
import Search from './Search';
import useHttp from '../hooks/http'

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

function Ingredients() {
  const [ userIngredients, dispatch ] = useReducer(ingredientReducer, [])
  const { isLoading, error, data, sendRequest } = useHttp()

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = useCallback(ingredient => {
    // dispatchHttp({type: 'SEND'})
    // fetch('https://udemy-react-burgerhook.firebaseio.com/ingredients.json', {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   dispatchHttp({type:'RESPONSE'})
    //   return response.json()
    // })
    // .then(responseData => {
    //   dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient }})
    // })      
  }, [])

  const removeIngredientHandler = useCallback(ingredientId => {
    // dispatchHttp({type: 'SEND'})
    sendRequest(`https://udemy-react-burgerhook.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE')
  }, [sendRequest])

  const clearError = useCallback(() => {
    // dispatchHttp({type: 'CLEAR'})
    
  }, [])

  const ingredientList = useMemo(() => {
    return (
      <IngredientList 
        ingredients={userIngredients} 
        onRemoveItem={removeIngredientHandler}
      />
    )
  }, [userIngredients, removeIngredientHandler])

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler} 
        loading={isLoading}
      />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        { ingredientList }
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