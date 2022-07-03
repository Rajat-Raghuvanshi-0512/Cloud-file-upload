import React from 'react'
import PasswordForm from '../components/PasswordForm'

const Password = ({ input, setInput, getFile, loading }) => {
    return (
        <PasswordForm getFile={getFile} pass={input} setPass={setInput} loading={loading} />
    )
}

export default Password