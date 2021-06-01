import '../../style/dialog.css';
import Modal from "react-modal";
import '../../style/homePage.css'
import React from 'react'

const CustomModal : React.FC<{ isOpen:boolean, onClose:() => void }> = props  => {

    const { isOpen, onClose } = props
    const modalRoot = document.getElementById('root-dialog')
    if(modalRoot)
    Modal.setAppElement(modalRoot)
    return (
        <Modal isOpen={isOpen}
            className="mymodal"
            overlayClassName="myoverlay"
            onRequestClose={onClose}>
            <p className="closebtn" onClick={onClose} >X</p>
            {props.children}
        </Modal>
    )
}

export default CustomModal



    


