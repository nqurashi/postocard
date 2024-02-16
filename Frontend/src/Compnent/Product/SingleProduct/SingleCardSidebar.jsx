import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "./Styles/SingleCardSidebar.css";
import { useSelector } from "react-redux";

const SingleCardSidebar = ({setContenttext,setName , name}) => {
  const editor = useRef();
  const [content, setContent] = useState("");
  const config = {
    toolbarButtonSize: "middle",

    buttons:
      "bold,italic,fontsize,|,insertformatblock,|,alignleft,aligncenter,alignright",
  };


  return (
    <div className="SingleCardSidebar">
      <h2>Edit Your Card</h2>
      <div className="SingleCardSidebar_inputs">
       
        <div className="SC_input">
          <label>Card Message</label>
          {/* <JoditEditor
            ref={editor}
            value={content}
            onBlur={(newContent) => setContent(newContent)}
            onChange={(newContent) => setContenttext(newContent)}
          /> */}
          <textarea placeholder="Enter Your Message"  onChange={(e)=>setContenttext(e.target.value) } cols={7} rows={7}/>
          {/* <div className="SC_input">
          <label>Your Name</label>
          <input type="text" placeholder="Your Name"  value={name} onChange={(e)=> setName(e.target.value)}/>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default SingleCardSidebar;
