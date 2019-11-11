import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

// class OrderSummary extends Component {
const OrderSummary = props => {

    // this could be a functional component, this always needs to update when the modal is shown 
    // componentDidUpdate() {
    //     console.log("Order Summary")
    // }

    // componentWillUpdate() {
    //     // console.log("Order Summary")
    // }

    const ingredientSummary = Object.keys(props.ingredients)
    .map((igKey) => {
        return <li key={igKey}>
                    <span 
                        style={{textTransform: 'capitalize'}}
                    >
                        {igKey}
                    </span>
                        : {props.ingredients[igKey]}
                </li>
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button
                btnType="Danger"
                clicked={props.purchaseCancelled}
            >
                CANCEL
            </Button>
            <Button
                btnType="Success"
                clicked={props.purchaseContinued}
            >
                CONTINUE
            </Button>
        </Aux>
    )
}

export default OrderSummary


// pre refactoring
// import React from 'react'
// import Aux from '../../../hoc/Aux'
// import Button from '../../UI/Button/Button'


// const orderSummary = (props) => {
//     const ingredientSummary = Object.keys(props.ingredients)
//         .map((igKey) => {
//             return <li key={igKey}>
//                         <span 
//                             style={{textTransform: 'capitalize'}}
//                         >
//                             {igKey}
//                         </span>
//                             : {props.ingredients[igKey]}
//                     </li>
//         })

//     return (
//         <Aux>
//             <h3>Your Order</h3>
//             <p>A Delicious burger with the following ingredients:</p>
//             <ul>
//                 {ingredientSummary}
//             </ul>
//             <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
//             <p>Continue to Checkout?</p>
//             <Button
//                 btnType="Danger"
//                 clicked={props.purchaseCancelled}
//             >
//                 CANCEL
//             </Button>
//             <Button
//                 btnType="Success"
//                 clicked={props.purchaseContinued}
//             >
//                 CONTINUE
//             </Button>
//         </Aux>
//     )
// }

// export default orderSummary