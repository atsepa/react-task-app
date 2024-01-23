import Button from "./Button";

export default function SideBar({projectsList, handleOpenProject, handleOpenNewProject}) {

    function renderProjectList(){
        return projectsList.map((ele) => 
        <li className="flex justify-between my-4" key={ele.id} onClick={() => handleProjectClick(ele)}>
            <button className="w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800">
                {ele.title}
            </button>
        </li>)
    }

    function handleProjectClick(project){
        handleOpenProject(project)
    }

    return(
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">Your Projects</h2>
            <div>
                <Button text="+ Add Project" handleOnClick={handleOpenNewProject} />
            </div>
            <ul className="p-4 mt-8 rounded-md">
                {renderProjectList()}
            </ul>
        </aside>
    );
}