import { Todo } from '../models/todo.models';

export class CreateTodo {
  static readonly type = '[TODO] Create Todo';

  constructor(public payload: string) {}
}

export class ToggleTodo {
  static readonly type = '[TODO] Toggle Todo';

  constructor(public payload: Todo) {}
}

export class DeleteTodo {
  static readonly type = '[TODO] Delete Todo';

  constructor(public payload: Todo) {}
}

export class DeleteChecked {
  static readonly type = '[TODO] Delete Checked';
}

export class ToggleAllTodos {
  static readonly type = '[TODO] Toggle all Todos';
}

export class ClearCompleted {
  public static readonly type = '[TODO] Clear Checked';
}

export class Archive {
  public static readonly type = '[TODO] Archive';
}

export class SetFilter {
  public static readonly type = '[TODO] SetFilter';

  constructor(public payload: string) {}
}
