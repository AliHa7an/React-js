import { takeLatest } from "redux-saga/effects";
import { sagaActions } from "./actions/sagaActions";
import { handleRegisterUser, loginHandler, editProfileHandler } from "./handlers/userRequests";

export function* watcherRequestSaga() {
    yield takeLatest(sagaActions.REGISTER_REQUEST, handleRegisterUser);
}

export function* watcherLoginSaga() {
    yield takeLatest(sagaActions.LOGIN_REQUEST, loginHandler)
}

export function* watcherEditProfileSaga() {
    yield takeLatest(sagaActions.EDIT_PROFILE_REQUEST, editProfileHandler)
}