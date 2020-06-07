import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          hello!!!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;





// 页面上 2个组件  一个组件 实现 计数器 有2个按钮，一个添加，一个减小，初始值为0，最大值为10
// 另一个组件 实现  输入框与姓名 同步，初始值为 zhangyuli， 如，
