import React from 'react';
import "./Style/ContactUs.css"
import Hero from './Hero/Hero';

const Index = () => {
  return (
    <>
    <div className='conatct_us_main'>
      <div className='contact_us_content'>
      <h2>Contact Us</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam iure maiores mollitia culpa id soluta repudiandae ducimus magni incidunt debitis praesentium ad iusto repellendus, doloribus reiciendis hic quidem possimus porro.</p>
        <input type='text' placeholder='Enter Your Name' required/>
        <input type='email' placeholder='Enter your email address' required/>
        <textarea placeholder="Enter Your Message" cols={6} rows={5} required/>
        <button>Submit</button>
      </div>
    <Hero/>
    </div>
    </>
  )
}

export default Index