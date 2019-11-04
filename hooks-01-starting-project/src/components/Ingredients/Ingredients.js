import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList'
import Search from './Search';

function Ingredients() {
  const [ userIngredients, setUserIngredients] = useState([])

  const addIngredientHandler = ingredient => {
    fetch('https://udemy-react-burgerhook.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response.json()
    }).then(responseData => {
      setUserIngredients(prevIngredients => [
        ...prevIngredients, 
        { id: responseData.name, ...ingredient}
      ])
    })      
  }

  const removeIngredientHandler = ingredientId => {
    setUserIngredients(prevIngredients => 
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId))
    // setUserIngredients(userIngredients.filter(ingredient => ingredient.id !== ingredientId))
    // console.log(ingredientID)
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHandler}/>

      <section>
        <Search />
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHandler}/>
      </section>
    </div>
  );
}

export default Ingredients;
