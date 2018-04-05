import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Alert } from 'reactstrap';

export default function TasksCompleted(props) {
  console.log("In Tasks:");
  console.log(props.tasks);
  var tasksList = props.tasks.map(function(task){
 			return <tr>
      				<td>{task.title}</td>
				<td>{task.descrip}</td>
				<td>{task.time}</td>
				<td>{task.isCompleted.toString()}</td>
			       </tr>;
                      })
  return (
    <div>
      <Alert color="primary">
        Tasks completed by this user!
      </Alert>
	<Table>
	  <thead>
	    <tr>
	      <th>Title</th>
	      <th>Descrip</th>
	      <th>Time</th>
	      <th>IsCompleted</th>
	    </tr>
	  </thead>
	  <tbody>
	   {tasksList}
	  </tbody>
	</Table>
    </div>
  );
}
