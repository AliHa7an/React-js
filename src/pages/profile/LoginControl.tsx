import React from 'react'
import Login from './Login'
import Register from './Register'
import '../../style/login.css'
import { Route, Switch, Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../../protectedRoute/ProtectedRoute'
import HomePage from '../homePage/HomePage'

const LoginControl: React.FC = () => {

const PageNotFound:any =  <h3>404 NOT FOUND</h3>

    return (
        <div className="container">
            <Switch>
                <Route exact path="/"> <Redirect to="/login" /> </Route>
                <Route path="/login"> <Login /> </Route> :
                <Route path="/register"> <Register /> </Route>
                <ProtectedRoute exact path="/homepage" component={HomePage} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </div>
    )

}

export default LoginControl