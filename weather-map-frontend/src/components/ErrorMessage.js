import React from 'react';
const ErrorMessage = (props) => {

    return (
        <>
            <div className={props.message.messageClassName}>{props.message.message}</div>
        </>
    )

}
export default ErrorMessage;