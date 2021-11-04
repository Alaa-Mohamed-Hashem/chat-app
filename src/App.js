import React, { useState } from 'react';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import './App.css';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";
import Header from './components/Header';
import styled from 'styled-components';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import Login from './components/Login';
import Spinner from 'react-spinkit';

function App() {
  const [user, loading] = useAuthState(auth);
  const [classes, setClasses] = useState('');

  const hideClass = () => { setClasses('0%'); }

  const showClass = () => { setClasses('100%') }

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img src="https://www.pinclipart.com/picdir/big/54-546980_sms-transparent-sms-blue-icon-png-clipart.png" alt="" />
          <Spinner
            name="ball-spin-fade-loader"
            color="#126d73"
            fadeIn="none"
          />
        </AppLoadingContents>
      </AppLoading>
    )
  };

  const showClasess = (bringClass) => {
    setClasses(bringClass);
  };

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar classes={classes} hideClass={hideClass} />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat showClasess={showClasess} />
                </Route>
                <Route path="/">
                  <Chat showClasess={showClasess} />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
      {user && (
        <>
          <KeyboardArrowRight className='ArrowRight' onClick={showClass} />
          <KeyboardArrowLeft className={classes === '' || classes === '0%' ? 'disArrowLeft' : 'ArrowLeft'} onClick={hideClass} />
        </>
      )}
    </div>
  );
}

export default App;

const AppLoading = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
    margin-right: 10px;
  }
`;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
