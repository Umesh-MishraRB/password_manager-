import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-gray-900 text-white px-4 h-14' >
            <div className="mycontainer flex justify-between h-12 items-center">
                <div className="logo font-bold green "> 
                    <span className='text-green-500 font-bold'>&lt;</span><span className='font-bold' >Pass</span><span className='text-green-500 font-bold'>OP/&gt;</span></div>
                <ul className='flex gap-7'>
                    <li><a href="#" className='hover:font-semibold'>Home</a></li>
                    <li><a href="#" className='hover:font-semibold'>About Us</a></li>
                    <li><a href="#" className='hover:font-semibold'>Contact</a>s</li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
