import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route , Link } from 'react-router-dom';
import { Button} from 'reactstrap';

import Users from './users';
import Tasks from './tasks';
import TaskForm from './task_new';
import TaskAssign from './task_assign';
import TaskEdit from './task_edit';
import TasksUnassigned from './tasks_unassigned';
import TasksUncompleted from './tasks_uncompleted';
import TasksCompleted from './tasks_completed';
import api from '../api'; // import api.js

export default function tasktracker_init(store) {
  console.log("tasktracker_init");
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracker />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktracker = connect((state) => state)((props) => {
  //console.log(props);
  //console.log(props.users);
  //console.log(props.tasks);

  return (
    <Router>
      <div>

      <div class="row" id="login">
        <div class="col-3 offset-9">
	  <p> Logged in as: <span id="username">irving</span> <span id="userid">4</span>|
	      <button class="btn btn-link">Log out</button>
          </p>
          <p>
             <p>current task id: <span id="current_task_id"></span> </p>
             <p>current task title: <span id="current_task_title"></span> </p>
             <p>current task descrip: <span id="current_task_descrip"></span> </p>
          </p>
        </div>
      </div>

	 <div id="buttons">
          <Link to={"/tasks_unassigned"} class="btn btn-primary" onClick={()=>getUnassinedTasks()}>unassined tasks</Link>
          <Link to={"/tasks_uncompleted"} class="btn btn-warning" onClick={()=>getUncompletedTasks()}>uncompleted tasks</Link>
          <Link to={"/tasks_completed"} class="btn btn-success" onClick={()=>getCompletedTasks()}>completed tasks</Link>
          <Link to={"/users"} activeClassName="active" class="btn btn-primary">users</Link>
          <Link to={"/new_task"} activeClassName="active">create new task</Link>
     	 </div>

        <Route path="/users" exact={true} render={() =>
          <div>
	    <Users users={props.users} />
          </div>
        } />
        <Route path="/tasks" exact={true} render={() =>
          <div>
            <Tasks tasks={props.tasks} />
          </div>
        } />
        <Route path="/tasks_unassigned" exact={true} render={() =>
          <div>
            <TasksUnassigned tasks={props.tasks} />
          </div>
        } />
        <Route path="/tasks_uncompleted" exact={true} render={() =>
          <div>
            <TasksUncompleted tasks={props.tasks} />
          </div>
        } />
        <Route path="/tasks_completed" exact={true} render={() =>
          <div>
            <TasksCompleted tasks={props.tasks} />
          </div>
        } />
        <Route path="/new_task" exact={true} render={() =>
          <div>
            <TaskForm form={props.form}/>
          </div>
        } />

        <Route path="/task_assign" exact={true} render={() =>
          <div>
            <TaskAssign users={props.users}/>
          </div>
        } />

        <Route path="/task_edit" exact={true} render={() =>
          <div>
            <TaskEdit />
          </div>
        } />


      </div>
    </Router>
  );
});

function getUnassinedTasks(){
  console.log("get unassigned tasks");
  api.request_unassigned_tasks(4);
}

function getUncompletedTasks(){
  console.log("get uncompleted tasks");
  api.request_assigned_uncompleted_tasks(4);
}

function getCompletedTasks(){
  console.log("get completed tasks");
  api.request_assigned_completed_tasks(4);
}
