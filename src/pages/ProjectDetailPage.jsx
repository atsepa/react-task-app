import { useEffect, useRef, useState } from "react"
import Input from "../components/Input";

export default function ProjectDetailPage({project:{id, title, description, dueDate, items}, handleDeleteProject, handleUpdateTask}){

    const formattedDate = new Date(dueDate).toLocaleDateString('en-US',{ year:'numeric', month:'short', day:'numeric'});
    const taskRef = useRef();
    const [itemsList, setItemsList] = useState(items)


    function renderItemList(){

        return itemsList.map(
            (ele) => 
            <div key={ele.id} className="flex items-center justify-between">
                <p >{ele.task}</p>
                <button onClick={() => handleDeleteItem(ele.id)}>Delete</button>
            </div>
            )
    }

    function handleAddItemToList(){
        const task = taskRef.current.value;
        taskRef.current.value = '';
        setItemsList((prevItems) => [{ id: Math.random(), task}, ...prevItems]);
        handleUpdateTask(itemsList)
    }

    function handleDeleteItem(id){
        setItemsList((prevItemList) => {
            return [...prevItemList.filter((ele) => ele.id !== id)]
        })
        handleUpdateTask(itemsList)
    }

    useEffect(() => {
        handleUpdateTask(itemsList)
    }, [itemsList])

    return (
        <div className="w-[35rem] mt-16">
            <header className="pb-4 mb-4 border-b-2 border-stone-300">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-stone-600 mb-2">{title}</h1>
                    <button className="text-stone-600 hover:text-stone-950" onClick={() => handleDeleteProject(id)}>Delete</button>
                </div>
                <p className="mb-4 text-stone-400">{formattedDate}</p>
                <p className="text-stone-600 whitespace-pre-wrap">{description}</p>
            </header>
            
            <div className="flex items-center justify-between">
                <Input ref={taskRef} label="Task" />
                <button onClick={handleAddItemToList}>Add Task</button>
            </div>
            {renderItemList()}
        </div>
    )
}