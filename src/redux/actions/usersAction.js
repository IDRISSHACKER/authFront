import * as type from "../types"

export function getUser(user){
    return{
        type: type.GET_USER_REQUESTED,
        payload: user
    }
}