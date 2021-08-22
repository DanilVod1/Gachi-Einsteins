import LeftSlide from './components/LeftSlide/LeftSlide';
import React, { useState } from 'react';
import EditContainer from './components/EditContainer/EditContainer';
import './app.scss';
import RightSlide from './components/RightSlide/RightSlide';
import { ThemeProvider } from '@design-system-rt/rtk-ui-kit';
import Navbar from './components/NavBar/NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme, setLoaderStatus } from './store/actions/action';

function App() {
  const state = useSelector((state) => state.global);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setTimeout(() => {
      dispatch(changeTheme({ theme: 'dark' }));
    }, 0);
    setTimeout(() => {
      dispatch(setLoaderStatus({ isLoading: false }));
    }, 2200);
  }, []);

  return (
    <ThemeProvider themeName="dark">
      {state.isLoading && (
        <div className="loader-screen">
          <div className="loader" />
        </div>
      )}
      <div className="App">
        <Navbar />
        <div className="work-space">
          <LeftSlide></LeftSlide>
          <EditContainer></EditContainer>
          <RightSlide></RightSlide>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
