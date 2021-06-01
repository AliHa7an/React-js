
const authToken = '36033bf473965ef5f5d829fb27e22fd755445ef7f26276fb225975214a429718'

export const sendRequest = async (requestConfig: any) => {

    const response = await fetch(requestConfig.url, {
        method: requestConfig.method || 'GET',
        headers: requestConfig.headers || { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
    })

    if (!response.ok) { throw new Error('Request failed') }
    const data = await response.json();
    return data;

}





