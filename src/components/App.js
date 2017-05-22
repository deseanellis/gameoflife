import React, { Component } from 'react';
import Header from './Header';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <div>
      <Header>
        <div>Game of <span>Life</span></div>
        <div>
          <span>
            <i className="fa fa-free-code-camp"></i> Project: DeSean Ellis <i className="fa fa-copyright"></i> 2017 |
          </span>
        </div>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/desean-ellis-880190b2/" target="_blank"><i className="fa fa-linkedin-square"></i></a>
          <a href="https://github.com/deseanellis/" target="_blank"><i className="fa fa-github-square"></i></a>
        </div>
      </Header>
      <Content />
      </div>
    );
  }
}

export default App;
