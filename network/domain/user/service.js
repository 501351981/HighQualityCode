import userApis from "./api";
import request from "../../base/utils/request";
export function getUsers(cancel){
    return request(userApis.getUserList, {
        getCancelMethod: cancel
    });
}