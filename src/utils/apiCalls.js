let BASE_URL = 'http://192.168.0.103:5000'
const apiCalls = async (endpoint, requestData, method, toast = null) => {
    try {
        let url_endpoit = BASE_URL + endpoint
        console.log(requestData);
        const response = await fetch(url_endpoit, {
            method: method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })

        const respData = await response.json()
        let message = respData?.message ? respData?.message : respData?.error?.message || respData?.error
        let status = respData?.status ? respData?.status : respData?.error?.status
        toast != null && toast.show(message, {
            data: {
                type: status ? 'green' : 'red'
            }
        })
        return respData
    } catch (error) {
        console.error(error.message);
        toast != null && toast.show(error?.message, {
            data: {
                type: 'red'
            }
        })
    }
};

const GETAPI = async (endpoint) => {
    try {
        let url_endpoit = BASE_URL + endpoint
        const response = await fetch(url_endpoit, {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
            },
        })

        const respData = await response.json()
        return respData
    } catch (error) {
        console.log(error);
    }
};

export {
    apiCalls,
    GETAPI
}