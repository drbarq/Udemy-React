import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {

  // const [inputState, setInputState ] = useState({title: '', amount: ''})
  const [enteredTitle, setEnteredTitle] = useState('')
  const [enteredAmount, setEnteredAmount] = useState('')


  const submitHandler = event => {
    event.preventDefault();
    // ...
  };

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input 
              type="text" 
              id="title" 
              value={enteredTitle}
              onChange ={event => {
                setEnteredTitle(event.target.value)
              }}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input 
              type="number" 
              id="amount" 
              value = {enteredAmount}
              onChange = {event => {
                setEnteredAmount(event.target.value)
              }}
              />
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;














// notes 
              // onChange = {event => {
              //   const newValue = event.target.value
              //   setInputState(prevInputState => ({
              //     amount: newValue,
              //     title: prevInputState.title
              //   }))}
              // }
              // onChange={event => inputState[1]({amount: event.target.value, title: inputState[0].title})}    

              // value={inputState.amount}

              // onChange = {event => {
              //   const newTitle = event.target.value
              //   setInputState(prevInputState => ({
              //     title: newTitle,
              //     amount: prevInputState.amount
              //       }))}
              //   }
              // onChange={event => inputState[1]({title: event.target.value, amount: inputState[0].amount})}