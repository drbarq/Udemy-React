import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (e) => {
        e.preventDefault()
        console.log(this.props.ingredients)
    }

    render() {
        return(
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input className={styles.Input} type="text" name="name" placeholder="Your name" />
                    <input className={styles.Input} type="email" name="email" placeholder="Your email" />
                    <input className={styles.Input} type="text" name="street" placeholder="Street" />
                    <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER HERE</Button>
                </form>
            </div>
        )
    }
}

export default ContactData