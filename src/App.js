import React, { useState } from 'react';
import LeftSlide from './components/LeftSlide/LeftSlide';
import EditContainer from './components/EditContainer/EditContainer';
import RightSlide from './components/RightSlide/RightSlide';
import { ThemeProvider } from '@design-system-rt/rtk-ui-kit';
import Navbar from './components/NavBar/NavBar';
import './app.scss';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  return (
    <ThemeProvider themeName="dark">
      {isLoading && (
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
