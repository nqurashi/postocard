// import React, { useState } from "react";
// import { useLayoutEffect, useRef } from "react";
// import { gsap } from "gsap";
// import "./Style/CardAnimation.css"
// import "./Style/SingleCard.css";


// const SingleCardCompo = () => {
//   const [img, setImg] = useState("");
//   const [name, setName] = useState("Name");
//   const [check, setCXheck] = useState(0);


  

//   const imageChange = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = () => {
//       setImg(reader.result);
//     };

//     reader.readAsDataURL(file);
//   };


 
//   // ----------------- decrease

//   const decrease = ()=>{

//     if(check === 0 ){
//       setCXheck(0)
//     }else{
//     setCXheck(check -1)
//     }


//   }
// // -----------increase
//   const increase = ()=>{
//     if(check === 2){
//       setCXheck(2)
//     }else{
//       setCXheck(check + 1)
     
//     }
//   }

 

  



//   const container = useRef();
//   const tl = useRef();

//   const toggleTimeline = () => {
//     tl.current.reversed(!tl.current.reversed());
//   };

//   useLayoutEffect(() => {
//     const ctx = gsap.context((self) => {
//       const boxes = self.selector(".box");

//       tl.current = gsap.timeline();

//       if(check === 0){
//         tl.current   //index zero
//         .fromTo(
//           boxes[0],
//           { backgroundColor: "green" },
//           {
//             backgroundColor: "yellow",
//             duration: 1,
//             rotationY: -180,
//             transformOrigin: "left",
//           }
//         )
//         .to(
//           boxes[0],
//           // { backgroundColor: 'green' },
//           { duration: 0.5, x: 248 }
//         )
//         .fromTo(
//           boxes[1],
//           { x: 0 },
//           { x: 248, duration: 0.5, rotateY: 70, transformOrigin: "left" },
//           1
//         )
//         //.to(boxes[2], { y: -166 })
//         .reverse();
//       }

//         // ------------------- 

//     }, container); // <- Scope!
//     return () => ctx.revert(); // <- Cleanup!
//   }, []);
//   return (
//     <div className="single_card">
//       <div className="single_card_main flex justify-center place-items-center flex-col gap-4">
//         {/* ========================================= */}
//         <div className="flip_card_parent">
//           {/* ============ flip box 1 */}
//           {/* <div
//             className={
//               check >= 4 ? `flip4_card  box_1_flip z-[4]` : "box_1_flip"
//             }
//           >
//             <p>Hello</p>
//             <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, optio praesentium! Accusantium laborum iste repellendus culpa ea minima quasi quidem. Illo in facilis sit ab praesentium laudantium provident nostrum, veritatis sed libero tempore cumque consequuntur minus ut voluptates tempora sapiente?</span>
//           </div> */}
//           {/* <div
//             className={
//               check >= 3 ? `flip3_card box_2_flip z-[3] ` : "box_2_flip"
//             }
//           ></div> */}
//           {/* <div
//             className={
//               check >= 2  ? `flip2_card box_3_flip ${check === 2 ? "active" : "not_active"}  ` : "box_3_flip"
//             }
//           >
//             <div className="text_area">
//               <p>Pakistan, populous multiethnic countr   transition: opacity 0.5s linear;  transition: opacity 0.5s linear;y of South Asia. Having a predominately Indo-Iranian speaking population, Pakistan has historically and culturally been associated with its neighbours Iran, Afghanistan, and India.In 1947 Pakistan .een associated with its neighbours Iran, Afghanistan, and India.In 1947 Pakistan </p>
//             </div>
//             <div className="name">
//               <p>Your Name</p>
//             </div>
//             <div className="box3_img">
//               <img src="https://tse2.mm.bing.net/th?id=OIP.TLkQisN5Y7bAOp4dYd0BjAHaHa&pid=Api&P=0&h=180" alt="" />
//             </div>
//           </div>
//           <div
//             className={
//               check >= 1 ? `flip1_card box_4_flip z-[1] ${check === 1 ? "active" : "not_active"}` : "box_4_flip"
//             }
//           >
//             <img src="https://pwcdn.net/pe/1/templates/a5pzw2019015805/thumbs/a5pzw2019015805.jpg" alt="" />
//           </div> */}



