import { useEffect,useState } from "react";
import axios from 'axios';
import Pokemon from '../pokemon/pokemon.jsx';

//css
import './pokemonList.css'


function PokemonList() {

    const [pokemonList,setPokemonList] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    const[pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    const[nextUrl,setNextUrl]=useState('');
    const[prevUrl,setPrevUrl]=useState('');


    async function downloadPokemons(){
       const response= await axios.get(pokedexUrl);
       const pokemonResults = response.data.results;
       console.log(response.data);
       setNextUrl(response.data.next);
       setPrevUrl(response.data.previous);
       
       const pokemonResultPromise = pokemonResults.map((pokemon)=> axios.get(pokemon.url));
       const pokemonData = await axios.all(pokemonResultPromise);
       const pokemonListResult=pokemonData.map((pokemonData)=>{
           const pokemon = pokemonData.data;
           return {
            id : pokemon.id,
            name : pokemon.name,
            image :(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny,
            types: pokemon.types}
       })
       console.log(pokemonListResult);
       
       setPokemonList(pokemonListResult);
       console.log(pokemonData);
       
        setIsLoading(false);
    }

    useEffect(()=>{
        downloadPokemons();
    },[pokedexUrl]);
    return (
        <div className='pokedmon-List-wrapper'>
            <h1 className="h">Pokemon List</h1>
            <div className="pokemon-wrapper">
            {(isLoading) ? 'Loading...':
              pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id}/> )
            }
            </div>
            <div className="Controls">
                <button disabled={prevUrl==null}  className="btn" onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
                <button disabled={nextUrl==null}  className="btn" onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
                
        </div>
    )
}
export default PokemonList;