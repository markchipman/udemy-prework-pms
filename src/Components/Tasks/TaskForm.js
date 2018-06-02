import React from 'react';
import PropTypes from 'prop-types';

class TaskForm extends React.Component {
    static propTypes = {
    }
    addTask = (event) => {
       let {project} = this.props;
       event.preventDefault();
       let newTask = {
         title: this.title.value,
         phase: this.phase.value
       };
       this.props.onTaskAdd(project,newTask);
    }
    render() {
      return (
        <form className="project-form" onSubmit={this.addTask}>
          <div>
            <label>Title: </label>
            <input type="text" ref={(title)=>{this.title= title}} />
          </div>
          <div>
            <label>Phase: </label>
            <select ref={(phase) => {this.phase = phase}} >
               <option value="todo">todo</option>
               <option value="inprogress">in-progress</option>
               <option value="completed">completed</option>
            </select>
          </div>
          <div>
            <button type="submit">submit</button>
          </div>
        </form>
      );
    }
  }

  export default TaskForm;