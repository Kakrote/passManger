import React from 'react'

const Footer = () => {
  return (
    <div className='bg-slate-900 fixed bottom-0 w-full py-5 flex justify-center items-center md:flex-row flex-col'>
      <div className="logo font-bold text-xl text-lime-400 ">Pass<span className='text-lime-700'>Mange/&gt;</span></div>
      <span className='text-lime-400 mx-3 font-bold'>By Anshul Pundir <span className='text-red-600 text-2xl'>&hearts;</span></span>
    </div>
  )
}

export default Footer
