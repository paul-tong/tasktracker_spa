import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, Route , Link } from 'react-router-dom';
import api from '../api';

export default function TaskEdit(props) {
  console.log("task edit");
  var current_task_title = document.getElementById("current_task_title").innerHTML;
  var current_task_descrip = document.getElementById("current_task_descrip").innerHTML;
  return (
    <div style={{padding: "4ex"}}>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" id="edit_task_title" defaultValue={current_task_title}/>
    </FormGroup>

    <FormGroup>
      <Label for="desciption">Description</Label>
      <Input type="textarea" id="edit_task_descrip" defaultValue={current_task_descrip}/>
    </FormGroup>
    <Link to={"/tasks_unassigned"} class="btn btn-primary" onClick={()=>editTask()}>edit</Link>
    </div> );
}

function editTask(){
  console.log("create new task");
  var user_id = document.getElementById("userid").innerHTML;
  var task_id = document.getElementById("current_task_id").innerHTML;
  var title = document.getElementById("edit_task_title").value;
  var descrip = document.getElementById("edit_task_descrip").value;
  api.edit_task(user_id,task_id,title,descrip);
}

