import React from 'react'
import styles from './burger.module.css'

import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {         // array with 2 elements
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            }) 
        })

    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger