"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Todo = require('./todo.js');

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.
var TodoList = /*#__PURE__*/function () {
  function TodoList(title) {
    _classCallCheck(this, TodoList);
    this.title = title;
    this.todos = [];
  }
  _createClass(TodoList, [{
    key: "add",
    value: function add(todo) {
      if (todo instanceof Todo) {
        this.todos.push(todo);
      } else {
        throw new TypeError('can only add Todo objects');
      }
    }
  }, {
    key: "size",
    value: function size() {
      return this.todos.length;
    }
  }, {
    key: "first",
    value: function first() {
      return this.todos[0];
    }
  }, {
    key: "last",
    value: function last() {
      return this.todos[this.size() - 1];
    }
  }, {
    key: "itemAt",
    value: function itemAt(i) {
      this._validateIndex(i);
      return this.todos[i];
    }
  }, {
    key: "markDoneAt",
    value: function markDoneAt(i) {
      if (this.itemAt(i)) this.itemAt(i).markDone();
    }
  }, {
    key: "markUndoneAt",
    value: function markUndoneAt(i) {
      if (this.itemAt(i)) this.itemAt(i).markUndone();
    }
  }, {
    key: "isDone",
    value: function isDone() {
      return this.todos.every(function (todo) {
        return todo.done;
      });
    }
  }, {
    key: "shift",
    value: function shift() {
      return this.todos.shift();
    }
  }, {
    key: "pop",
    value: function pop() {
      return this.todos.pop();
    }
  }, {
    key: "removeAt",
    value: function removeAt(i) {
      this._validateIndex(i);
      return this.todos.splice(i, 1);
    }
  }, {
    key: "toString",
    value: function toString() {
      var title = "---- ".concat(this.title, " ----");
      var list = this.todos.map(function (todo) {
        return todo.toString();
      }).join("\n");
      return "".concat(title, "\n").concat(list);
    }
  }, {
    key: "forEach",
    value: function forEach(cb) {
      this.todos.forEach(cb);
    }
  }, {
    key: "filter",
    value: function filter(cb) {
      var newList = new TodoList(this.title);
      this.todos.forEach(function (todo) {
        var newTodo = Object.assign(new Todo(), todo);
        if (cb(newTodo)) newList.add(newTodo);
      });
      return newList;
    }
  }, {
    key: "findByTitle",
    value: function findByTitle(title) {
      return this.filter(function (todo) {
        return todo.title === title;
      }).first();
    }
  }, {
    key: "markDone",
    value: function markDone(title) {
      this.findByTitle(title).markDone();
    }
  }, {
    key: "allDone",
    value: function allDone() {
      return this.filter(function (todo) {
        return todo.done;
      });
    }
  }, {
    key: "allNotDone",
    value: function allNotDone() {
      return this.filter(function (todo) {
        return !todo.done;
      });
    }
  }, {
    key: "markAllDone",
    value: function markAllDone() {
      return this.forEach(function (todo) {
        return todo.markDone();
      });
    }
  }, {
    key: "markAllUndone",
    value: function markAllUndone() {
      return this.forEach(function (todo) {
        return todo.markUndone();
      });
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.todos.slice();
    }
  }, {
    key: "_validateIndex",
    value: function _validateIndex(index) {
      // _ in name indicates "private" method
      if (!(index in this.todos)) {
        throw new ReferenceError("invalid index: ".concat(index));
      }
    }
  }]);
  return TodoList;
}();
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