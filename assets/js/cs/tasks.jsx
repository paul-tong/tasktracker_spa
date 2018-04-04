import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Alert } from 'reactstrap';

export default function Tasks(props) {
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
			       </tr>;
                      })
  return (
    <div>
      <Alert color="primary">
        All the Tasks in DB!
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
	    </tr>
	  </thead>
	  <tbody>
	   {tasksList}
	  </tbody>
	</Table>
    </div>
  );
}
