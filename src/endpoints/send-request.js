

const SERVER_ADRESS = 'http://localhost:8000' // 'http://0.0.0.0:8000';
const SERVER_API_PATH = '/api/internal';


/**
 * @param {*} params
 * *  @param {string} endpoint
 * *  @param {string} method
 * *  @param {object | undefined} body
 */


export function sendRequest(params) {
    const url = `${SERVER_ADRESS}${SERVER_API_PATH}${params.endpoint}`;

    const headers =  {
        'Content-Type': 'application/json',
    }
    
    if (params.accessToken) {
        headers['Authentication'] = `Bearer ${params.accessToken}`;
    }

    return fetch(url, {
        method: params.method,
        body: params.body ? JSON.stringify(params.body) : null,
        // mode: 'cors',
        // headers: new Headers({
        //     'Content-Type': 'application/json'
        // })
        headers,
    })
    .then(async (res) => {
        return {
            url: res.url,
            method: params.method,
            body: await res.json(),
        };
    })

    // .catch(response => {
    //     console.log(response.json());
    //     return {
    //         response
    //     };
    // })
}
