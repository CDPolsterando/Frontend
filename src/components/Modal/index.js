import React from 'react'
import './index.css'

const Modal = ({ open, modal: ModalBody, children }) =>
  <div className="modal">
    {open ? <div className="modal__bg" /> : null}
    <div className={'modal__original_content' + (open ? ' blur' : '')}>
      {children}
    </div>
    {open
      ? <div className="modal__body">
          <ModalBody />
        </div>
      : null}
  </div>
export default Modal
