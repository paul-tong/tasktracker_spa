import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button } from 'reactstrap';

import Users from './users';
import Tasks from './tasks';
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
        </div>
      </div>

	 <div id="buttons">
          <Button color="primary" onClick={()=>getUnassinedTasks()}>unassined tasks</Button>
          <Button color="warning" onClick={()=>getUncompletedTasks()}>uncompleted tasks</Button>{' '}
          <Button color="success" onClick={()=>getCompletedTasks()}>completed tasks</Button>{' '}
          <Button color="link">create new task</Button>
     	 </div>

        <Route path="/" exact={true} render={() =>
          <div>
	    <Users users={props.users} />
          </div>
        } />
        <Route path="/tasks" exact={true} render={() =>
          <div>
            <Tasks tasks={props.tasks} />
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
