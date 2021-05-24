import logo from '../../logo.svg'
import InputField from '../../components/inputField/InputFieldComponent'
import React, { useEffect, useRef, useCallback, useState } from 'react'
import Button from '../../components/buttonComponent/ButtonComponent'
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import { userDataActions } from '../../store/UserData'
import MESSAGES from '../../common/Message'
import PATTERN from '../../common/PatternValidation'
import { Link, useHistory } from 'react-router-dom';
import { sendRequest } from '../../store/UserSlice'
import { useSelector } from 'react-redux'
import { requestActions } from '../../store/RequestErrors'

const Login = (props) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const [responseMessage, setResponseMessage] = useState()
    const dispatch = useDispatch();
    const history = useHistory()

    const httpRequestError = useSelector(state => state.requestErrors.errorMessage)

    const textInput = useRef();

    useEffect(() => {
        dispatch(requestActions.setErorrMessage(null))
        textInput.current?.focus();
    }, [dispatch])


    const getResponseMessage = useCallback(data => {
        const code = data?.code
        if (code === 200 && data?.data?.length !== 0) {
            const getData = {
                id: data?.data[0]?.id,
                name: data?.data[0]?.name,
                email: data?.data[0]?.email,
                gender: data?.data[0]?.gender,
                status: data?.data[0]?.status
            }

            dispatch(userDataActions.setUserData(getData))
            setResponseMessage('')
            dispatch(authActions.login())
            history.push('/homepage')
        }
        else { setResponseMessage("User not found") }
    }, [dispatch, history])





    const handleSubmitForm = useCallback(async data => {
        setResponseMessage('')
        dispatch(requestActions.setErorrMessage(null))
        dispatch(sendRequest({ applyData: getResponseMessage, id: 34, url: 'https://gorest.co.in/public-api/users?email=' + data.email, Dispatch: dispatch }));
    }, [dispatch, getResponseMessage])



    return (
        <div className="form-box">
            <img src={logo} className="img" alt="logo" />
            <h2>Login</h2>
            <form className="form-body" onSubmit={handleSubmit(handleSubmitForm)}>
                <InputField type="text" placeholder='email' icon="envelope"  {...register("email", { pattern: { value: PATTERN.emailPattern, message: MESSAGES.emailValid }, required: MESSAGES.emailReq })} ref={textInput} />
                {errors.email?.message && <p className="error-message">{errors.email.message}</p>}
                <InputField placeholder='password' type="password" icon="key" {...register("password", { pattern: { value: PATTERN.passwordPattern, message: MESSAGES.passwordValid }, required: MESSAGES.passwordReq, minLength: { value: 6, message: MESSAGES.passwordLength } })} />
                {errors.password && <p className="error-message">{errors.password?.message}</p>}
                {httpRequestError && <p className="error-message">Failed to send the request</p>}
                {responseMessage && <p className="error-message">{responseMessage}</p>}
                <Button type="submit" disabled={!isValid}>Login</Button>
                <Link to="/register" className="focusText"> <p >Register here</p> </Link>
            </form>
        </div>

    )

}

export default React.memo(Login)


