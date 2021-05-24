import React, { useRef, useEffect, useState, useCallback } from 'react'
import InputField from '../../components/inputField/InputFieldComponent'
import { useForm } from "react-hook-form";
import Button from '../../components/buttonComponent/ButtonComponent';
import { useSelector } from 'react-redux'
import MESSAGES from '../../common/Message'
import PATTERN from '../../common/PatternValidation'
import { useDispatch } from 'react-redux'
import { sendRequest } from '../../store/UserSlice'
import { userDataActions } from '../../store/UserData'

const EditProfile = () => {
    const textFocus = useRef();
    const userData = useSelector(state => state.user.userData)
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const [responseCode, setResponseCode] = useState()

    const dispatch = useDispatch();

    const httpRequestError = useSelector(state => state.requestErrors.errorMessage)

    useEffect(() => {
        textFocus.current?.focus()
    }, [])

    const getResponse = useCallback(
        data => {
            const code = data?.code
            setResponseCode(code)
        }, []
    )


    const handleSubmitForm = useCallback(async data => {
        setResponseCode(null)
        const transformData = {
            id: userData?.id,
            email: data?.email || userData?.email,
            name: data?.userName || userData?.name,
            status: data?.status,
            gender: userData?.gender
        }
        dispatch(userDataActions.setUserData(transformData))
        dispatch(sendRequest({ applyData: getResponse, url: 'https://gorest.co.in/public-api/users/' + userData?.id, method: 'PATCH', body: transformData, Dispatch: dispatch }));
    }, [dispatch, getResponse, userData])

    return (
        <form onSubmit={handleSubmit(handleSubmitForm)}>
            <h4> Edit Profile</h4>
            <InputField icon="envelope" placeholder={userData?.email} {...register("email", { pattern: { value: PATTERN.emailPattern, message: MESSAGES.emailValid } })} />
            {errors.email?.message && <p className="error-message">{errors.email.message}</p>}

            <InputField icon='user' placeholder={userData?.name}  {...register("userName", { pattern: { value: PATTERN.userNamePattern, message: MESSAGES.userNameValid } })} ref={textFocus} />
            {errors.userName?.message && <p className="error-message">{errors.userName.message}</p>}

            <InputField placeholder='password' type="password" icon="key" {...register("password", { pattern: { value: PATTERN.passwordPattern, message: MESSAGES.passwordValid }, minLength: { value: 6, message: MESSAGES.passwordLength } })} />
            {errors.password?.message && <p className="error-message">{errors.password.message}</p>}

            <div className="control-group">
                <label>Status:</label>
                <select className="for-border" {...register("status")}>
                    <option value="Inactive">Inactive</option>
                    <option value="Active">Active</option>
                </select>
            </div>
            {httpRequestError && <p className="error-message">Failed to send the request</p>}
            {responseCode === 200 && <p className="success-message">Updated successfully</p>}
            <Button type="submit" className="textpointer" disabled={!isValid}>Update</Button>
        </form>
    )
}
export default React.memo(EditProfile)