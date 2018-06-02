import React, { Component } from 'react';
import Header from './Components/Header';
import SubHeader from './Components/SubHeader';
import ProjectForm from './Components/Projects/ProjectForm';
import ProjectList from './Components/Projects/ProjectList';
import TaskList from './Components/Tasks/TaskList';
import TaskForm from './Components/Tasks/TaskForm';

import TaskService from './Services/TaskService';

import './App.css';

export default class App extends Component {
    constructor() {
      super();
      this.taskService = new TaskService(this);
    }

    state = {
      projects: [
        {id: 1, title: "Angular eBook",phase:"todo", completed:false, edit: false},
        {id: 2, title: "React eBook",phase:"completed", completed:true, edit: false},
        {id: 3, title: "NodeJS eBook",phase:"todo", completed:false,edit: false},
        {id: 4, title: "Modern JavaScript eBook",phase:"inprogress", completed:false,edit: false},
        {id: 5, title: "Node Microservice",phase:"inprogress", completed:false,edit: false},
      ],

      newProject: false,
      newTask: false,
      
      tasks: [
        {id: 1, projectId: 1, title: "Plan Content", phase:"inprogress",completed:false,edit:false},
        {id: 2, projectId: 1, title: "Create TOC", phase:"todo",completed:false,edit:false},
        {id: 3, projectId: 1, title: "Create Cover Image", phase:"todo",completed:false,edit:false},
        {id: 4, projectId: 1, title: "Write the first draft", phase:"todo",completed:false,edit:false},
        
        {id: 5, projectId: 2, title: "Plan React Content", phase:"inprogress",completed:false,edit:false},
        {id: 6, projectId: 2, title: "Create React TOC", phase:"todo",completed:false,edit:false},
        {id: 7, projectId: 2, title: "Create React Cover Image", phase:"todo",completed:false,edit:false},
        {id: 8, projectId: 2, title: "Write the first draft of ReactJS", phase:"todo",completed:false,edit:false},
       
        {id: 9, projectId: 3, title: "NodejS 1", phase:"todo",completed:false,edit:false},
        {id: 10, projectId: 4, title: "ModernJS  1", phase:"todo",completed:false,edit:false},
       
      ],
      phase: ["todo","inprogress","completed"],
      currentProject: null,
    }
  
    onProjectAdd = (project) => {
      let maxId = +new Date();
      project.id = maxId;
      project.edit = false;
      project.completed = false;
      
      let projects = [project, ...this.state.projects];
      
      this.setState({
        projects
      });
   
    }
    
    onToggleEditProject = (projectId) => {
      let projects = this.state.projects.map((p) => {
        if (p.id === projectId) {
          p.edit = !p.edit;
        }
        return p;
      });
      this.setState({
        projects
      });
    }
    
    onUpdateProject = (id, project) => {
      let projects = this.state.projects.map((p) => {
        if (p.id === id) {
          p.edit = !p.edit;
          p.title = project.title;
          p.phase = project.phase;
        }
        return p;
      });
      
      this.setState({
        projects
      })
    }
    
    onDeleteProject = (id, title) => {
      if (window.confirm(`Are you sure you want to delete ${title}?`)) {
        let projects = this.state.projects.filter((p) => {
          return p.id !== id;
        });
        
        this.setState({
          projects
        });
      }
    }
    
    onProjectMarkCompleted = (projectId) => {
      let projects = this.state.projects.map((p) => {
        if (p.id === projectId) {
          p.completed = !p.completed;
        }
        return p;
      });
      this.setState({
        projects
      });
    }
    
    findProject = (projectId) => {
     let project = this.state.projects.find((p) => {
        return p.id === projectId;
     })
     return project;
    }
   
    
    onProjectSelected = (projectId) =>{
      let project = this.findProject(projectId);
      this.setState({
        currentProject: project,
        newProject: false,
      });
    }

    showProjects = () => {
      this.setState({
        currentProject: null
      })
    }

    onNewProject = () => {
      this.setState((prevState) => ({
        newProject: !prevState.newProject
      }));
    }

    onNewTask = () => {
      this.setState((prevState) => ({
        newTask: !prevState.newTask
      }));
    }

    onTaskAdd = (project,task) => {
      this.taskService.onAdd(project,task);
    }

    onDeleteTask = (id, title) => {
      if (window.confirm(`Are you sure you want to delete ${title}?`)) {
        this.taskService.onDelete(id);
      }
    }

    onToggleEditTask = (taskId) => {
      this.taskService.onToggleEdit(taskId);
    }

    onUpdateTask = (id, task) => {
      this.taskService.onUpdate(id, task);
    }

    onTaskMarkCompleted = (taskId) => {
      this.taskService.onMarkCompleted(taskId);
    }
    
    render() {
      console.log(this.state.currentProject);
      return (
        <div className="app-container">
           <Header title="Project Management App">
              <SubHeader color="red"
                title="{
                  Kanban based system}" />

               {this.state.currentProject && <a href="#" onClick={this.onProjectSelected}>back</a>}
           </Header>
           <hr/>
           
           <div className="project-container">
              {!this.state.currentProject &&
                  <ProjectList 
                    projects={this.state.projects} 
                    phase={this.state.phase}
                    onEdit={this.onToggleEditProject}
                    onUpdate={this.onUpdateProject}
                    onCancel={this.onToggleEditProject}
                    onDelete={this.onDeleteProject}
                    onMarkCompleted={this.onProjectMarkCompleted}
                    onProjectSelected={this.onProjectSelected}
                    onNewProject={this.onNewProject}
                  />
              }
              {this.state.newProject &&<ProjectForm onProjectAdd={this.onProjectAdd} />
              }
              
           </div>
           <div className="task-container">
              {this.state.currentProject && <TaskList
                    project = {this.state.currentProject}
                    tasks = {this.state.tasks.filter((t) => t.projectId === this.state.currentProject.id)}
                    phase={this.state.phase}
                    onEdit={this.onToggleEditTask}
                    onUpdate={this.onUpdateTask}
                    onCancel={this.onToggleEditTask}
                    onDelete={this.onDeleteTask}
                    onMarkCompleted={this.onTaskMarkCompleted}
                    onNewTask={this.onNewTask}
                /> 
              }
               {this.state.newTask &&<TaskForm project={this.state.currentProject} onTaskAdd={this.onTaskAdd} />
              }
            </div>
        </div>
      );
    }
}
