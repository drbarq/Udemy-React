import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.module.css'


class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    // only listens to show/close in the modal
    componentWillUpdate = () => {
        // console.log('[Modal] WillUpdate')
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}
                >
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal


//  pre refactor
// const modal = (props) => (
//     <Aux>
//         <Backdrop show={props.show} clicked={props.modalClosed}/>
//         <div 
//             className={styles.Modal}
//             style={{
//                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
//                 opacity: props.show ? '1' : '0'
//             }}
//         >
//             {props.children}
//         </div>
//     </Aux>
// )

// export default modal