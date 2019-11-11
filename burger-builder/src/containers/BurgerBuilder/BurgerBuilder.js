import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

// class BurgerBuilder extends Component {
const BurgerBuilder = props => {
    const [purchasing, setPurchasing] =  useState(false)


    // state = {
    //     purchasing: false
    // }

    useEffect(() => {
        props.oninitIngredients()
    }, [])

    // componentDidMount = () => {
    //     // console.log(this.props)
    //     // oninitIngredients
    //     this.props.oninitIngredients()
    // }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el 
            }, 0)
        // this.setState({purchaseable: sum > 0})
        return sum > 0 
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
            // this.setState({purchasing: true})
        } else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelledHandler = () => {
        setPurchasing(false)
        // this.setState({purchasing: false})
    }

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push('/checkout')
    }

        const disabledInfo = {
            // ...this.state.ingredients
            ...props.ings
        }
        // might be an error here

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={props.ings}/>
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={props.price}
                        purchaseable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        isAuth={props.isAuthenticated}
                    />
                </Aux>
                )
            orderSummary = <OrderSummary 
                                ingredients={props.ings}
                                purchaseCancelled={purchaseCancelledHandler}
                                purchaseContinued={purchaseContinueHandler}
                                price={props.price}
                            />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return(
            <Aux>
                <Modal 
                    show={purchasing} 
                    modalClosed={purchaseCancelledHandler}
                >
                {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        oninitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))


    // constructor(props) {
    //     super(props)
    //     this.state={}
    // }

// addIngredientHandler = type => {
//     const oldCount = this.state.ingredients[type]
//     const updatedCount = oldCount + 1
//     const updatedIngredients = {
//         ...this.state.ingredients
//     }
//     updatedIngredients[type] = updatedCount

//     const priceAddition = INGREDIENT_PRICES[type]
//     const oldPrice = this.state.totalPrice
//     const newPrice = oldPrice + priceAddition
//     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
//     this.updatePurchaseState(updatedIngredients)
// }

// removeIngredientHandler = type => {
//     const oldCount = this.state.ingredients[type]
//     if (oldCount <=0 ){
//         return
//     }
//     const updatedCount = oldCount - 1
//     const updatedIngredients = {
//         ...this.state.ingredients
//     }
//     updatedIngredients[type] = updatedCount

//     const priceSubtraction = INGREDIENT_PRICES[type]
//     const oldPrice = this.state.totalPrice
//     const newPrice = oldPrice - priceSubtraction
//     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
//     this.updatePurchaseState(updatedIngredients)
// }

                        // purchaseable={this.state.purchaseable}
// purchaseContinueHandler = () => {
//     const queryParams = []
//     for (let i in this.state.ingredients) {
//         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
//     }
//     queryParams.push('price=' + this.state.totalPrice)
//     const queryString = queryParams.join('&')
//     this.props.history.push({
//         pathname: '/checkout',
//         search: '?' + queryString
//     })
// }

// loading: false,
// error: null