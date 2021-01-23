import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Todo } from '../models/todo.models';
import { TodoState } from '../states/todo.state';
import { DeleteTodo, ToggleTodo } from '../actions/todo.action';

@Component({
  selector: 'app-todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class TodoListComponent {
  @Select(TodoState.numUncheckedTodos)
  uncheckedTodos: Observable<number>;

  @Select(TodoState.todos)
  todos: Observable<Todo[]>;

  constructor(private store: Store) {}

  toggleTodo(todo: Todo) {
    this.store.dispatch(new ToggleTodo(todo));
  }

  deleteTodo(todo: Todo) {
    this.store.dispatch(new DeleteTodo(todo));
  }
}
