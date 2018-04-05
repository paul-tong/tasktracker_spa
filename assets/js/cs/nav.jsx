import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Form, FormGroup, NavItem, Input, Button } from 'reactstrap';
import { connect } from 'react-redux';
import api from '../api';
import store from '../store';

let LoginForm = connect(({login}) => {return {login};})((props) => {
  function update(ev) {
    let tgt = $(ev.target);
    let data = {};
    data[tgt.attr('name')] = tgt.val();
    props.dispatch({
      type: 'UPDATE_LOGIN_FORM',
      data: data,
    });
  }

  function create_token(ev) {
    document.getElementById("username").innerHTML = props.login.name;
    api.submit_login(props.login);
    console.log(props.login);
  }

  function register_user(ev) {
    api.submit_register(props.login);
    console.log("register");
    //alert("Register success! Now you can log in!");
  }

  return <div className="navbar-text">
    <Form inline>
      <FormGroup>
        <Input type="text" name="name" placeholder="name"
               value={props.login.name} onChange={update} />
      </FormGroup>
      <FormGroup>
        <Input type="password" name="pass" placeholder="password"
               value={props.login.pass} onChange={update} />
      </FormGroup>
      <Button onClick={create_token} className="btn btn-warning">Log In</Button>
      <Button onClick={register_user} className="btn btn-success">Register</Button>
    </Form>
  </div>;
});

let Session = connect(({token}) => {return {token};})((props) => {
  var username = document.getElementById("username").innerHTML;
  return <div className="navbar-text">
        <div className="col-4 offset-9">
	  <p> Logged in as: {username} |
          <Link to={"/"} onClick={()=>logOut()}>Log out</Link>
          </p>
        </div>
  </div>;
});

function Nav(props) {
  let session_info;

  if (props.token) {
    document.getElementById("userid").innerHTML = props.token.user_id;
    session_info = <Session token={props.token} />;
  }
  else {
    session_info = <LoginForm />
  }

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        Tasktracker
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/users" href="#" className="nav-link">All Users</NavLink>
        </NavItem>
      </ul>
      { session_info }
    </nav>
  );
}

function state2props(state) {
  return {
    token: state.token,
  };
}

function logOut() {
  document.getElementById("userid").innerHTML = 0;
  store.dispatch({
      type: 'SET_TOKEN',
      token: null,
  });  
  console.log("log out");
  //location.reload();
}

export default connect(state2props)(Nav);
