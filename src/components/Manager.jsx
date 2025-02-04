import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passref = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        ref.current.src = 'icons/eyeclo.png'
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])


    const showPassword = () => {
        if (ref.current.src.includes('icons/eyeclo.png')) {
            ref.current.src = 'icons/eyeopen.png'
            passref.current.type = 'text'
        }
        else {

            ref.current.src = 'icons/eyeclo.png'
            passref.current.type = 'password'
        }
    }

    const savePassword = () => {
        toast('Password Save', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
        localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}])) // hum passwordArray ko iss liye nhi le raye kyu ki state update hone mai time lagtha hai
        console.log([...passwordArray, {...form,id:uuidv4()}])

        // Note:- bhai jab local Storage mai sve ar raye hai tho hum ek js object ko string mai save kar raye hai 
        // aur sab ussko fetch kar raye tho wapas object mai convert kar raye hai iss liye strify aur parse k use hoga
    }
    const deletePassword = (id) => {
        toast('Deleted', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log("deleting id: ",id)
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id))) 
        
    }
    const editPassword = (id) => {
        console.log("editinfg id: ",id)
        setform(passwordArray.filter(item=>item.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
        
    }

    const handelChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Text Copied', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
            <div className="absolute  inset-0 -z-10 h-full w-full bg-lime-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-lime-50 opacity-10 blur-[10px]"></div></div>

            {/* this is our main conatent of the page  */}

            <div className=" mx-auto max-w-4xl m-2 container rounded-xl flex flex-col  items-center cursor-pointer min-h-[81.56vh]">
                <h1 className='font-bold text-3xl rounded-full px-2 py-1 text-center text-lime-500 shadow-[0_0_15px_#65B50D] w-fit'>
                    <span>Pass</span>
                    <span className='text-3xl text-lime-700'>Mange/&gt;</span>
                </h1>

                {/* this is our inputs areas  */}

                <div className="flex flex-col p-2  w-full">

                    {/* website url input area  */}
                    <input value={form.site} onChange={handelChange} name="site" placeholder='Enter website URL' type="text" className='myinput' />
                    <div className="flex justify-center items-center md:gap-10 w-full flex-col md:flex-row ">
                        {/* UserName input area  */}
                        <input value={form.username} onChange={handelChange} name='username' placeholder='Enter Username' type="text" className='myinput w-1/2' />
                        {/* password input area  */}
                        <div className="relative">
                            <input ref={passref} value={form.password} onChange={handelChange} name='password' placeholder='Enter Password' type="password" className='myinput' />
                            <span className='absolute right-3 bottom-4 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} src="icons/eyeopen.png" alt="eye" width={23} className='p-1' />
                            </span>
                        </div>
                    </div>
                    {/* Button for saving */}
                    <span className='flex justify-center'>
                        <button onClick={savePassword} type='sumbit' disabled={form.username.length===0||form.site.length===0||form.password.length===0} className='flex justify-center items-center bg-lime-600 hover:bg-lime-800 rounded-full px-2 py-1 disabled:bg-lime-600 text-white enabled:shadow-[0_0_15px_#65B50D]'>
                            <lord-icon
                                src="https://cdn.lordicon.com/tsrgicte.json"
                                trigger="hover"
                                colors="primary:#ffffff,secondary:#000000"
                            >
                            </lord-icon>Add Password</button>
                    </span>
                </div>
                <div className="AllPasswords w-full">
                    <h2 className='font-bold text-2xl py-2'>Your Save <span className='text-lime-800'>Passwords/&gt;</span> </h2>
                    {/*this  is the table where the save passwordsd will appear */}
                    {passwordArray.length === 0 && <div className='text-xl font-bold'> No Password Save</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full overflow-hidden rounded-md ">
                        <thead className='bg-lime-600 text-white'>
                            <tr>
                                <th className='py-2'>Sites</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-lime-100'>
                            {passwordArray.map((items, index) => {
                                return <tr key={index}>
                                    <td className=' text-center border border-lime-500'>
                                        <div className="flex justify-center items-center">
                                            <a href={items.site} target='_black'>{items.site}</a>
                                            <div className='copyIcons size-4' onClick={() => { copyText(items.username) }}>
                                                {/* <lord-icon
                                                    src="https://cdn.lordicon.com/gsjfryhc.json"
                                                    trigger="click"
                                                    style={{ "width": "20px", "height": "20px", "paddingLeft": "2px", "paddingTop": "3px" }}>
                                                </lord-icon> */}
                                                <img src="/icons/copyicon.png" alt="copy" className=''/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center border border-lime-500'>
                                        <div className="flex justify-center items-center">
                                            <span>{items.username}</span>
                                            <div className='copyIcons size-4' onClick={() => { copyText(items.username) }}>
                                                {/* <lord-icon
                                                    src="https://cdn.lordicon.com/gsjfryhc.json"
                                                    trigger="click"
                                                    style={{ "width": "20px", "height": "20px", "paddingLeft": "2px", "paddingTop": "3px" }}>
                                                </lord-icon> */}
                                                <img src="/icons/copyicon.png" alt="copy" className=''/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='  text-center border border-lime-500'>
                                        <div className="flex justify-center items-center">
                                            <span>{items.password}</span>
                                            <div className='copyIcons size-4' onClick={() => { copyText(items.username) }}>
                                                {/* <lord-icon
                                                    src="https://cdn.lordicon.com/gsjfryhc.json"
                                                    trigger="click"
                                                    style={{ "width": "20px", "height": "20px", "paddingLeft": "2px", "paddingTop": "3px" }}>
                                                </lord-icon> */}
                                                <img src="/icons/copyicon.png" alt="copy" className=''/>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='  text-center border border-lime-500'>
                                        <div className="flex justify-center items-center">
                                            <div className=' Editing copyIcons size-7' onClick={() => { editPassword(items.id)}}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/fikcyfpp.json"
                                                    trigger="click"
                                                    colors="primary:#c7c116,secondary:#918d10"
                                                    style={{ "width": "20px", "height": "20px", "paddingLeft": "2px", "paddingTop": "3px" }}
                                                   >
                                                </lord-icon>
                                            </div>

                                            <div className='Delete copyIcons size-7' onClick={() => {deletePassword(items.id) }}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/hwjcdycb.json"
                                                    trigger="click"
                                                    colors="primary:#c7c116,secondary:#918d10"
                                                    style={{ "width": "20px", "height": "20px", "paddingLeft": "2px", "paddingTop": "3px" }}
                                                >
                                                </lord-icon>
                                            </div>

                                        </div>
                                    </td>
                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>
            </div>

        </>
    )
}

export default Manager
