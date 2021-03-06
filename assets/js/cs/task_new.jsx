import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { BrowserRouter as Router, Route , Link } from 'react-router-dom';
import api from '../api';

export default function TaskForm(props) {
  console.log("task form");
  return (
    <div style={{padding: "4ex"}}>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" id="new_task_title"/>
    </FormGroup>

    <FormGroup>
      <Label for="desciption">Description</Label>
      <Input type="textarea" id="new_task_descrip"/>
    </FormGroup>
    <Link to={"/tasks_unassigned"} class="btn btn-primary" onClick={()=>createNewTask()}>create</Link>
    </div> );
}

function createNewTask(){
  console.log("create new task");
  var user_id = document.getElementById("userid").innerText;
  var title = document.getElementById("new_task_title").value;
  var descrip = document.getElementById("new_task_descrip").value;
  api.create_new_task(user_id,title,descrip);
  //alert(user_id + title + descrip);
}

