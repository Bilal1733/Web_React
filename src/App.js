import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          
          <Route path='/home' element={<Home />}/>
          
          <Route path='/about' element={<About />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
