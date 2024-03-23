import {apiBaseUrl} from '../../base/const';
export default {
    getUsersApi:  apiBaseUrl + 'users',
    addUserApi: apiBaseUrl + 'users',
    editUserApi: apiBaseUrl + 'user/{id}',
    deleteUserApi: apiBaseUrl + 'user/{id}'
}