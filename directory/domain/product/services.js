import request from "../../base/utils/request";
import api from './api'
export function getProducts(){
    return request.get(api.getProductsApi)
}

export function addProduct(body){
    return request.post(api.addProductApi, body)
}

export function editProduct(id, body){
    return request.put(api.editProductApi, body, {
        id
    })
}

export function deleteProduct(id){
    return request.delete(api.deleteProductApi, {
        id
    })
}