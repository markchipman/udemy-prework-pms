import React, {Fragment, Component } from 'react';
import './tasks.css';

export default class TaskList extends Component {
    state = {
      title: "",
      phase: ""
    }
    
    onEdit = (task) => {
      this.setState({
        title: task.title,
        phase: task.phase
      });
      
      this.props.onEdit(task.id);
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
    
    onEdit = (task) => {
      this.setState({
        title: task.title,
        phase: task.phase
      });
      
      this.props.onEdit(task.id);
    }
    
    editorUI(task) {
      return (
        <div className="task-item" key={task.id}>
           <div className="project-header">
              <span>{task.title}</span>
           </div>
           <div className="task-content">
            <input type="text"
                 defaultValue={task.title}
                 onChange={this.onTitleChange}
            />
           
            <select defaultValue={task.phase} 
               onChange={this.onPhaseChange}>
              <option value="todo">todo</option>
              <option value="inprogress">in-progress</option>
              <option value="completed">completed</option>
            </select>
            
          </div>
          <div className="task-buttons">
            <div>
             <button className="button edit"
                onClick={()=>this.onUpdate(task.id)}
             >save</button>
             <button className="button cancel"
                onClick={()=>this.onCancel(task.id)}
             >cancel</button>
           </div>
        
          </div>
        </div>
      );
    }
   
    itemUI(task) {
      let checked = task.completed;
      return (
        <div className="task-item" key={task.id}>
           <div className="task-header">
              <span>{task.title}</span>
           </div>
           <div className="task-content">
             <span className="title">{task.title}</span>
             <span className="title">{task.phase}</span>
           </div>
           <div className="task-buttons">
             <div>
              <button className="button edit"
                onClick={()=>this.onEdit(task)}>
                edit
              </button>
             <button className="button delete"
                onClick={()=>this.onDelete(task.id, task.title)}>
                delete
              </button>
             </div>
             <label>
               <input type="checkbox" checked={checked}
                    onChange={()=>this.props.onMarkCompleted(task.id)} />
                    mark as complete
             </label>
           </div>
        </div>
      );
    }
    
    taskItemUI  = (task) => {
        let taskItem = task.edit ?
               this.editorUI(task)
             :
               this.itemUI(task); 
      
        return taskItem;
    }

    gotoProjects = (e) => {
      e.preventDefault();
      this.props.onNavigateToProject();
    }
   
    render() {
      let phase = {};
      let {tasks} = this.props;
      
      tasks.forEach((task) => {
        
        phase[task.phase]  = phase[task.phase] || [];
        
        let taskItem = this.taskItemUI(task);
        
        let completeClass = task.completed ? 
                          'project-completed' : '';
         
         phase[task.phase].push(taskItem);
      });
      
      
      let phaseUI = [];
      this.props.phase.forEach((key) => {
         phaseUI.push(
          <Fragment key={key}>
            <div className="task-phase" key={key}>
              <h2 className="task-phase-title">{key}</h2>
              {phase[key]}
            </div>
          </Fragment>
         );
      });

     
      return (
        <Fragment>
          <h2>Project: {this.props.project.title}</h2>
          <div className="task-lane">
            {phaseUI}   
          </div>
        </Fragment>
      );
    }
 }
 