import React, { useEffect, useState } from 'react';
import SingleCardCompo from "../../Card/SingleCardCompo"
import SingleCardSidebar from './SingleCardSidebar';
import "./Styles/IndexCom.css"
import Tabs from './Tabs';
import CardPricingData from './CardPricingData';
import Jointheclub from './Jointheclub';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../Layout/Loading/Loading';
import { useParams } from 'react-router-dom';
import { getSingleProduct } from '../../../Redux/Action/ProductAction';
import FullCardComponent from '../../Card/FullCardComponent';

const IndexCom = () => {
    const [active , setActive] = useState(1);
    const [content , setContent] = useState("");
    const [name , setName] = useState("")
    const isLoading = useSelector((state)=> state.product.singleProductLoad);
  return (
  //  <>
  //  {
  //   isLoading ? <Loading/> :  

    <div>
    <div className='IndexCom_cartSidebar'>
     <SingleCardSidebar setContenttext={setContent}  setName={setName} />
    <SingleCardCompo content={content} namedata={name}/>
    {/* <FullCardComponent/> */}
    </div>
     {/* ------ tabs  */}
     {/* <Tabs active={active} setActive={setActive}/> */}
     {/* ------ card pricing data  */}
     <CardPricingData active={active} name={name} content={content}/>
     {/* ------ Join the club */}
     <Jointheclub/>
 </div>
  //  }
  //  </>
  )
}


export default IndexCom