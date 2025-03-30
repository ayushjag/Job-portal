import React from 'react'
import { assets } from '../assets/assets'

const Appdownload = () => {
  return (
    <div>
        <div className='bg-gray-100 py-20 '>
            <div className='container flex items-center justify-between'>
            <div className='flex gap-5'>
                <img src={assets.play_store} className='w-20 h-20 ml-10'></img>
                <div>
                <h1 className='text-2xl font-semibold'>Get Our App Today!</h1>
<p className='text-gray-600'>Download our mobile app for a seamless job search experience, instant notifications, and personalized job recommendations.</p>

                </div>
            </div>
            <div>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition'>Download</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Appdownload