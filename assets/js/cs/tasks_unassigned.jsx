import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Alert } from 'reactstrap';

export default function TasksUnassigned(props) {
  console.log("In Tasks:");
  console.log(props.tasks);
  var tasksList = props.tasks.map(function(task){
 			return <tr>
      				<td>{task.id}</td>
      				<td>{task.title}</td>
				<td>{task.descrip}</td>
				<td>{task.time}</td>
				<td>{task.isCompleted.toString()}</td>
				<td>{task.user_id_create}</td>
				<td>{task.user_id_assign}</td>
                                <td><Link to={"/task_edit"} class="btn btn-primary" onClick={()=>setCurrentTask(task.id, task.title, task.descrip)}>edit</Link></td>
                                <td><Link to={"/task_assign"} class="btn btn-success" onClick={()=>setCurrentTask(task.id, task.title, task.descrip)}>assign</Link></td>
			       </tr>;
                      })
  return (
    <div>
      <Alert color="primary">
        Tasks created by this user and have not been assigned!
      </Alert>
	<Table>
	  <thead>
	    <tr>
	      <th>Id</th>
	      <th>Title</th>
	      <th>Descrip</th>
	      <th>Time</th>
	      <th>IsCompleted</th>
	      <th>Created</th>
	      <th>Assigned</th>
	      <th>Edit</th>
	      <th>Assign</th>
	    </tr>
	  </thead>
	  <tbody>
	   {tasksList}
	  </tbody>
	</Table>
    </div>
  );
}

function setCurrentTask(task_id, title, descrip){
  document.getElementById("current_task_id").innerHTML = task_id;
  document.getElementById("current_task_title").innerHTML = title;
  document.getElementById("current_task_descrip").innerHTML = descrip;
}
