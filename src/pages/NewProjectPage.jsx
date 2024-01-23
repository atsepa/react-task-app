import { useRef } from "react";
import Input from "../components/Input";
import Modal from "../components/Modal";

export default function NewProjectPage({handleClosePage, handleSaveNewProject}){

    const modalRef = useRef();
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();

    function handleClearForm(){
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        dueDateRef.current.value = '';

        handleClosePage();
    }

    function handleSaveForm(){
        const title = titleRef.current.value
        const description = descriptionRef.current.value
        const dueDate = dueDateRef.current.value
       
        if(title && description && dueDate){
            const response = {
                id: Math.random(),
                title,
                description,
                dueDate,
                items: []
            }
            handleSaveNewProject(response);
        } else {
            modalRef.current.open();
        }
    }


    return(
        <>
        <Modal ref={modalRef}>
            <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
            <p className="text-stone-400 mb-4">Missed to add a value</p>

        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button onClick={handleClearForm} className="text-stone-800 hover:text-stone-950">Cancel</button>
                </li>
                <li>
                    <button onClick={handleSaveForm} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button>

                </li>
            </menu>
            <div>
                <Input ref={titleRef} label="Title" type="text" />
                <Input ref={descriptionRef} label="Description" showTextArea />
                <Input ref={dueDateRef} label="Due date" type="date" />
            </div>
        </div>
        </>
        
        
    )
}