import React from 'react'
import logo from '../../logo.svg'
import '../../style/homePage.css'
import { useAppSelector } from '../../store/store'

interface IHomeScreenProps {
    children: React.ReactNode
}

const HomeScreen: React.FC<IHomeScreenProps> = props => {
    const userData = useAppSelector(state => state.user.userData)

    return (
        <div className="homepage">
            <h2>Hi {userData?.name}<br />
            Welcome to Home Page</h2>
            <img src={logo} className="img-homepage" alt="logo" />
            {props.children}
        </div>
    )
}

export default React.memo<IHomeScreenProps>(HomeScreen)
