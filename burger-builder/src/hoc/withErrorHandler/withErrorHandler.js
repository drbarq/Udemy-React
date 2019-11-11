import React, { Component, useState, useEffect } from 'react'
import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'
import axios from '../../axios-orders'
import useHttpErrorHandler from '../../hooks/http-error-handler'

const withErrorHandler = (WrappedComponent, axios) => {
    // return class extends Component {
    return props => {
        const [error, clearError] =  useHttpErrorHandler(axios)


        return (
            <Aux>
                <Modal 
                    show={error}
                    modalClosed={clearError}
                >
                    {error ? error.message : null}
                    Something didn't work!
                </Modal>
                <WrappedComponent {...props}/>
            </Aux>
        )
    }
}

export default withErrorHandler


        // const [ error, setError ] = useState(null)

        // const reqInterceptor = axios.interceptors.request.use(req => {
        //     setError(null)
        //     return req
        // })
        
        // const resInterceptor = axios.interceptors.response.use(
        //     res => res, 
        //     err => {
        //     setError(err)
        //     }
        // )

        // useEffect(() => {
        //     return () => {
        //         axios.interceptors.request.eject(reqInterceptor)
        //         axios.interceptors.request.eject(resInterceptor)
        //     }
        // }, [reqInterceptor, resInterceptor])

        // const errorConfirmedHandler = () => {
        //     setError(null)
        // }



        // state = {
        //     error: null
        // }
        // componentWillUnmount = () => {
        //     // console.log('Will Unmount', this.reqInterceptor, this.resInterceptor)
        //     axios.interceptors.request.eject(this.reqInterceptor)
        //     axios.interceptors.request.eject(this.resInterceptor)
        // }

        // this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        //     this.setState({error: error})
        // })
        