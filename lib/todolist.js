const Todo = require('./todo.js');

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todo) {
    if(todo instanceof Todo) {
      this.todos.push(todo);
    } else {
      throw new TypeError('can only add Todo objects');
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos[0];
  }

  last() {
    return this.todos[this.size() - 1];
  }

  itemAt(i) {
    this._validateIndex(i);
    return this.todos[i];
  }

  markDoneAt(i) {
    if(this.itemAt(i)) this.itemAt(i).markDone();
  }

  markUndoneAt(i) {
      if(this.itemAt(i)) this.itemAt(i).markUndone();
  }

  isDone() {
    return this.todos.every(todo => todo.done);
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(i) {
    this._validateIndex(i);
    return this.todos.splice(i, 1);
  }

  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }

  forEach(cb) {
    this.todos.forEach(cb);
  }

  filter(cb) {
    let newList = new TodoList(this.title);
    this.todos.forEach(todo => {
      let newTodo = Object.assign(new Todo, todo);
      if(cb(newTodo)) newList.add(newTodo);
    });
    return newList;
  }

  findByTitle(title) {
    return this.filter(todo => todo.title === title).first();
  }

  markDone(title) {
    this.findByTitle(title).markDone();
  }

  allDone() {
    return this.filter(todo => todo.done);
  }

  allNotDone() {
    return this.filter(todo => !todo.done);
  }

  markAllDone() {
    return this.forEach(todo => todo.markDone());
  }

  markAllUndone() {
    return this.forEach(todo => todo.markUndone());
  }

  toArray() {
    return this.todos.slice();
  }

  _validateIndex(index) { // _ in name indicates "private" method
    if (!(index in this.todos)) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
}

/*
// Create a TodoList Object
let list = new TodoList("Today's Todos");
console.log(list); // TodoList { title: "Today's Todos", todos: [] }

// Add a Todo to a TodoList Object
let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
console.log(list);

// How Many Todos are on the TodoList?
console.log(list.size());  // 4

// Get the First and Last Todos From a TodoList
console.log(list.first());
console.log(list.last());

let emptyList = new TodoList("Empty List");
console.log(emptyList.first());
console.log(emptyList.last());

// Get the Todo at Index Position
console.log(list.itemAt(1));

// Mark a Todo at Index Position As Done or Not Done
list.markDoneAt(1);
console.log(list);

list.markUndoneAt(1);
console.log(list);

// Are All Todos Done?
console.log(list.isDone()); // false

list.markDoneAt(0);
list.markDoneAt(1);
list.markDoneAt(2);
list.markDoneAt(3);
console.log(list.isDone()); // true

list.markUndoneAt(2);
console.log(list.isDone()); // false

// Remove and Return the First or Last Todo from the List
console.log(list.shift());
console.log(list.pop());
console.log(list);

console.log(emptyList.shift());
console.log(emptyList.pop());
console.log(emptyList);

// Remove and Return a Todo by Index Position
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
list.add(todo5);
list.add(todo6);
console.log(list);

console.log(list.removeAt(2));
console.log(list.removeAt(0));
console.log(list.removeAt(1));
console.log(list);

// Render the Todo List as a String Suitable for Display
list.add(todo1);
list.add(todo2);
list.add(todo4);
list.add(todo5);
list.add(todo6);
console.log(`${list}`);
*/

/*
// Add a forEach Method
let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);

list.forEach(todo => console.log(todo.toString()));


// Add a filter Method
let todo1 = new Todo("Buy milk");
let todo2 = new Todo("Clean room");
let todo3 = new Todo("Go to the gym");
let todo4 = new Todo("Go shopping");
let todo5 = new Todo("Feed the cats");
let todo6 = new Todo("Study for Launch School");
let list = new TodoList("Today's Todos");

list.add(todo1);
list.add(todo2);
list.add(todo3);
list.add(todo4);
list.add(todo5);
list.add(todo6);
todo1.markDone();
todo5.markDone();

// let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);
// console.log(list.filter(todo => todo.isDone()).first());

// More Methods
list.markAllDone();
console.log(list.allDone());

list.markAllUndone();
console.log(list.allNotDone());

console.log(list.findByTitle("Buy milk"));
list.markDone("Buy milk");

console.log(list.toArray());
*/

module.exports = TodoList;