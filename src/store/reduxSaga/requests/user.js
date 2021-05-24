// import axios from "axios";

// export function requestGetUser(id = 1) {
//     return axios.request({
//         method: "get",
//         url: "https://reqres.in/api/users/" + id
//     });
// }

import { requestActions } from '../../RequestErrors'


const authToken = '36033bf473965ef5f5d829fb27e22fd755445ef7f26276fb225975214a429718'


export const SendRequest = async (data) => {
    const { applyData, Dispatch, ...requestConfig } = data
    console.log("applyData", applyData)

    Dispatch(requestActions.setOnLoading(true))
    try {
        const response = await fetch(requestConfig.url, {
            method: requestConfig.method || 'GET',
            headers: requestConfig.headers || { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,

        })
        if (!response.ok) { throw new Error('Request failed') }
        const data = await response.json();

        if (applyData) { applyData(data) }
        console.log("data ", data)
        return data;
    }
    catch (error) {
        console.log("erroring")
        Dispatch(requestActions.setErorrMessage(error.message || "Something went wrong"))
        Dispatch(requestActions.setOnLoading(false))
    }
}





