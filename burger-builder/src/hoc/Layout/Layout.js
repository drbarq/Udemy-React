import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import styles from './Layout.module.css'

// class Layout extends Component {
const Layout = props => {
    const [sideDrawerIsVisable, setSideDrawerIsVisable] = useState(false)


    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisable(false)
        // this.setState({showSideDrawer: false})
    }
    
    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisable(!sideDrawerIsVisable)
    }


        return (
            <Aux>
                <Toolbar 
                    drawerToggleClicked={sideDrawerToggleHandler}
                    isAuth={props.isAuthenticated}
                />
                <SideDrawer 
                    open={sideDrawerIsVisable} 
                    closed={sideDrawerClosedHandler}
                    isAuth={props.isAuthenticated}
                />
                <main className={styles.Content}>
                    {props.children}
                </main>
            </Aux>      
        )
    
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null 
    }
}

export default connect(mapStateToProps)(Layout)


    // sideDrawerToggleHandler = () => {
    //     this.setState((prevState) => {
    //         return {showSideDrawer: !prevState.showSideDrawer}
    //     })
    // }

    
    // state = {
    //     showSideDrawer: false
    // }