import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { CreateTodo } from '../actions/todo.action';

@Component({
  selector: 'app-todo-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class TodoFormComponent {
  todoForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.todoForm = fb.group({
      descriptionCtrl: '',
    });
  }

  submitTodo() {
    const { descriptionCtrl } = this.todoForm.value;
    this.store.dispatch(new CreateTodo(descriptionCtrl));
  }
}
