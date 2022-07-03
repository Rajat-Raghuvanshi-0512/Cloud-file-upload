import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Download from '../pages/Download'
import Password from '../pages/Password'
import FileDownload from "js-file-download"
const ProtectedRoute = () => {
    const [input, setInput] = useState(sessionStorage.getItem("password") || "")
    const { id } = useParams()
    const [redirectToDownload, setRedirectToDownload] = useState(false)
    const [loading, setLoading] = useState(false)

    const getFile = useCallback(async () => {
        try {
            setLoading(true)
            const res = await fetch(`/download/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password: input || null
                })
            })

            if (res.status !== 200) return setLoading(false)
            const data = await res.blob()
            FileDownload(data, res.headers.get("name"))
            setRedirectToDownload(true)
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }, [id, input])

    const renderElement = () => {
        if (redirectToDownload) {
            return <Download input={input} getFile={getFile} loading={loading} />
        }
        return <Password getFile={getFile} input={input} setInput={setInput} loading={loading} />
    }

    useEffect(() => {
        getFile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>{renderElement()}</>
    )
}

export default ProtectedRoute