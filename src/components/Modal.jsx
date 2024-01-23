import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref){

    const modalRef = useRef();

    useImperativeHandle(ref, () => {

        return {
            open(){
                modalRef.current.showModal();
            }
        }
    })


    return createPortal(
        <dialog className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" ref={modalRef}>
            {children}
            <form method="dialog" className="mt-4 text-right">
                <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"> Close </button>
            </form>
        </dialog>,
        document.getElementById('modal-root')
    )
});

export default Modal;