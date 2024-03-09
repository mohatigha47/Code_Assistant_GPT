import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from './routes/main';
import Welcome from './routes/welcome';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/main" element={<Main />}></Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