//           {/* ==================================  */}
//     {/* <CardAnimation  check={check}  ref={childref}   /> */}

//     {/* =====================  */}
//     <section className="boxes-container" ref={container}>
//         <div>
//           <button onClick={toggleTimeline} >Toggle Timeline</button>
//         </div>
//         <div className="box_main">
//           <div className="box box_1">Box 1</div>
//           <div className="box box_2">Box 2</div>
//           {/* <div className="box box_3">Box 3</div> */}
//         </div>
//       </section>

//         </div>

//         {/* =================================== */}
//         <div className="butoon_editing">
//           <button>Edit Card</button>
//           <button onClick={decrease}>Prev</button>
//           <button onClick={increase}>Next</button>
//           {/* <button onClick={()=> childref.current.toggleTimeline()}>Next</button> */}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SingleCardCompo;


// ==============================

import React, { useEffect, useState } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Style/CardAnimation.css";
import "./Style/SingleCard.css";

const SingleCardCompo = () => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("Name");
  const [check, setCXheck] = useState(0);

  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImg(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
    console.log(!tl.current.reversed());
  };
  // ----------------- decrease
  const decrease = () => {
    if (check >= 0) {
      toggleTimeline();
      console.log(check);
      setCXheck(check - 1);
      console.log(check + "inner");
    }
  };

  const increase = () => {
    if (check <= 3) {
      setCXheck(check +1);
      console.log(check + "inner");
      toggleTimeline();
    }
  };

  

  // console.log(check);

  const container = useRef();
  const tl = useRef();



  useEffect(() => {
    const boxes = document.querySelectorAll(".box");
    tl.current = gsap.timeline();

    if (check === 0) {
      tl.current
        .to(boxes[0], { rotationY: -90, duration: 0.99, transformOrigin: 'left' })
        .to(boxes[0], { duration: 0.01, backgroundImage: "url('https://pwcdn.net/pe/1/templates/a5blm2017003625/thumbs/a5blm2017003625.jpg')" })
        .to(boxes[0], { rotationY: -180, duration: 1, ease: 'ease.in' }, 1)
        .to(boxes[0], { x: 248, duration: 1 })
        .to(boxes[1], { x: 248, duration: 1 }, 2)
        .to(
          boxes[1],
          { duration: 1, rotateY: 70, transformOrigin: "left" },
          2
        )
        .reverse();
    } else if (check === 1) {
      // Add your animation for check === 1 here
      tl.current
        .to(boxes[0], { x: 0, duration: 1, rotateY: -110 })
        .to(boxes[1], { x: 0, duration: 1, rotateY: 0 }, 0)
        .reverse();
    } else if (check === 2) {
      // Add your animation for check === 2 here
      tl.current
        .to(boxes[0], { x: 248, rotationY: -180 })
        .to(boxes[1], { x: 248, rotationY: -45 }, 0)
        .to(boxes[1], { rotationY: -90, zIndex: 10, duration: 1.5 }, 0)
        .reverse();
    }
  }, [check]);

  return (
    <div className="single_card">
      <div className="single_card_main flex justify-center place-items-center flex-col gap-4">
        <div className="flip_card_parent flex justify-center place-items-center flex-col">
          {/* =====================  */} 
          <section className="boxes-container" ref={container}>
           
            <div className="box_main">
              <div className="box box_1 b" style={{
                backgroundImage : "https://pwcdn.net/pe/1/templates/a5shu2022087980/thumbs/a5shu2022087980.jpg"
              }}>Box 1</div>
              <div className="box box_2">Box 2</div>
              {/* <div className="box box_3">Box 3</div> */}
            </div>
          </section>
          {/* =====================  */}
        </div>

        <div className="butoon_editing">
          <button>Edit Card</button>
          <button onClick={decrease}>Prev</button>
          <button onClick={increase}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SingleCardCompo;
