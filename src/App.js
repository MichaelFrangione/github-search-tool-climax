import React, { Component } from 'react';
import SearchBox from './components/Searchbox';
import UserListContainer from './components/UserListContainer';
import BackToTop from './components/BackToTop';
import Header from './components/Header';

import './sass/App.scss';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Header />
        <SearchBox />
        <UserListContainer />
        <BackToTop />
      </div>
    );
  }
}

export default App;
