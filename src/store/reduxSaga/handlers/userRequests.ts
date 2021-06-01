import { call, put } from "redux-saga/effects";
import { handleErrorsActions } from "../../reducers/handleErrors";
import { sendRequest } from "../requests/request";
import { userDataActions } from '../../reducers/userData'
import { authActions } from '../../reducers/auth'

export function* handleRegisterUser(action: any): any {
    yield put(handleErrorsActions.initialCase())
    const requestConfig = { url: 'https://gorest.co.in/public-api/users', method: 'POST', body: action.payload }
    try {
        const response = yield call(sendRequest, requestConfig);
        const code = response.code
       yield put({type: handleErrorsActions.registerSuccessCase.type, payload:code  })
    } catch (error) {
        yield put(handleErrorsActions.failureCase(error))
    }
}

export function* loginHandler(action: any): any {

    const { email } = action.payload
    const requestConfig = { url: 'https://gorest.co.in/public-api/users?email=' + email, body: null }
    try {
        yield put({ type: handleErrorsActions.initialCase.type })
        const data = yield call(sendRequest, requestConfig);
        const { code }= data
        const length = data?.data?.length
        const receivedData = data?.data[0]
        if (code === 200 && length !== 0) {
            const { id, name, email, gender, status } = receivedData
            const sendingData = {  id, name,  email,  gender, status }
            yield put(userDataActions.setUserData(sendingData))
            yield put(authActions.login())
        } else { yield put(handleErrorsActions.setResponseMessage('user not found')) }

    } catch (error) {
        yield put(handleErrorsActions.failureCase(error))
    }

}


export function* editProfileHandler(action: any): any {

    const { applyData, body } = action.payload
    const requestConfig = { url: 'https://gorest.co.in/public-api/users/' + body?.id, method: 'PATCH' }
    yield put(handleErrorsActions.initialCase())
    try {

        const data = yield call(sendRequest, requestConfig);
        yield put(userDataActions.setUserData(body))
        applyData(data)

    } catch (error) {
        yield put({ type: handleErrorsActions.failureCase.type, payload:error })
    }

}