import PokemonList from "../PokemonList/PokemonList.jsx";
import Search from "../Search/Search.jsx";

//css
import './pokedex.css'

function Pokedex() {
    
    return (
        <div className='pokedex-wrapper'>
            
            <Search />
            <PokemonList/>
        </div>
    )
}
export default Pokedex;