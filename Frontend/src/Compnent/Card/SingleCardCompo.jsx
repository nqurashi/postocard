



// ================================================== 
import React, { useEffect, useState } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Style/CardAnimation.css";
import "./Style/SingleCard.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../../Redux/Action/ProductAction";
import { GetAllCartData } from "../../Redux/Action/CartAction";

const SingleCardCompo = ({ content ,namedata}) => {
  const [img, setImg] = useState("");
  const [name, setName] = useState("Name");
  const [check, setCXheck] = useState(0);
  const [checkDec, setCheckDec] = useState(0);

  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct(id));
  }, [id]);

  const singleproduct = useSelector((state) => state.product.singleproduct);

  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");




  useEffect(() => {
    setImage1(singleproduct && singleproduct.File1);
    setImage2(singleproduct && singleproduct.File2);
    setImage3(singleproduct && singleproduct.File3);
    setImage4(singleproduct && singleproduct.File4);

    // Call the function to preload images
    preloadImages([image1, image2, image3, image4]);

    // Call the function to update the background image
    updateBackgroundImage(check, singleproduct);
  }, [singleproduct]);

  const preloadImages = (imageUrls) => {
    imageUrls.forEach((imageUrl) => {
      const img = new Image();
      img.src = imageUrl;
    });
  };

  const imageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImg(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const container = useRef();
  const tl = useRef();
  const tp = useRef();
  const Anim0 = useRef();
  const Anim1 = useRef();
  const Anim2 = useRef();
  const Anim3 = useRef();

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  const ToggleReverse = () => {
    tp.current.reversed(!tp.current.reversed());
  };

  const updateBackgroundImage = (check, singleproduct) => {
    const boxes = document.querySelectorAll(".box");
    const text = document.querySelectorAll(".text");
    tl.current = gsap.timeline();

    if (check === 0) {
      tl.current
      // .to(boxes[1], {})
        .to(boxes[0], {
          rotationY: -90,
          duration: 0.99,
          transformOrigin: "left",
        })
        .to(boxes[0], { duration: 0.01, backgroundImage: `url(${image2})` })
        .to(boxes[0], { rotationY: -180, x: 248, duration: 1 }, 1)
        .to(boxes[1], { x: 248, duration: 1 }, 1)
        .to(boxes[1], { duration: 1, rotateY: 70, transformOrigin: "left" }, 1)
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
        .to(text[0], { display: "none" })
        .to(boxes[1], { backgroundImage: `url(${image4})`, duration: 0.01 })
        .to(boxes[1], { rotationY: -180, duration: 1 })
        .reverse();
    }
  };

  // --- pre
  const PreAnimation = () => {
    const boxes = document.querySelectorAll(".box");
    const text = document.querySelectorAll(".text");
    tp.current = gsap.timeline();
    if (checkDec === 3) {
      tp.current
        .to(boxes[1], { rotationY: -90, duration: 0.6 })
        .to(text[0], { display: "block" })
        .to(boxes[1], { duration: 0.001, backgroundImage: `url(${image3})` })
        .to(boxes[1], { x: 0, rotationY: 0, zIndex: -1, duration: 1 }, 1)
        .to(
          boxes[0],
          { x: 0, rotationY: -110, duration: 1, transformOrigin: "left" },
          1
        )
        .reverse();
    }
    if (checkDec === 2) {
      tp.current
        .to(boxes[0], { rotationY: -180, duration: 1 })
        .to(boxes[0], { x: 248, duration: 1 }, 0)
        .to(boxes[1], { x: 248, duration: 1 }, 0)
        .to(boxes[1], { duration: 1, rotateY: 70, transformOrigin: "left" }, 0)
        .reverse();
    }
    if (checkDec === 1) {
      tp.current
        .to(boxes[1], { x: 0, rotationY: 0, duration: 1 })
        .to(
          boxes[0],
          { x: 0, rotationY: -90, duration: 1, transformOrigin: "left" },
          0
        )
        .to(boxes[0], { backgroundImage: `url(${image1})`, duration: 0.01 })
        .to(boxes[0], { rotationY: 0, duration: 1, ease: "ease.in" })
        .reverse();
    }
  };

  useEffect(() => {
    const boxes = document.querySelectorAll(".box");
    tl.current = gsap.timeline();
    tl.current.set(boxes[0], { backgroundImage: `url(${image1})` });
    tl.current.set(boxes[1], { backgroundImage: `url(${image3})`,zIndex : -1})
  }, [image1,id]); // Listen for changes in the image1 state

  const decrease = () => {
    if (checkDec > 0) {
      setCheckDec(checkDec - 1);
      setCXheck(check - 1);
      PreAnimation();
      ToggleReverse();
    }
  };

  const increase = () => {
    if (check < 3) {
      setCXheck(check + 1);
      setCheckDec(checkDec + 1);
      NextAnimation();
      toggleTimeline();
    }
  };

  const NextAnimation = () => {
    updateBackgroundImage(check, singleproduct);
  };

  return (
    <div className="single_card">
      <div className="single_card_main flex justify-center place-items-center flex-col gap-4">
        <div className="flip_card_parent flex justify-center place-items-center flex-col">
          {/* =====================  */}
          <section className="boxes-container" ref={container}>
            <div className="box_main">
              <div className="box box_1 b"></div>
              <div className="box box_2 p-[20px]">
                <p
                  className="text script_decing w-[full]  h-[320px] m-auto bg-[#d4d4d480] overflow-y-auto p-2 text-left text-[15px]"
                  
                >
                  {content}
                </p>
                <p className="name">{namedata}</p>
              </div>
            </div>
          </section>
          {/* =====================  */}
        </div>

        <div className="butoon_editing">
          <button onClick={decrease}>Prev</button>
          <button onClick={increase}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default SingleCardCompo;
