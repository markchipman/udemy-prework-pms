import React from 'react';
import './projects.css';

class ProjectList extends React.Component {
  state = {
    title: "",
    phase: ""
  }
  
  onEdit = (project) => {
    this.setState({
      title: project.title,
      phase: project.phase
    });
    
    this.props.onEdit(project.id);
  }
  
  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }
  
  onPhaseChange = (e) => {
    this.setState({
      phase: e.target.value
    });
  }
  
  onUpdate = (id) => {
    console.log(this.state);
    this.props.onUpdate(id, this.state);
  }
  
  onDelete = (id, title) => {
    this.props.onDelete(id, title);
  }
  
  onCancel = (id) => {
    this.props.onCancel(id);
  }
  
  onEdit = (project) => {
    this.setState({
      title: project.title,
      phase: project.phase
    });
    
    this.props.onEdit(project.id);
  }
  
  editorUI(project) {
    return (
      <div className="project-item" key={project.id}>
         <div className="project-header">
            <span>{project.title}</span>
         </div>
         <div className="project-content">
          <input type="text"
               defaultValue={project.title}
               onChange={this.onTitleChange}
          />
         
          <select defaultValue={project.phase} 
             onChange={this.onPhaseChange}>
            <option value="todo">todo</option>
            <option value="inprogress">in-progress</option>
            <option value="completed">completed</option>
          </select>
          
        </div>
        <div className="project-buttons">
          <div>
           <button className="button edit"
              onClick={()=>this.onUpdate(project.id)}
           >save</button>
           <button className="button cancel"
              onClick={()=>this.onCancel(project.id)}
           >cancel</button>
         </div>
      
        </div>
      </div>
    );
  }
  
  
  gotoDashboard = (e, projectId) => {
    e.preventDefault();
    this.props.onProjectSelected(projectId);
  }
 
  itemUI(project) {
    let checked = project.completed;
    return (
      <div className="project-item" key={project.id}>
         <div className="project-header">
            <span>{project.title}</span>
            <div className="project-buttons">
              <button className="button edit" title="edit"
                onClick={()=>this.onEdit(project)}>
                <span role="img" aria-label="edit project">📖</span>
              </button>
              <button className="button delete" title="delete"
                onClick={()=>this.onDelete(project.id, project.title)}>
                <span role="img" aria-label="delete project">❌</span>
              </button>
              <button className="button dashboard" title="back to projects"
                onClick={(e)=>this.gotoDashboard(e,project.id)}>
                <span role="img" aria-label="goto dashboard">▶</span>
              </button>
             </div>
         </div>
         <div className="project-content">
           <span className="title">{project.title}</span>
           <span className="title">Phase: {project.phase}</span>
         </div>
         <div>
            <label>
               <input type="checkbox" checked={checked}
                  onChange={()=>this.props.onMarkCompleted(project.id)} />
                  mark as complete
            </label>
          </div>
      </div>
    );
  }
  
  projectItemUI  = (project) => {
      let projectItem = project.edit ?
             this.editorUI(project)
           :
             this.itemUI(project); 
    
      return projectItem;
  }
 
  render() {
    let {projects} = this.props;
    
    let projectUI = projects.map((project) => {
      let projectItem = this.projectItemUI(project);
      return projectItem;
    });
    
    return (
      <main>
        <div className="project-dashboard-title">
            <h3>PROJECTS</h3>
            <button onClick={this.props.onNewProject} title="New Project" 
                className="project-add">NEW PROJECT</button>
        </div>
        <div className="projects">
          {projectUI} 
        </div>
      </main>
    );
  }
}

export default ProjectList;