import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Input } from 'reactstrap';
import { Alert } from 'reactstrap';

import api from '../api';

export default function TasksUncompleted(props) {
  console.log("In Tasks:");
  console.log(props.tasks);
  var tasksList = props.tasks.map(function(task){
 			return <tr>
      				<td>{task.title}</td>
				<td>{task.descrip}</td>
				<td>{task.time}</td>
				<td>{task.isCompleted.toString()}</td>
				<td><Input type="input" defaultValue="0" id={task.id}/></td>
                                <td><Link to={"/tasks_uncompleted"} class="btn btn-primary" onClick={()=>addTime(task.id)}>add time</Link></td>
                                <td><Link to={"/tasks_uncompleted"} class="btn btn-success"onClick={()=>completeTask(task.id)}>complete</Link></td>
			       </tr>;
                      })
  return (
    <div>
      <Alert color="primary">
        Tasks assigned to this user and have not been completed!
      </Alert>
	<Table>
	  <thead>
	    <tr>
	      <th>Title</th>
	      <th>Descrip</th>
	      <th>Time</th>
	      <th>IsCompleted</th>
	      <th>Input Time</th>
	      <th>Add Time</th>
	      <th>Complete</th>
	    </tr>
	  </thead>
	  <tbody>
	   {tasksList}
	  </tbody>
	</Table>
    </div>
  );
}

function completeTask(task_id){
  console.log("complete task " + task_id);
  var user_id = document.getElementById("userid").innerText;
  //alert(user_id);
  api.complete_task(task_id, user_id);
}

function addTime(task_id){
  console.log("add time " + task_id);
  var user_id = document.getElementById("userid").innerText;
  var time = document.getElementById(task_id).value;
  var time_int = Number(time);
  if (time_int < 0 || time_int % 15 > 0) {
    alert("time should > 0 and in 15min increments");
  }
  else {
    api.add_time(task_id, user_id, time);
  }
  document.getElementById(task_id).value = "0";
}
