import React from 'react'

const Footer = () => {
    return (
        <>
            <div className=" absolute bottom-0 w-full bg-gray-900 text-white h-14" >
                <div className="footer-content flex gap-1 justify-center items-center h-14">
                    Made it with <img src="./public/heart.png" alt="heart" width={24} /> and <img src="./public/tea.png" alt="chai" color='white' />
                    by <span className='font-bold'>Umesh</span><img src="./public/monkey.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default Footer
