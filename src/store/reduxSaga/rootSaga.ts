import { all } from "redux-saga/effects";
import { watcherRequestSaga, watcherLoginSaga, watcherEditProfileSaga } from './watcherSaga'

export function* rootSaga() {
    yield all([
        watcherRequestSaga(),
        watcherLoginSaga(),
        watcherEditProfileSaga()
    ])
}
