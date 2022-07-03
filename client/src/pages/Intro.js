import React from 'react'
import { useNavigate } from 'react-router-dom'

const Intro = () => {
    const Navigate = useNavigate()
    return (
        <div className='container text-center'>
            <h3 className='text-center fs-med uppercase '>Welcome to Cloud Share</h3>
            <p className='fs-small fw-bold mt-5'>Uploading files to cloud made easier</p>
            <p className='fs-xsmall fw-bold mt-5 '>Upload your files on cloud and share with friends....</p>
            <button className='btn-dark mt-5' onClick={() => Navigate("/upload")}>Continue</button>
        </div>
    )
}

export default Intro