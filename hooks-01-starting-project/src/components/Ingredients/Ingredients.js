import React, { useReducer, useState, useEffect, useCallback } from 'react';

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


function Ingredients() {
  const [ userIngredients, dispatch ] = useReducer(ingredientReducer, [])
  // const [ userIngredients, setUserIngredients] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ error, setError ] = useState()

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients])

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({type: 'SET', ingredients: filteredIngredients })
  }, [])

  const addIngredientHandler = ingredient => {
    setIsLoading(true)
    fetch('https://udemy-react-burgerhook.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setIsLoading(false)
      return response.json()
    }).then(responseData => {
      dispatch({type: 'ADD', ingredient: {id: responseData.name, ...ingredient }})
    })      
  }

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true)
    fetch(`https://udemy-react-burgerhook.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    }).then(response => {
      setIsLoading(false)
      dispatch({type: 'DELETE', id: ingredientId})
    }).catch(error => {
      setError('Something Went Wrong')
      setIsLoading(false)
    })
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={clearError}>{error}</ErrorModal>}
      <IngredientForm 
        onAddIngredient={addIngredientHandler} 
        loading={isLoading}
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