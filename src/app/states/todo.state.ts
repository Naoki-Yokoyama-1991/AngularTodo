import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Todo } from '../models/todo.models';
import {
  CreateTodo,
  DeleteTodo,
  ToggleTodo,
  ToggleAllTodos,
  ClearCompleted,
  DeleteChecked,
  Archive,
  SetFilter,
} from '../actions/todo.action';

interface TodoStateModel {
  filter: string;
  todos: Todo[];
}

const sampleTodos: Todo[] = [];

@State<TodoStateModel>({
  name: 'todo',
  defaults: {
    filter: '',
    todos: sampleTodos,
  },
})
export class TodoState {
  @Selector()
  static todos(state: TodoStateModel): Todo[] {
    return state.todos;
  }

  @Selector()
  static numUncheckedTodos(state: TodoStateModel): number {
    return state.todos.filter((todo) => !todo.done).length;
  }

  @Action(CreateTodo)
  createTodo(ctx: StateContext<TodoStateModel>, action: CreateTodo) {
    const todo = { description: action.payload, done: false, archive: false };
    ctx.patchState({
      todos: [todo, ...ctx.getState().todos],
    });
  }

  @Action(DeleteTodo)
  deleteTodo(ctx: StateContext<TodoStateModel>, action: DeleteTodo) {
    const { todos } = ctx.getState();
    ctx.patchState({
      todos: todos.filter((todo) => todo !== action.payload),
    });
  }

  @Action(ToggleTodo)
  toggleTodo(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
    const todo = action.payload;
    todo.done = !todo.done;
    ctx.patchState({
      todos: [...ctx.getState().todos],
    });
  }

  @Action(ToggleAllTodos)
  toggleAllTodos(ctx: StateContext<TodoStateModel>, action: ToggleTodo) {
    const { todos } = ctx.getState();
    const allDone = todos.every((todo) => todo.done);
    todos.forEach((todo) => (todo.done = !allDone));
    ctx.patchState({
      todos: [...todos],
    });
  }

  @Action(ClearCompleted)
  clear(ctx: StateContext<TodoStateModel>, action: ClearCompleted) {
    const { todos } = ctx.getState();
    ctx.patchState({
      todos: todos.filter((todo) => (!todo.done ? true : false)),
    });
  }

  @Action(DeleteChecked)
  deleteChecked(ctx: StateContext<TodoStateModel>, action: DeleteChecked) {
    const { todos } = ctx.getState();
    const allDone = todos.every((todo) => todo.done);
    todos.forEach((todo) => (todo.done = allDone));
  }

  @Action(Archive)
  archive(ctx: StateContext<TodoStateModel>, action: Archive) {
    const { todos } = ctx.getState();
    todos.map((todo) =>
      todo.done == true ? (todo.archive = true) : (todo.archive = false)
    );
  }

  @Action(SetFilter)
  filterTodos(ctx: StateContext<TodoStateModel>, action: SetFilter) {
    ctx.patchState({
      filter: action.payload,
    });
    console.log(
      ctx.patchState({
        filter: action.payload,
      })
    );
  }
}
