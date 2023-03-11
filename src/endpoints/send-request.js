

const SERVER_ADRESS = 'http://localhost:8000' // 'http://0.0.0.0:8000';
const SERVER_API_PATH = '/api/internal';


/**
 * @param {*} params
 * *  @param {string} endpoint
 * *  @param {string} method
 * *  @param {object | undefined} body
 * *  @param {string} accessToken
 * *  @param {object | undefined} queryParams
 */


export function sendRequest(params) {
    const parsedQueryParams = params.queryParams ?
        Object.entries(params.queryParams).map(([key, val], i) => {
            return `${i === 0 ? '?' : '&'}${key}=${val}`;
        }).join('')
    : '';

    const url = `${SERVER_ADRESS}${SERVER_API_PATH}${params.endpoint}${parsedQueryParams}`;

    const headers =  {
        'Content-Type': 'application/json',
    }

    if (params.accessToken) {
        headers['Authorization'] = `Bearer ${params.accessToken}`;
    }

    return fetch(url, {
        method: params.method,
        body: params.body ? JSON.stringify(params.body) : null,
        // mode: 'cors',
        headers,
    })
    .then(async (res) => {
        return {
            url: res.url,
            method: params.method,
            body: await res.json(),
            status: 'success',
        };
    })
    .catch(error => {
        console.error(error);
        return {
            url: url,
            method: params.method,
            errorMsg: error.message,
            status: 'error',
        };
    })
}
