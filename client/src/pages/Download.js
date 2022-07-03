import { useEffect } from 'react'

const Download = ({ getFile, loading }) => {
    useEffect(() => {
        return () => {
            sessionStorage.removeItem("password")
        }
    }, [])
    return (
        <div className='fs-med'>Your file is being downloaded......<button className='cursor-pointer' onClick={getFile} disabled={loading}>{loading ? "Downloading..." : "Click here to download again."}</button></div>
    )
}

export default Download