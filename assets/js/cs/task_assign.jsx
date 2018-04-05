import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Alert } from 'reactstrap';

import api from '../api';

export default function TaskAssign(props) {
  console.log("In Users:");
  console.log(props.users);
  var usersList = props.users.map(function(user){
 			return <tr>
      				<td>{user.id}</td>
      				<td>{user.name}</td>
                                <td><Link to={"/tasks_unassigned"} className="btn btn-primary"onClick={()=>assignTask(user.id)}>assign</Link></td>
			       </tr>;
                      })
  return (
    <div>
      <Alert color="primary">
        Assign task to user!
      </Alert>
	<Table>
	  <thead>
	    <tr>
	      <th>Id</th>
	      <th>Name</th>
	      <th>Assign</th>
	    </tr>
	  </thead>
	  <tbody>
	   {usersList}
	  </tbody>
	</Table>
    </div>
  );
}

function assignTask(user_id){
  console.log("assign task");
  var current_user_id = document.getElementById("userid").innerText;
  var assign_user_id = user_id;
  var task_id = document.getElementById("current_task_id").innerHTML;
  api.assign_task(task_id, current_user_id, assign_user_id);
  //alert("assign task" + task_id);
}
