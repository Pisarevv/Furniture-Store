

let target = "http://localhost:3030"

async function request(method, url, data) {
    let options = {
        method,
        headers: {}
    }

    if (data) {
        options.headers["Content-type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    const user = localStorage.getItem('user');
    const auth = JSON.parse(user || '{}');


    if (auth.accessToken) {
        options.headers['X-Authorization'] = auth.accessToken;
    }

    try {
        let response = await fetch(target + url, options);

        if (response.status === 204) {
            return response;
        }

        let result = await response.json();

        if (response.ok !== true) {
            if (response.status === 403) {
                // localStorage.setItem('user', JSON.stringify({}));
                if(response.message == "Invalid access token"){
                    throw (result.message);
                }
                else{
                    throw (result.message);
                }
            }
            throw new Error(result.message);
        }

        return result;
    }
    catch (error) {  
        throw (error);
    }


}



function post(url, data) {
    return request("post", url, data)
}

function get(url) {
    return request("get", url);
}

function put(url, data) {
    return request("put", url, data)
}

function del(url) {
    return request("delete", url);
}

export {
    post,
    get,
    put,
    del as delete
}