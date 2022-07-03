import { useEffect } from "react"
import "./Password.css"

const PasswordForm = ({ pass, setPass, getFile, loading }) => {

  const downloadFile = (e) => {
    e.preventDefault()
    getFile()
  }

  const handleChange = (e) => {
    setPass(e.target.value)
    sessionStorage.setItem("password", e.target.value)
  }

  useEffect(() => {
    // getFile()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <form onSubmit={downloadFile} className='pass_div'>
      <img src={require("../padlock.png")} alt="password" className='pass_img' />
      <input type="password" value={pass} onChange={handleChange} className="pass_input" placeholder='*********' autoComplete='new-password' />
      <button type='submit' className="pass_btn" disabled={loading}>{loading ? "Matching...." : "Download"}</button>
    </form>
  )
}

export default PasswordForm