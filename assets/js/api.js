import store from './store';

class TheServer {
  request_all_tasks() {
    $.ajax("/api/v1/tasks", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_all_users() {
    $.ajax("/api/v1/users", {
      method: "get",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      success: (resp) => {
        store.dispatch({
          type: 'USERS_LIST',
          users: resp.data,
        });
      },
    });
  }


  request_unassigned_tasks(data) {
    $.ajax("/api/v1/unassigned_tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: data}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_assigned_uncompleted_tasks(data) {
    $.ajax("/api/v1/assigned_uncompleted_tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: data}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  request_assigned_completed_tasks(data) {
    $.ajax("/api/v1/assigned_completed_tasks", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({id: data}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  complete_task(task_id, user_id) {
    $.ajax("/api/v1/complete_task", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task_id: task_id, user_id: user_id}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  add_time(task_id, user_id, time) {
    $.ajax("/api/v1/add_time", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task_id: task_id, user_id: user_id, time: time}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  assign_task(task_id, current_user_id, assign_user_id) {
    $.ajax("/api/v1/assign_task", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({task_id: task_id, current_user_id: current_user_id, assign_user_id: assign_user_id}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  create_new_task(user_id,title,descrip){
    $.ajax("/api/v1/create_new_task", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id, title: title, descrip: descrip}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  edit_task(user_id,task_id,title,descrip){
    $.ajax("/api/v1/edit_task", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify({user_id: user_id, task_id: task_id, title: title, descrip: descrip}),
      success: (resp) => {
        store.dispatch({
          type: 'TASKS_LIST',
          tasks: resp.data,
        });
      },
    });
  }

  submit_login(data) {
    $.ajax("/api/v1/token", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        store.dispatch({
          type: 'SET_TOKEN',
          token: resp,
        });
      },
    });
  }

  submit_register(data) {
    $.ajax("/api/v1/register", {
      method: "post",
      dataType: "json",
      contentType: "application/json; charset=UTF-8",
      data: JSON.stringify(data),
      success: (resp) => {
        alert("Register success! Now you can log in!");
        location.reload();
      },
    });
  }

}

export default new TheServer();
