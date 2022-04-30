import {all} from "redux-saga/effects"
import getUserSaga from "./userSaga"

export default function* rootSaga() {
    yield all([
        getUserSaga()
    ])
}