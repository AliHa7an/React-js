import { call, put } from "redux-saga/effects";
import { setUser } from "../../UserSlice";
import { SendRequest } from "../requests/user";


export function* handleGetUser(action) {
    try {
        const dataRec = action.payload
        const response = yield call(SendRequest, dataRec);
        const data = response;
        yield put(setUser({ ...data }));
    } catch (error) {
        console.log(error);
    }
}