import {ERROR_CODE} from '../util/ErrorCode'
const REST_URL = process.env.REACT_APP_REST_API_BASE_URL
const ADD_URL = REST_URL + '/addWeather'
const GET_URL = REST_URL + '/weather'


const messageJson = (message, classaname) => {
    return { message: message, messageClassName: classaname }
}

const postData = async (formData) => {
    const response = await fetch(ADD_URL, { method: 'POST', body: formData });
    const data = await response.json();
    let responseMessage = {}
    if (response.status === 200) {
        let code = ERROR_CODE.ERROR
        if (data && data.success === true) {
            code = ERROR_CODE.SUCCESS
        }
        responseMessage = messageJson(data.msg, code)
    } else {
        responseMessage = messageJson("File upload error occured", ERROR_CODE.ERROR)
    }
    return responseMessage
}

const getData = async (unit) => {
    if(!unit)unit='c'
    const response = await fetch(GET_URL+'/'+unit);
    const data = await response.json();
    return { response, data }
}


export {
    postData
    , getData
}


