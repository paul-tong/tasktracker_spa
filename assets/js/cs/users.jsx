import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import { Alert } from 'reactstrap';

export default function Users(props) {
  console.log("In Users:");
  console.log(props.users);
  var usersList = props.users.map(function(user){
 			return <tr>
      				<td>{user.id}</td>
      				<td>{user.name}</td>
				<td>{user.pass}</td>
			       </tr>;
                      })
  return (
    <div>
      <Alert color="primary">
        All the Users in DB!
      </Alert>
	<Table>
	  <thead>
	    <tr>
	      <th>Id</th>
	      <th>Name</th>
	      <th>Pass</th>
	    </tr>
	  </thead>
	  <tbody>
	   {usersList}
	  </tbody>
	</Table>
    </div>
  );
}
