import React from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import "../Style/CardAnimation.css"

const CardAnimation = ({check},ref) => {
  const container = useRef();
  const tl = useRef();

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed());
  };

  useLayoutEffect(() => {
    const ctx = gsap.context((self) => {
      const boxes = self.selector(".box");

      tl.current = gsap.timeline();

      if(check === 0){
        tl.current   //index zero
        .fromTo(
          boxes[0],
          { backgroundColor: "green" },
          {
            backgroundColor: "yellow",
            duration: 1,
            rotationY: -180,
            transformOrigin: "left",
          }
        )
        .to(
          boxes[0],
          // { backgroundColor: 'green' },
          { duration: 0.5, x: 248 }
        )
        .fromTo(
          boxes[1],
          { x: 0 },
          { x: 248, duration: 0.5, rotateY: 70, transformOrigin: "left" },
          1
        )
        //.to(boxes[2], { y: -166 })
        .reverse();
      }

        // ------------------- 

    }, container); // <- Scope!
    return () => ctx.revert(); // <- Cleanup!
  }, []);

  return (
    <main className="flex justify-center place-items-center">
      <section className="boxes-container" ref={container}>
        <div>
          <button onClick={toggleTimeline} >Toggle Timeline</button>
        </div>
        <div className="box_main">
          <div className="box box_1">Box 1</div>
          <div className="box box_2">Box 2</div>
          {/* <div className="box box_3">Box 3</div> */}
        </div>
      </section>
    </main>
  );
};

export default CardAnimation;
