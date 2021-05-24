import { useCallback, useState } from 'react'

const authToken = '36033bf473965ef5f5d829fb27e22fd755445ef7f26276fb225975214a429718'

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestConfig, applyData) => {
        setIsLoading(true)
        setError(null)
        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method || 'GET',
                headers: requestConfig.headers || { 'Authorization': 'Bearer ' + authToken, 'Content-Type': 'application/json' },
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,

            })
            if (!response.ok) { throw new Error('Request failed') }
            const data = await response.json();

            if (applyData) { applyData(data) }

        } catch (error) { setError(error.message || "Something went wrong") }
        setIsLoading(false)
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp