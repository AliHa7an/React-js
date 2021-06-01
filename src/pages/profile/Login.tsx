import logo from '../../logo.svg'
import InputField from '../../components/inputField/InputFieldComponent'
import React, { useEffect, useRef, useCallback } from 'react'
import Button from '../../components/buttonComponent/ButtonComponent'
import { useForm } from "react-hook-form";
import MESSAGES from '../../common/Message'
import PATTERN from '../../common/PatternValidation'
import { Link, useHistory } from 'react-router-dom';
import { handleErrorsActions } from '../../store/reducers/handleErrors'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { sagaActions } from '../../store/reduxSaga/actions/sagaActions';

const Login : React.FC = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const dispatch = useAppDispatch();
    const history = useHistory()


    const requestMessages = useAppSelector(state => state.handleErrors)

    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
    const textInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        dispatch(handleErrorsActions.setResponseMessage(null))
        dispatch(handleErrorsActions.setErorrMessage(null))
        textInput.current?.focus();
        if (isAuthenticated) { history.push('/homepage') }
    }, [dispatch, history, isAuthenticated])





    const handleSubmitForm = useCallback((data => {
        dispatch({type: sagaActions.LOGIN_REQUEST, payload: { email: data.email }})
    }), [dispatch]);


    return (
        <div className="form-box">
            <img src={logo} className="img" alt="logo" />
            <h2>Login</h2>
            <form className="form-body" onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField type="text" placeholder='email' icon="envelope"  {...register("email", { pattern: { value: PATTERN.emailPattern, message: MESSAGES.emailValid }, required: MESSAGES.emailReq })} ref={textInput} />
                {errors.email?.message && <p className="error-message">{errors.email.message}</p>}
                <InputField placeholder='password' type="password" icon="key" {...register("password", { pattern: { value: PATTERN.passwordPattern, message: MESSAGES.passwordValid }, required: MESSAGES.passwordReq, minLength: { value: 6, message: MESSAGES.passwordLength } })} />
                {errors.password && <p className="error-message">{errors.password?.message}</p>}
                {requestMessages.errorMessage && <p className="error-message">Failed to Login!</p>}
                {requestMessages.responseMessage && <p className="error-message">{requestMessages.responseMessage}</p>}
                <Button type="submit" disabled={!isValid}>Login</Button>
                <Link to="/register" className="focusText"> <p >Register here</p> </Link>
            </form>
        </div>

    )

}

export default React.memo(Login)


