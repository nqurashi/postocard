import React, { useState, useEffect } from 'react';
import "./style/ConformOrder.css"
import ConformOrderModal from './ConformOrderModal';
import OrderSuccess from './OrderSuccess';
import PaymentFai from './PaymentFai';
import { useSelector } from 'react-redux';

const ConformOrderCom = () => {
   

    const Loading = useSelector((state)=> state.order.loading)
    const failed = useSelector((state)=> state.order.isFailed)
    const isSuccess = useSelector((state)=> state.order.isSuccess)

    console.log(Loading);
    console.log(failed);
    console.log(isSuccess);


    return (
        <div className='ConformOrderCom'>
            {
                Loading &&  <ConformOrderModal/>
            }
             {
                isSuccess && <OrderSuccess/>
             }
           
               {
                failed &&  <PaymentFai/>
               }
            
        </div>
    )
}

export default ConformOrderCom;
