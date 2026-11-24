import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useRef } from 'react'
import AnimatedIcon from './AnimatedIcon'
import { v4 as uuidv4 } from 'uuid';
import Footer from './Footer'
const Manager = () => {

  const [toggle_visibility, setToggleVisibility] = useState(0)
  const [form, setForm] = useState({ id: uuidv4(), site: "", username: "", password: "" })
  const [passwordAraay, setPasswordArray] = useState([])
  const [error, setError] = useState("")
  const ShowPassword = () => {
    alert("Are you sure you want to see the password ?")
    setToggleVisibility(!toggle_visibility)
  }
  const SavePassword = () => {

    if (form.site.length <= 3 || form.username.length <= 3 || form.password.length <= 3) {
      setError("Every field should contain more than 3 letters!")
      toast('Invalid Credentials', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
    }


    else {
      setError("")

      const exists = passwordAraay.some((element) => element.id === form.id)
      toast(exists ? "Password Updated" : "Password Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });
      const updated_array = exists
        ? passwordAraay.map((element) => (element.id === form.id ? form : element)) // update in place
        : [...passwordAraay, form]                                                  // add new

      setPasswordArray(updated_array)
      localStorage.setItem("passwords", JSON.stringify(updated_array))
      setForm({ id: uuidv4(), site: "", username: "", password: "" })
      

    }
  }
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })

  }
  const handleEdit = (id_pass) => {
    const pass_to_edit = passwordAraay.find((element) => {
      return element.id === id_pass

    })
    
    setForm({ id: pass_to_edit.id, site: pass_to_edit.site, username: pass_to_edit.username, password: pass_to_edit.password })



  }
  const handleDelete = (pass_id) => {
    const updated_array = passwordAraay.filter((element) => element.id !== pass_id)
    setPasswordArray(updated_array)
    localStorage.setItem("passwords", JSON.stringify(updated_array))
    toast('Password Deleted', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

      });


  }
  const copyPassword = (copy) => {
    navigator.clipboard.writeText(copy)
    toast('Copied to Clipboard', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
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
              <AnimatedIcon size={24} color="#13132f" /> <span>Save</span></button>

          </div>


        </div>
        <div className="err text-red-700 text-sm text-center">
          {error}
        </div>
        <div className='font-bold text-2xl py-4'>Your Passwords</div>
        <div className='font-semibold'>{passwordAraay.length === 0 && "No Passwords to display"}</div>

        {passwordAraay.length !== 0 &&

          <table className="table-auto  rounded-lg overflow-hidden w-full mt-4">

            <thead className='bg-green-700 border border-white'>
              <tr >
                <th className='py-1'>Site</th>
                <th>Username</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            {passwordAraay.map((item) => {
              return <tbody className='bg-green-200'>
                <tr>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center gap-1'>
                      <a href={item.site} target='_blank'>{item.site}</a>
                      <img src="./public/copy.png" alt="copy" onClick={() => copyPassword(item.site)} className='cursor-pointer' />
                    </div>
                  </td>

                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center gap-1'>
                      {item.username}
                      <img src="./public/copy.png" alt="copy" onClick={() => copyPassword(item.username)} className='cursor-pointer' />
                    </div>
                  </td>
                  <td className='text-center py-2 border border-white'>
                    <div className='flex justify-center gap-1'>
                      {item.password}
                      <img src="./public/copy.png" alt="copy" onClick={() => copyPassword(item.password)} className='cursor-pointer' />
                    </div>
                  </td>
                  <td className='text-center py-2  border border-white flex justify-center gap-2'>
                    <span><img src="./public/edit.svg" alt="edit" className='cursor-pointer' onClick={() => handleEdit(item.id)} /></span> <span><img src="./public/trash-bin.png" alt="delete" className='cursor-pointer' onClick={() => handleDelete(item.id)} /></span>
                  </td>
                </tr>

              </tbody>
            })}
          </table>
        }


      </div>
      <Footer />

    </>
  )
}

export default Manager
