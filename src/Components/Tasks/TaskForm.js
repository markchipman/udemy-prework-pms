import React from 'react';
import PropTypes from 'prop-types';

class TaskForm extends React.Component {
    state = {
      id: "",
      title: "",
      phase: "todo"
    }

    static propTypes = {
    }

    onChange = (e) => {
      console.log(e.target.name, e.target.value);
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    addTask = (event) => {
       let {project} = this.props;
       event.preventDefault();
       let newTask = {
         id: this.state.id,
         title: this.state.title,
         phase: this.state.phase
       };
       this.props.onTaskAdd(project,newTask);
    }
    
    static getDerivedStateFromProps(props, state) {
      console.log('gdf:');
      let task = props.task;
      if (!task) return null;
      if (task && task.id === state.id) return null;
      return {
        id: task.id ? task.id : "",
        title: task.title ? task.title : "",
        phase: task.phase ? task.phase: "",
      }
    }
    render() {
      let task = this.props.task;
      return (
        <form className="project-form" onSubmit={this.addTask}>
          <input type="hidden" name="id"
              value={this.state.id}
              onChange={this.onChange} />
          <div>
            <label>Title: </label>
            <input type="text" name="title" 
              value={this.state.title}
              onChange={(e)=>{this.onChange(e)}}/>
          </div>
          <div>
            <label>Phase: </label>
            <select value={this.state.phase} onChange={this.onChange} name="phase" >
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