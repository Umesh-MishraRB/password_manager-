import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import AnimatedIcon from './AnimatedIcon'
const Manager = () => {

  const [toggle_visibility, setToggleVisibility] = useState(0)
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordAraay, setPasswordArray] = useState([])
  const [error, setError] = useState("")
  const ShowPassword = () => {
    alert("Are you sure you want to change the password ?")
    setToggleVisibility(!toggle_visibility)
  }
  const SavePassword = () => {

    if (form.site.length <= 3 || form.username.length <= 3 || form.password.length <= 3) {
      setError("Every field should contain more than 3 letters!")
    }


    else {
      setError("")
      setPasswordArray([...passwordAraay, form])
      localStorage.setItem("passwords", JSON.stringify([...passwordAraay, form]))
      console.log(passwordAraay)
      setForm({ site: "", username: "", password: "" })

    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }
  useEffect(() => {

    let pass = localStorage.getItem("passwords")
    if (pass) {
      setPasswordArray(JSON.parse(pass))
    }

    // localStorage.removeItem("passwords")
  }, [])

  return (
    <>
      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#22c55e0a_1px,transparent_1px),linear-gradient(to_bottom,#22c55e0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="mycontainer flex-col p-5 ">
        <h1 className='text-center font-bold'>
          <span className='text-green-500 text-2xl'>&lt;</span><span className='text-2xl'>Pass</span><span className='text-green-500 text-2xl'>OP/&gt;</span>
        </h1>
        <p className='text-center'>Your own Password Manager</p>
        <div className='flex flex-col p-4 gap-8'>
          <input type="text" vlaue={form.site} className='rounded-full px-3 py-1 outline-none outline-green-500' placeholder='Enter your website URL' name="site" onChange={handleChange} value={form.site} />
          <div className='flex gap-5 relative'>
            <input type="text" className=' w-3/4 rounded-full px-3  py-1 outline-none outline-green-500' placeholder='Enter Username' name="username" onChange={handleChange} value={form.username} />
            <input type="text" className=' w-1/4 rounded-full px-3  py-1 outline-none outline-green-500' placeholder='Enter Password ' name="password" onChange={handleChange} value={form.password} />
            <div className="eye relative left-[-50px] top-1 w-fit cursor-pointer" onClick={ShowPassword}  >
              <span className="material-symbols-outlined" >
                {toggle_visibility == 1 ? 'visibility' : 'visibility_off'}
              </span>
            </div>
          </div>
          <div className='btn flex justify-center mt-3'>
            <button className='flex  bg-green-500 py-1 w-fit rounded-full p-5 border-2 border-green-700 hover:bg-green-400 gap-1 ' onClick={SavePassword}>
              <AnimatedIcon size={24} color="#13132f" /> <span>Add Password</span></button>

          </div>


        </div>
        <div className="err text-red-700 text-sm text-center">
          {error}
        </div>
        <div className='mx-4 font-semibold'>{passwordAraay.length === 0 && "No Passwords to display"}</div>
       
          {passwordAraay.length !== 0 && <table className="table-auto  rounded-lg overflow-hidden w-full mt-4">
            <thead className='bg-green-500 '>
              <tr>
                <th>Site</th>
                <th>Username</th>
                <th>Password</th>
              </tr>
            </thead>
             {passwordAraay.map((item) => {
               return <tbody className='bg-green-100'>
              <tr>
                <td className='text-center'><a href={item.site} target='_blank'>{item.site}</a></td>
                <td className='text-center'>{item.username}</td>
                <td className='text-center'>{item.password}</td>
              </tr>

            </tbody>
               })}
          </table>
              }
      

      </div>

    </>
  )
}

export default Manager
