import { takeLatest } from "redux-saga/effects";
import { handleGetUser } from "./handlers/user";
import { sendRequest } from "../UserSlice";

export function* watcherSaga() {
    yield takeLatest(sendRequest, handleGetUser);
}
