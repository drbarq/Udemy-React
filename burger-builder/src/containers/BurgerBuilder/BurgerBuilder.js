import React, { Component, useState, useEffect, useCallback } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

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

    const dispatch = useDispatch()

    const onIngredientAdded =  (ingName) => dispatch(actions.addIngredient(ingName))
    const onIngredientRemoved =  (ingName) => dispatch(actions.removeIngredient(ingName))
    // const oninitIngredients =  () => dispatch(actions.initIngredients())
    const oninitIngredients =  useCallback(() => dispatch(actions.initIngredients()), [dispatch])
    const onInitPurchase =  () => dispatch(actions.purchaseInit())
    const onSetAuthRedirectPath =  (path) => dispatch(actions.setAuthRedirectPath(path))


    // ings: state.burgerBuilder.ingredients,
    // price: state.burgerBuilder.totalPrice,
    // error: state.burgerBuilder.error,
    // isAuthenticated: state.auth.token !== null

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    })

    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice
    })

    const error = useSelector(state => {
        return state.burgerBuilder.error
    })

    const isAuthenticated = useSelector(state => {
        return state.auth.token !== null
    })

    // state = {
    //     purchasing: false
    // }

    // const { oninitIngredients } = props

    useEffect(() => {
        oninitIngredients()
    }, [oninitIngredients])

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
        if (isAuthenticated) {
            setPurchasing(true)
            // this.setState({purchasing: true})
        } else {
            onSetAuthRedirectPath('/checkout')
            props.history.push('/auth')
        }
    }

    const purchaseCancelledHandler = () => {
        setPurchasing(false)
        // this.setState({purchasing: false})
    }

    const purchaseContinueHandler = () => {
        onInitPurchase()
        props.history.push('/checkout')
    }

        const disabledInfo = {
            // ...this.state.ingredients
            ...ings
        }
        // might be an error here

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null
        let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (ings) {
            burger = (
                <Aux>
                    <Burger ingredients={ings}/>
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}
                        disabled={disabledInfo}
                        totalPrice={price}
                        purchaseable={updatePurchaseState(ings)}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                    />
                </Aux>
                )
            orderSummary = <OrderSummary 
                                ingredients={ings}
                                purchaseCancelled={purchaseCancelledHandler}
                                purchaseContinued={purchaseContinueHandler}
                                price={price}
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

// const mapStateToProps = state => {
//     return {
//         // ings: state.burgerBuilder.ingredients,
//         // price: state.burgerBuilder.totalPrice,
//         // error: state.burgerBuilder.error,
//         // isAuthenticated: state.auth.token !== null
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
//         onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
//         oninitIngredients: () => dispatch(actions.initIngredients()),
//         onInitPurchase: () => dispatch(actions.purchaseInit()),
//         onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))
export default withErrorHandler(BurgerBuilder, axios)




// <BuildControls
// ingredientAdded={props.onIngredientAdded}
// ingredientRemoved={props.onIngredientRemoved}
// disabled={disabledInfo}
// totalPrice={props.price}
// purchaseable={updatePurchaseState(props.ings)}
// ordered={purchaseHandler}
// isAuth={props.isAuthenticated}
// />
// </Aux>
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