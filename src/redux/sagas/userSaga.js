import {call, put, takeEvery} from "redux-saga/effects";
import config from './../../config';
import axios from "axios";
import * as type from "../types"

const apiUrl = config.baseUrlServerApiUser;

function getUserApi() {
    return axios.get(apiUrl+"/infos", {
        baseURL: apiUrl,
        headers: {
            'authorization': `Bearer ${localStorage.getItem("token")}`
        } 
    }).then(data => data)
    .catch(err => {throw err});
}


function* fetchUserApi(action) {
    try {
        const user = yield call(getUserApi);
        yield put({type: type.GET_USER_SUCCESS, user: user.data});
    } catch (error) {
        yield put({ type: type.GET_USER_FAILURE, error: error.response.data});
    }
}

function* getUserSaga() {
    yield takeEvery(type.GET_USER_REQUESTED, fetchUserApi);
}

export default getUserSaga;