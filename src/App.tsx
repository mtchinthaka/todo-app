import React, {Component} from 'react';
import {Col, Row} from 'antd';
import './App.css';


import Todo from './types/Todo';
import TodoList from "./components/todo/list/TodoList";
import AddTodo from "./components/todo/add/AddTodo";

interface AppState {
    filter: string;
    todosLoading: boolean;
    todos: Todo[];
}

class App extends Component<{}, AppState> {
    state: AppState = {
        filter: 'ALL',
        todosLoading: false,
        todos: []
    };

    render() {
        const todos = this.getTodos();

        return (
            <div>
                <Row justify="center" align="top">
                    <Col span={24}>
                        <header className="my-2"><h1>Things To Do</h1></header>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <AddTodo onNewTodo={this.addTodo}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        <TodoList
                            currentFilter={this.state.filter}
                            todos={todos}
                            todosLoading={this.state.todosLoading}
                            onDeleteTodo={this.deleteTodo}
                            onToggleTodo={this.toggleTodo}
                            onUpdateFilter={this.updateFilter}
                        />
                    </Col>
                </Row>
            </div>
        );
    }

    getTodos = () => {
        const {filter, todos} = this.state;

        switch (filter) {
            case 'ACTIVE':
                return todos.filter(todo => !todo.completed);
            case 'COMPLETED':
                return todos.filter(todo => todo.completed);
            default:
                return todos;
        }
    }

    updateFilter = (filter: string) => {
        this.setState({
            filter
        });
    }

    addTodo = async (title: string) => {
        console.log('adding items to to-do list.');

        this.setState({
            todos: [...this.state.todos,
                {
                    title,
                    completed: false,
                    order: this.state.todos.length === 0 ? 1 : this.state.todos.length + 1,
                    id: this.state.todos.length === 0 ? 1 : this.state.todos.length + 1
                }]
        });
    }


    deleteTodo = async (todo: Todo) => {
        this.setState({
            todos: this.state.todos.filter(t => todo.id !== t.id),
        });
    }

    toggleTodo = async (todo: Todo) => {
        const index = this.state.todos.findIndex((item) => item.id === todo.id);

        this.state.todos[index].completed = !this.state.todos[index].completed;

        this.setState({
            todos: this.state.todos.map(t => todo.id === t.id ? this.state.todos[index] : t)
        });
    }
}

export default App;