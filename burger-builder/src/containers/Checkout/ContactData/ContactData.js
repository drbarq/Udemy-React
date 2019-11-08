import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault()
        console.log(this.props.ingredients)
                // // alert('You continue!')
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Joe T',
                address: {
                    street: '123 Test Street',
                    postalCode: '80205'
                // name: this.state.name,
                // address: {
                //     street: this.state.street,
                //     postalCode: this.state.postalCode
                },
                email: 'J.Tustin@gmail.com'
            },
            deliveryMethod: 'fastest'          
        }
        // minipulate the price data on the server to avoid users screwing with it 
        axios.post('/orders.json', order)
            .then(response => {
                console.log(`WE ARE HERE${order}`)
                this.setState({loading: false})
                this.props.history.push('/')
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name" />
                <Input inputtype="input" type="email" name="email" placeholder="Your email" />
                <Input inputtype="input" type="text" name="street" placeholder="Street" />
                <Input inputtype="input" type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success" clicked={this.orderHandler}>ORDER HERE</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />
        } 
        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData