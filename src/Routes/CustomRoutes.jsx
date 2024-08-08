
import {Routes,Route} from 'react-router-dom';
import Pokedex from '../Components/Pokedex/pokedex';
import PokemonDetails from '../Components/PokemonDetails/pokemonDetails';

function CoustomRoutes(){
    return(
        
      <Routes>
          <Route path="/" element={<Pokedex/>}/>
          <Route path="/pokemon/:id" element={<PokemonDetails/>}/>

      </Routes>
    );
}
export default CoustomRoutes;

