import request from "../../base/utils/request";
import api from './api'
export function getUsers(){
    return request.get(api.getUsersApi)
}

export function addUser(body){
    return request.post(api.addUserApi, body)
}

export function editUser(userId, body){
    return request.put(api.editUserApi, body, {
        id: userId
    })
}

export function deleteUser(userId){
    return request.delete(api.deleteUserApi, {
        id: userId
    })
}