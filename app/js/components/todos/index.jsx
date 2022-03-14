import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatustoTrue,
  updateTodoStatustoFalse,
  setDueDate
} from '../../actions/todos';

const noDataAvailableStyles = {
  marginTop: '20px',
  textAlign: 'center'
};

const deleteTodoStyles = {
  marginLeft: '6px'
};

const dueDateStyles = {
  marginLeft: '44px'
};

const checkboxStyles = {
  margin: '10px'
};

class TodosIndex extends Component {

  handleRefresh = () => {
    // by calling this method react re-renders the component
    this.setState({});
  };

  componentWillMount() {
    this.props.getTodos();
  }

  createTodo(event) {
    event.preventDefault();

    const body = this.refs.body.value;

    const todo = {
      body
    }

    this.props.createTodo(todo).then(this.refs.body.value = '');
    
  }

  deleteTodo(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('data-todo-id');

    if (confirm('Do you really want to delete this todo?')) {
      this.props.deleteTodo(id);
    }
  }

  updateTodo(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('data-todo-id');
    const body = event.currentTarget.innerText;
  
    const todo = {
      id,
      body,
    }

    this.props.updateTodo(todo);
  }

  updateTodoStatustoTrue(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('data-todo-id');
    const body = event.currentTarget.getAttribute('data-todo-body');
    const dueDate = event.currentTarget.getAttribute('data-todo-dueDate');
    const isDone = "true";
  
    const todo = {
      id,
      body,
      dueDate,
      isDone
    }

    this.props.updateTodoStatustoTrue(todo);
  }

  updateTodoStatustoFalse(event) {
    event.preventDefault();

    const id = event.currentTarget.getAttribute('data-todo-id');
    const body = event.currentTarget.getAttribute('data-todo-body');
    const dueDate = event.currentTarget.getAttribute('data-todo-dueDate');
    const isDone = "false";
  
    const todo = {
      id,
      body,
      dueDate,
      isDone
    }

    this.props.updateTodoStatustoFalse(todo);
  }

  filterCompleted(event){
    if(event.target.checked){
       this.updateTodoStatustoTrue(event);
    } else {
      this.updateTodoStatustoFalse(event);
    }
 }

  setDueDate(event){
    event.preventDefault();

    const id = event.currentTarget.getAttribute('data-todo-id');
    const dueDate = this.refs.datetime.value;
    const body = event.currentTarget.getAttribute('data-todo-body');
    const isDone = event.currentTarget.getAttribute('data-todo-isDone');

    const todo = {
      id,
      dueDate,
      body,
      isDone
    }

    this.props.setDueDate(todo);
  }

  render() {
    const { todos } = this.props;
    const sortedTodos = todos.length ? _.orderBy(todos, 'updatedAt', ['desc']) : [];

    return (
      
      <div className="row">
        <div className="six columns offset-by-three">
        <form onSubmit={this.createTodo.bind(this)}>
            <input type="text" placeholder="Todo" ref="body" className="u-full-width" />
            <input type="submit" className="button button-primary u-full-width" value="Add Todo" />
          </form>
          {sortedTodos.length ? (
            <ul>
              { sortedTodos.map((todo) => {
                  return (
                      <li key={`todo-${todo.id}`}>
                        <input style={checkboxStyles} data-todo-id={todo.id} data-todo-body={todo.body} data-todo-dueDate={todo.dueDate} type="checkbox" checked={todo.isDone=="true"} onChange={this.filterCompleted.bind(this)}/>
                        <span data-todo-id={todo.id} contentEditable="true" onBlur={this.updateTodo.bind(this)}>{todo.body}</span>
                        <a style={deleteTodoStyles} href='#' data-todo-id={todo.id} onClick={this.deleteTodo.bind(this)}>Delete</a>
                        <label style={dueDateStyles}>Due Date: </label>
                        <input style={dueDateStyles} type="datetime-local" ref="datetime" data-todo-id={todo.id} data-todo-body={todo.body} data-todo-isDone={todo.isDone} data-todo-dueDate={todo.dueDate} onChange={this.setDueDate.bind(this)} value={todo.dueDate}/>
                      </li>
                  )
                }
              )}
            </ul>
          ) : <div style={noDataAvailableStyles}>There are currently no todos available to display</div> }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { todos: state.todos.todos };
}

export default connect(mapStateToProps, { getTodos, updateTodo, deleteTodo, createTodo, updateTodoStatustoTrue, updateTodoStatustoFalse, setDueDate })(TodosIndex);