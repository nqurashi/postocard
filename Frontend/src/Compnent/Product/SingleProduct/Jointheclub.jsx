import React from 'react';
import "./Styles/Jointheclub.css"

const Jointheclub = () => {
  return (
    <div className='Jointheclub'>
        <h2>Join the club and get the benefits</h2>
        <p>Sign up for our newsletter and receive exclusive offers on new ranges, sales, pop up stores and more</p>
        <div className='club_email_box'>
            <input type="text" placeholder='example@gmail.com' />
            <button>Sign up</button>
        </div>
    </div>
  )
}

export default Jointheclub