import React, { useState, useRef } from 'react';
import * as httpService from '../service/HttpService';
import {ERROR_CODE} from '../util/ErrorCode'

const FileUpload = (props) => {

  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(false);
  const ref = useRef();

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  const postWeatherData = async () => {
    try {
      const formData = new FormData();
      formData.append('File', selectedFile);
      setButtonDisable(true)
      props.printMessage({ message: "Uploading...", messageClassName: ERROR_CODE.UPLOADING })
      const responseMessage = await httpService.postData(formData)
      handleResponseMessage(responseMessage)
    } catch (error) {
      console.log(error)
      let msg = "File upload failed."
      if (!error.response) {
        msg = msg + 'Network error..';
      }
      handleResponseMessage({ "message": msg, "messageClassName": ERROR_CODE.ERROR })
    } finally {
      setButtonDisable(false)
    }
  };

  const getWeatherData = async () => {
    try {
      const { response, data } = await httpService.getData()
      if (response.status === 200) {
        props.getWeatherData(data)
      }
    } catch (error) {
      handleResponseMessage({ "message": "File upload error occured", "messageClassName": ERROR_CODE.ERROR })
    }
  }

  const handleResponseMessage = (responseMessage) => {
    if (responseMessage.messageClassName === ERROR_CODE.SUCCESS) {
      getWeatherData('c')
    } else {
      props.getWeatherData([])
    }
    props.printMessage(responseMessage)
  }

  const reset = () => {
    ref.current.value = "";
    props.getWeatherData([])
    setIsSelected(false)
    props.printMessage({})
  };

  return (
    <>
      <div><input type="file" name="file" onChange={changeHandler} ref={ref} /></div>
      {isSelected ? (
        <>
          <div>
            <button disabled={buttonDisable} className="formbutton" onClick={postWeatherData}>Submit</button>
          </div>
          <div><button disabled={buttonDisable} className="formbutton" onClick={reset}>Reset</button></div>
        </>
      ) : (
        ""
      )}
    </>
  )
};

export default FileUpload;
