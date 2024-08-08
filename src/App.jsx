import './App.css'
//css import
import Pokedex from './Components/Pokedex/pokedex.jsx';
import CustomRoutes from "./Routes/CustomRoutes.jsx";
import {Link} from 'react-router-dom';


function App() {

  return (
    <div className='outer-pokedex'>
       <Link to='/' className="">
       <h1 id="heading">Pokedex</h1>
       </Link>
       <CustomRoutes/>
    </div>
  )
}

export default App
