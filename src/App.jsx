import { useRef, useState } from "react";
import SideBar from "./components/SideBar";
import NewProjectPage from "./pages/NewProjectPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import HomePage from "./pages/HomePage";


function App() {
  const [showHomePage, setShowHomePage] = useState(true);
  const [showNewProjectPage, setShowNewProjectPage] = useState(false);
  const [showDetailPage, setShowDetailPage] = useState(false)
  const [projectsList, setProjectsList] = useState([
    {
      id: 0,
      title: 'Cocoa-m',
      description: 'Description memo',
      dueDate:'01/01/2024',
      items: []
    }]);

  let project = useRef({})

  function handleAddNewProject(newProjectData){
    setProjectsList((prevList) => [newProjectData, ...prevList]);
    setShowHomePage(true)
    setShowNewProjectPage(false)
    setShowDetailPage(false) 
   }

  function handleCloseNewProjectPage(){
    setShowHomePage(true)
    setShowNewProjectPage(false)
    setShowDetailPage(false)
  }

  function handleOpenNewProjectPage(){
    setShowHomePage(false)
    setShowNewProjectPage(true)
    setShowDetailPage(false)
  }

  function handleOpenProject(projectData) {
    console.log('handleOpenProject', projectData)
    project.current = projectData
    setShowDetailPage(true)
    setShowHomePage(false)
    setShowNewProjectPage(false)
  }

  function handleDeleteProject(projectId){
    setProjectsList((prevProjectList) => [...prevProjectList.filter(ele => ele.id !== projectId)]);
    setShowDetailPage(false)
    setShowHomePage(true)
  }

  function handleUpdateTask(tasks){
    console.log('handleAddTask', tasks)
    project.current.items = tasks;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar 
        projectsList={projectsList} 
        handleAddProject={handleOpenProject} 
        handleOpenNewProject={handleOpenNewProjectPage}
        handleOpenProject={handleOpenProject}
      />
      {showHomePage && <HomePage handleOpenAddProject={handleOpenNewProjectPage} />}
      {showNewProjectPage && <NewProjectPage handleClosePage={handleCloseNewProjectPage} handleSaveNewProject={handleAddNewProject} />}
      {showDetailPage && <ProjectDetailPage project={project.current}  handleDeleteProject={handleDeleteProject} handleUpdateTask={handleUpdateTask}/> }
    </main>
  );
}

export default App;
