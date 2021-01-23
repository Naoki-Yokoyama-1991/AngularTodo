import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  ToggleAllTodos,
  ClearCompleted,
  DeleteChecked,
  Archive,
  SetFilter,
} from '../actions/todo.action';
import { TodoState } from '../states/todo.state';
import { Observable, NextObserver } from 'rxjs';
import { Todo } from '../models/todo.models';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  routeObserver: NextObserver<string>;

  constructor(private store: Store) {
    this.routeObserver = {
      next: (filter) => this.filterTodos(filter),
    };
  }

  @Select(TodoState.todos)
  todos: Observable<Todo[]>;

  checkAll() {
    this.store.dispatch(new ToggleAllTodos());
  }

  deleteChecked() {
    this.store.dispatch(new DeleteChecked());
  }

  filterTodos(filter: string): void {
    this.store.dispatch(new SetFilter(filter));
  }

  clearTodo() {
    this.store.dispatch(new ClearCompleted());
  }

  archive() {
    this.store.dispatch(new Archive());
  }
}
