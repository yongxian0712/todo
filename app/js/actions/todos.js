import 'whatwg-fetch';

import { API_URL } from './index';

import {
  ERROR,
  CREATE_TODO,
  GET_TODOS,
  GET_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  UPDATE_STATUS_TRUE,
  UPDATE_STATUS_FALSE,
  SET_DUEDATE
} from './constants';

export function createTodo(todo) {
  return (dispatch) => fetch(`${API_URL}/todos/`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(todo)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: CREATE_TODO,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getTodos() {
  return (dispatch) => fetch(`${API_URL}/todos/`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_TODOS,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function getTodo(todo) {
  return (dispatch) => fetch(`${API_URL}/todos/${todo.id}`, {
    method: 'GET'
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: GET_TODO,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateTodo(todo) {
  return (dispatch) => fetch(`${API_URL}/todos/${todo.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_TODO,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateTodoStatustoTrue(todo) {
  return (dispatch) => fetch(`${API_URL}/todos-status-true/${todo.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_STATUS_TRUE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function updateTodoStatustoFalse(todo) {
  return (dispatch) => fetch(`${API_URL}/todos-status-false/${todo.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: UPDATE_STATUS_FALSE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function deleteTodo(id) {
  return (dispatch) => fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: DELETE_TODO,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}

export function setDueDate(todo) {
  return (dispatch) => fetch(`${API_URL}/todos-dueDate/${todo.id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(todo)
  })
  .then(response => response.json())
  .then(json => dispatch({
    type: SET_DUEDATE,
    payload: json
  }))
  .catch(exception => dispatch({
    type: ERROR,
    payload: exception.message
  }));
}
