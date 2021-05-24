import React from 'react'
import logo from '../../logo.svg'
import '../../style/homePage.css'
import { useSelector } from 'react-redux'

const HomeScreen = props => {
    const userData = useSelector(state => state.user.userData)

    return (
        <div className="homepage">
            <h2>Hi {userData?.name}<br />
            Welcome to Home Page</h2>
            <img src={logo} className="img-homepage" alt="logo" />
            {props.children}
        </div>
    )
}

export default React.memo(HomeScreen)
