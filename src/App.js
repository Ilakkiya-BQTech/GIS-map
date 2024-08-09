import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyMap from './Components/Lineplot/Lineplot';
import Users from './Components/Users/Users';


const App = () => {
  return (
    <div className="App">
       <Routes>
        <Route path='/' element={<MyMap/>} />
        <Route path='/users' element={<Users/>} />
        </Routes>
  
    </div>
  );
};

export default App;
