//封装网络请求，仅为示意
export function getWholeUrl(url, params={}){
    let cloneParams = {...params};
    url = url.replace(/\{(.*?)\}/g, function (matchUrl, $1){
        delete cloneParams[$1]
        return params[$1] || ''
    })

    let query = '?'
    query += Object.keys(cloneParams).map(key => `${key}=${cloneParams[key]}`).join('&')
    return url + query;
}

export function get(url, params={}){
    return fetch(getWholeUrl(url, params), {
        method: 'GET',
    })
}

export function post(url, body, {params}={}){
    return fetch(getWholeUrl(url, params), {
        method: 'POST',
        body: JSON.stringify(body)
    })
}

export function put(url, body, {params}={}){
    return fetch(getWholeUrl(url, params), {
        method: 'PUT',
        body: JSON.stringify(body)
    })
}

export function del(url, params={}){
    return fetch(getWholeUrl(url, params), {
        method: 'DELETE'
    })
}

export default {
    get,
    post,
    put,
    delete: del
}