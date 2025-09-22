import logo from './logo.svg';
import './App.css';
import { Navbar, Category, Hasil, Menu } from "./component";

function App() {
  return (
    <div>
      <Navbar />
      <Category />
      <Menu />
      <Hasil />
    </div>
  );
}

export default App;