import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Delete from "./components/DeleteMovie";
import Create from "./components/AddMovie";
import Error from "./components/Error";
import Update from "./components/UpdateMovie";
import './App.css';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/create" element={<Create/>}/>
            <Route path="/delete/:id" element={<Delete/>}/>
            <Route path="/error" element={<Error/>}/>
            <Route path="/update/:id" element={<Update/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
