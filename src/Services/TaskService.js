class TaskService {
    constructor(app) {
        this.app = app;
    }

    onAdd = (project,task) => {
        let maxId = +new Date();
        alert(maxId);
        task.id = maxId;
        task.edit = false;
        task.completed = false;
        task.projectId = project.id;
        
        let tasks = [task, ...this.app.state.tasks];
        this.app.setState({
            tasks
        });
    }
      
    onToggleEdit = (taskId) => {
        let tasks = this.app.state.tasks.map((t) => {
            if (t.id === taskId) {
            t.edit = !t.edit;
            }
            return t;
        });
        this.app.setState({
            tasks
        });
    }
      
    onUpdate = (id, task) => {
        let tasks = this.app.state.tasks.map((t) => {
            if (t.id === id) {
            t.edit = !t.edit;
            t.title = task.title;
            t.phase = task.phase;
            }
            return t;
        });
        
        this.app.setState({
            tasks
        })
    }
      
    onDelete = (id, title) => {
        let tasks = this.app.state.tasks.filter((t) => {
            return t.id !== id;
        });
        
        this.app.setState({
            tasks
        });
    }
      
    onMarkCompleted = (taskId) => {
        let tasks = this.app.state.tasks.map((t) => {
            if (t.id === taskId) {
              t.completed = !t.completed;
            }
            return t;
        });
        this.app.setState({
            tasks
        });
    }
      
    onNew = () => {
        this.app.setState((prevState) => ({
            newTask: !prevState.newTask
        }));
    }
}

export default TaskService;