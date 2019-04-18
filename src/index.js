import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

const initialTodos = [
  {id: 1, task: 'Task1', done: true},
  {id: 2, task: 'Task2', done: false},
  {id: 3, task: 'Task3', done: false}
];

const getTaskTextStyle = item =>
  item.done ? {textDecoration: 'line-through'} : {};

const getTaskRemoveButtonStyle = () => ({
  padding: 8
});

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const prevTodos = useRef([]);

  useEffect(() => {
    prevTodos.current = todos;
  }, [todos]);

  const addTodo = useCallback(task => {
    setTodos(todos => [...todos, {id: Date.now(), task}]);
  }, []);

  const removeTodo = useCallback(id => {
    setTodos(todos => todos.filter(item => item.id !== id));
  }, []);

  const toggleTodo = useCallback(id => {
    console.log('[DEBUG]');
    setTodos(todos =>
      todos.map(item => (item.id === id ? {...item, done: !item.done} : item))
    );
  }, []);

  return (
    <div>
      <div>
        <input onBlur={e => addTodo(e.target.value)} />
        <ul>
          {todos.map(item => (
            <li key={item.id}>
              <span
                style={getTaskTextStyle(item)}
                onClick={() => toggleTodo(item.id)}
              >
                {item.task}
              </span>
              <span
                style={getTaskRemoveButtonStyle()}
                onClick={() => removeTodo(item.id)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
