import React from 'react'

const Navbar = () => {
  return (
    <nav className='border-b-2 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(160,119,198,0.4),rgba(255,255,255,0))] text-white  hover:cursor-pointer'>
        <div className='mx-auto max-w-4xl flex justify-between py-2 px-2'>

        <div className="logo font-bold text-xl text-lime-400 ">Pass<span className='text-lime-700'>Mange/&gt;</span></div>
            <ul>
                <li className='hover:underline hover:font-bold hover:text-lime-200'><a href="/">Home</a></li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar
