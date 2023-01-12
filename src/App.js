import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Encuesta } from './components/Encuesta';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Encuesta />} />
          <Route path='/encuesta' element={<Encuesta />} />
        </Routes>
    </>
  );
}

export default App;
