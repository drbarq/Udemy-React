import React, {Component} from 'react'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postal;Code: ''
        }
    }

    render() {
        return(
            <div>
                <h4>Enter Your Contact Data</h4>
                <form>
                    
                </form>
            </div>
        )
    }


}

export default ContactData