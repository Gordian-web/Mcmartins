import React from 'react'

export const Notfound = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-4xl font-bold text-center'>404</h1>
        <h1 className='text-4xl font-bold text-center'>Page Not Found</h1>
        <p className='text-center'>Sorry, the page you are looking for does not exist.</p>
        <p className='text-center'>Please check the URL and try again.</p>
    </div>
)
}
export default Notfound
