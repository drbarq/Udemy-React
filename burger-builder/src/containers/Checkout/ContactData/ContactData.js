import React, {Component, useState} from 'react'
import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'
import { updateObject, checkValidity } from '../../../shared/utility'

// class ContactData extends Component {
const ContactData = props => {
    const [ orderForm, setOrderForm] =
        useState({
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zipCode: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'ZIP Code'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                        isNumeric: true
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Email Address'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'}
                        ]
                    },
                    valid: true,
                    value: 'fastest',
                    validation: {}
                }
            })

        const [formIsValid, setFormIsValid] = useState(false)
        // formIsValid: false
    

    const orderHandler = (event) => {
        event.preventDefault()

        const formData = {}
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] = orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData,
            userId: props.userId
        }
        props.onOrderBurger(order, props.token)
    }


    const inputChangedHandler = (event, inputId) => {
        const updatedFormElement = updateObject(orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, orderForm[inputId].validation),
            touched: true
        })

        const updatedOrderForm = updateObject(orderForm, {
            [inputId]: updatedFormElement
        })

        let formIsValid = true
        for (let inputId in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputId].valid && formIsValid
        }
        setOrderForm(updatedOrderForm)
        setFormIsValid(formIsValid)
        // this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    const formElementsArray = []
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key]
        })
    }

    let form = (
        <form onSubmit={orderHandler}>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button btnType="Success" disabled={!formIsValid} clicked={orderHandler}>ORDER HERE</Button>
        </form>
    )
    if (props.loading) {
        form = <Spinner />
    } 
    return(
        <div className={styles.ContactData}>
            <h4>Enter Your Contact Data</h4>
            {form}
        </div>
    )
    
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))



        // console.log(event.target.value)
        // const updatedOrderForm = {
        //     ...this.state.orderForm
        // }
        // const updatedFormElement = {
        //     ...updatedOrderForm[inputId]
        // }

        // updatedFormElement.value =  event.target.value
        // updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation),
        // updatedFormElement.touched = true


        // updatedOrderForm[inputId] = updatedFormElement

    // checkValidity = (value, rules) => {
    //     let isValid = true
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid
    //     }
    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }
    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }
    //     return isValid
    // }


// <Input inputtype="input" type="email" name="email" placeholder="Your email" />
// <Input inputtype="input" type="text" name="street" placeholder="Street" />
// <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />

                /* <Input elementType="..." elementConfig="..." value="...." /> */


                // orderHandler = (event) => {
                //     event.preventDefault()
                //     this.setState({loading: true})
                //     const formData = {}
                //     for (let formElementIdentifier in this.state.orderForm) {
                //         formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
                //     }
                //     const order = {
                //         ingredients: this.props.ings,
                //         price: this.props.price,
                //         orderData: formData
                //     }

                // export default connect(mapStateToProps)(withErrorHandler(ContactData, axios))


    // checkValidity(value, rules) {
    //     let isValid = true;
    //     if (!rules) {
    //         return true;
    //     }
        
    //     if (rules.required) {
    //         isValid = value.trim() !== '' && isValid;
    //     }

    //     if (rules.minLength) {
    //         isValid = value.length >= rules.minLength && isValid
    //     }

    //     if (rules.maxLength) {
    //         isValid = value.length <= rules.maxLength && isValid
    //     }

    //     if (rules.isEmail) {
    //         const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     if (rules.isNumeric) {
    //         const pattern = /^\d+$/;
    //         isValid = pattern.test(value) && isValid
    //     }

    //     return isValid;
    // }
    // state = {
    //     orderForm: {
    //         name: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'Your Name'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         street: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'Street'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         zipCode: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'ZIP Code'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true,
    //                 minLength: 5,
    //                 maxLength: 5,
    //                 isNumeric: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         country: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'Country'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         email: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'email',
    //                 placeholder: 'Email Address'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         deliveryMethod: {
    //             elementType: 'select',
    //             elementConfig: {
    //                 options: [
    //                     {value: 'fastest', displayValue: 'Fastest'},
    //                     {value: 'cheapest', displayValue: 'Cheapest'}
    //                 ]
    //             },
    //             valid: true,
    //             value: 'fastest',
    //             validation: {}
    //         }
    //     },
    //     formIsValid: false
    // }