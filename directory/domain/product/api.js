import {apiBaseUrl} from '../../base/const';
export default {
    getProductsApi:  apiBaseUrl + 'products',
    addProductApi: apiBaseUrl + 'products',
    editProductApi: apiBaseUrl + 'product/{id}',
    deleteProductApi: apiBaseUrl + 'product/{id}'
}