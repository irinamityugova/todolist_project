const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('To do list', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');
    list = new TodoList("Today's Todos");

    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });

  test('todolist toArray works', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  test('todolist first works', () => {
    expect(list.first()).toEqual(todo1);
  });

  test('todolist last works', () => {
    expect(list.last()).toEqual(todo3);
  });

  test('todolist shift works', () => {
    let tempList = new TodoList("Today's Todos");
    tempList.add(todo2);
    tempList.add(todo3);

    list.shift();
    expect(list).toEqual(tempList);
  });

  test('todolist isDone works', () => {
    expect(list.isDone()).toBe(false);
    list.markAllDone();
    expect(list.isDone()).toBe(true);
  });

  test('todolist add with a string thrpws a TypeError', () => {
    expect(() => list.add('Not a Todo')).toThrow(TypeError);
  });

  test('todolist itemAt works', () => {
    expect(list.itemAt(0)).toEqual(todo1);
  });

  test('todolist itemAt throws a ReferenceError when no index is provided', () => {
    expect(() => list.itemAt()).toThrow(ReferenceError);
  });

  test('todolist markDoneAt works', () => {
    expect(todo1.isDone()).toBe(false);
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
  });

  test('todolist markDoneAt throws a ReferenceError when index is out of scope', () => {
    expect(() => list.markDoneAt(5)).toThrow(ReferenceError);
  });

  test('todolist markUndoneAt works', () => {
    list.markDoneAt(0);
    expect(todo1.isDone()).toBe(true);
    list.markUndoneAt(0);
    expect(todo1.isDone()).toBe(false);
  });

  test('todolist markAllDone works', () => {
    list.markAllDone()
    expect(list.isDone()).toBe(true);
  });

  test('todolist removeAt works', () => {
    let tempList = new TodoList("Today's Todos");
    tempList.add(todo2);
    tempList.add(todo3);

    list.removeAt(0);
    expect(list).toEqual(tempList);
  });

  test('todolist removeAt throws a ReferenceError when index is out of scope', () => {
    expect(() => list.removeAt(9)).toThrow(ReferenceError);
  });

  test('todolist toString works (part 1)', () => {
    let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    expect(list.toString()).toBe(string);
  });

  test('todolist toString works (part 2)', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;
    list.markDoneAt(0);
    expect(list.toString()).toBe(string);
  });

  test('todolist toString works (part 3)', () => {
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
    list.markAllDone();
    expect(list.toString()).toBe(string);
  });

  test('todolist forEach works', () => {
    list.forEach(todo => todo.title = 'Nothing')
    expect(todo1).toEqual(todo2);
  });

  test('todolist filter works', () => {
    let tempList = new TodoList("Today's Todos");
    tempList.add(todo1);
    let filteredList = list.filter(todo => todo.title === 'Buy milk');

    expect(filteredList).toEqual(tempList);
  });
})