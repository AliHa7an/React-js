import logo from '../../logo.svg'
import InputField from '../../components/inputField/InputFieldComponent'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import Button from '../../components/buttonComponent/ButtonComponent'
import { useForm } from "react-hook-form";
import MESSAGES from '../../common/Message'
import PATTERN from '../../common/PatternValidation'
import { Link } from 'react-router-dom';
import { handleErrorsActions } from '../../store/reducers/handleErrors'
import { useAppDispatch, useAppSelector } from '../../store/store';
import { sagaActions } from '../../store/reduxSaga/actions/sagaActions';

const Register : React.FC= () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const textInput = useRef<HTMLInputElement>(null);
    const [password, setPassword] = useState<string>('')
    const dispatch = useAppDispatch();
    const requestMessages = useAppSelector(state => state.handleErrors)

    useEffect(() => {
        textInput.current?.focus();
        dispatch(handleErrorsActions.setResponseMessage(null))
        dispatch(handleErrorsActions.setErorrMessage(null))
    }, [dispatch])




    const onSubmit = useCallback(async data => {
        const registerDetails = {
            name: data.userName,
            email: data.email,
            status: data.status,
            gender: data.gender,
        }
        dispatch({ type:sagaActions.REGISTER_REQUEST ,payload: registerDetails});
    }, [dispatch])


    return (

        <div className="form-box">
            <img src={logo} className="img" alt="logo" />
            <h2>Register</h2>
            <form className="form-body" onSubmit={handleSubmit(onSubmit)}>
                <InputField icon='user' placeholder="username" {...register("userName", { pattern: { value: PATTERN.userNamePattern, message: MESSAGES.userNameValid }, required: MESSAGES.userReq })} ref={textInput} />
                {errors.userName?.message && <p className="error-message">{errors.userName.message}</p>}

                <InputField type="email" placeholder='email' icon="envelope" {...register("email", { pattern: { value: PATTERN.emailPattern, message: MESSAGES.emailValid }, required: MESSAGES.emailReq })} />
                {errors.email?.message && <p className="error-message">{errors.email.message}</p>}

                <InputField placeholder='password' type="password" icon="key" {...register("password", { pattern: { value: PATTERN.passwordPattern, message: MESSAGES.passwordValid }, required: MESSAGES.passwordReq, minLength: { value: 6, message: MESSAGES.passwordLength } })} onBlur={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
                {errors.password?.message && <p className="error-message">{errors.password.message}</p>}

                <InputField placeholder='confirmPassword' type="password" icon="key" {...register("confirmPassword", { pattern: { value: PATTERN.passwordPattern, message: MESSAGES.passwordValid }, required: "Please enter confirm password", minLength: { value: 6, message: MESSAGES.passwordLength }, validate: value => value === password })} />
                {errors.confirmPassword && errors.confirmPassword?.type === "validate" ? <p className="error-message">password did not match</p> : <p className="error-message">{errors.confirmPassword?.message}</p>}

                <div className="control-group">
                    <label>Gender:</label>
                    <select className="for-border" {...register("gender")}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    <label>Status:</label>
                    <select className="for-border" {...register("status")}>
                        <option value="Inactive">Inactive</option>
                        <option value="Active">Active</option>
                    </select>
                </div>
                {requestMessages.errorMessage && <p className="error-message">Failed to send the request</p>}
                {requestMessages.responseMessage && requestMessages.responseMessage === "201" ? <p className="success-message">Registered successfully</p> : <p className="error-message">{requestMessages.responseMessage}</p>}

                <Button type="submit" disabled={!isValid}>Register</Button>
                <Link to="/login" className="focusText"> <p>Login here</p> </Link>
            </form>
        </div>
    )

}

export default Register