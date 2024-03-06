import React from 'react'
import { ToastContainer } from 'react-toastify';

function ToastComp() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            pauseOnHover
            theme="dark"
            transition:Bounce
        />
    )
}

export default ToastComp