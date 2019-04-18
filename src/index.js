import React, {useState, useMemo, useCallback, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

const initialTodos = [
  {id: 1, task: 'Task1', done: true},
  {id: 2, task: 'Task2', done: false},
  {id: 3, task: 'Task3', done: false}
];

const getTaskStyle = item =>
  item.done
    ? {
        listStyleType: 'disc',
        color: 'green'
      }
    : {
        listStyleType: 'circle'
      };

const getTaskTextStyle = item =>
  item.done
    ? {
        textDecoration: 'line-through',
        color: 'green',
        cursor: 'default'
      }
    : {
        cursor: 'default'
      };

const getTaskRemoveButtonStyle = () => ({
  padding: 8,
  color: 'black',
  cursor: 'pointer'
});

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [shouldSave, setShouldSave] = useState(false);
  const prevTodos = useRef(todos);
  const inputRef = useRef();

  useEffect(() => {
    if (prevTodos.current !== todos) {
      setShouldSave(true);
    }
  }, [todos]);

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
    setTodos(todos =>
      todos.map(item => (item.id === id ? {...item, done: !item.done} : item))
    );
  }, []);

  const saveTodos = useCallback(() => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
    setShouldSave(false);
    inputRef.current.focus();
  }, [todos]);

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          onKeyPress={e => {
            if (e.which === 13) {
              addTodo(e.target.value);
              e.target.value = '';
            }
          }}
        />
        <button disabled={!shouldSave} onClick={saveTodos}>
          Save
        </button>
        <ul>
          {todos.map(item => (
            <li key={item.id} style={getTaskStyle(item)}>
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
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
