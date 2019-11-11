import React, { Component } from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Backdrop from '../Backdrop/Backdrop'

import styles from './Modal.module.css'


// class Modal extends Component {
const Modal = props => {

    return (
        <Aux>
            <Backdrop show={props.show} clicked={props.modalClosed}/>
            <div 
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </Aux>
    )

}

export default React.memo(
    Modal, 
    (prevProps, nextProps) => 
        nextProps.show === prevProps.show && 
        nextProps.children === prevProps.children
    )


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



    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    // }
    // only listens to show/close in the modal
    // componentWillUpdate = () => {
    //     // console.log('[Modal] WillUpdate')
    // }