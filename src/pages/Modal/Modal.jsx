import React from 'react';
import "./Modal.css"
import { Form } from 'react-router-dom';
const Modal = ({setshowmodal,children}) => {
  return (
    <section className='modall'>
    <Form className='modal'>
    <div className='parentofmodal'>
    {children}
      </div>
      <i onClick={() => {
        setshowmodal(false)
      }
      } style={{color:"red"}} className="fa-solid fa-xmark"></i>

    </Form>
    </section>
  );
}

export default Modal;
