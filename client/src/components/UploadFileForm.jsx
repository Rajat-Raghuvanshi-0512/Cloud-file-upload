import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import "./UploadFileForm.css"

const UploadFileForm = () => {
    const [file, setFile] = useState(null)
    const [password, setPassword] = useState("")
    const [fileLink, setFileLink] = useState(null)
    const [loading, setLoading] = useState(false)

    const fileRef = useRef()
    const passRef = useRef()

    const onFileChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }

    const TogglePass = () => {
        if (passRef.current.type === "password") {
            passRef.current.type = "text"
        } else {
            passRef.current.type = "password"
        }
    }
    const handleSubmit = async (e) => {
        try {
            setLoading(true)
            e.preventDefault()
            if (file === null) return;
            const form = new FormData()
            form.append("file", file)
            if (password !== "") {
                form.append("password", password)
            }
            const res = await fetch("/upload", {
                method: "POST",
                body: form
            })
            const data = await res.json()
            console.log(data);
            setFileLink(data.fileLink)
            setLoading(false)
        } catch (error) {
            console.log(error.message);
            setLoading(false)
        }
    }
    return (
        <>
            <form method='post' onSubmit={handleSubmit} className="grid" encType='multipart/formdata'>
                <div className='p-5'>
                    <div className='flex-col bg-darkblue' onClick={() => fileRef.current.click()}>
                        <i className='fs-big'>+</i>
                        <div className='fs-small'>Add a file</div>
                    </div>
                    {
                        file ? <div className='flex file mt-5'>
                            <div>{file.name}</div>
                            <div>({(file.size / 1000 / 1000).toPrecision(2)} MB)</div>
                        </div> :
                            <div className='flex file mt-5'>
                                <div className='text-center w-100'>No file selected</div>
                            </div>
                    }
                    <input type='file' name='file' ref={fileRef} required className='w-0' onChange={onFileChange} />
                </div>
                <div className='p-5'>
                    <input type='password' name='password' ref={passRef} className='input_pass mt-5 w-100' placeholder='Enter a password' onChange={(e) => setPassword(e.target.value)} value={password} autoComplete="on" />
                    <div className='flex mt-2 fs-xsmall'>
                        <input type="checkbox" name="seePass" id="seePass" onChange={TogglePass} />
                        <label htmlFor="seePass">Show Password</label>
                    </div>
                    <button type='submit' className='btn-dark mt-5 w-100' disabled={loading}>{loading ? "Uploading..." : "Upload"}</button>
                    {
                        fileLink && <div className='mt-5'>
                            <div className='fw-bold fs-small text-center w-100'>Your cloud link  </div>
                            <div className='fw-bold text-center w-100 mt-2'>
                                <a href={fileLink}>{fileLink}</a>
                            </div>
                            <div className='fw-bold text-center w-100 cursor-pointer mt-2' onClick={() => navigator.clipboard.writeText(fileLink)}>
                                Copy Link
                            </div>
                        </div>
                    }
                </div>
            </form>
        </>
    )
}

export default UploadFileForm