import { useEffect, useState } from "react";
import axios from 'axios';
import Pokemon from '../pokemon/pokemon.jsx';

//css
import './pokemonList.css'


function PokemonList() {

    // const [pokemonList,setPokemonList] = useState([]);
    // const [isLoading,setIsLoading] = useState(true);

    // const[pokedexUrl,setPokedexUrl]=useState('https://pokeapi.co/api/v2/pokemon');
    // const[nextUrl,setNextUrl]=useState('');
    // const[prevUrl,setPrevUrl]=useState('');

    const [PokemonListState, setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: 'https://pokeapi.co/api/v2/pokemon',
        nextUrl: '',
        prevUrl: ''
    })


    async function downloadPokemons() {
        const response = await axios.get(PokemonListState.pokedexUrl);
        const pokemonResults = response.data.results;
        console.log(response.data);
        //    setNextUrl(response.data.next);
        //    setPrevUrl(response.data.previous);
        setPokemonListState((state) => ({
            ...state,
            nextUrl: response.data.next,
            prevUrl: response.data.previous

        }))

        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url));
        const pokemonData = await axios.all(pokemonResultPromise);
        const pokemonListResult = pokemonData.map((pokemonData) => {
            const pokemon = pokemonData.data;
            return {
                id: pokemon.id,
                name: pokemon.name,
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
                types: pokemon.types
            }
        })
        console.log(pokemonListResult);

        //    setPokemonList(pokemonListResult);
        // setIsLoading(false);
        setPokemonListState((state) => ({
            ...state,
            pokemonList: pokemonListResult,
            isLoading: false

        }))
        console.log(pokemonData);


    }

    useEffect(() => {
        downloadPokemons();
    }, [PokemonListState.pokedexUrl]);
    return (
        <div className='pokedmon-List-wrapper'>
            <h1 className="h">Pokemon List</h1>
            <div className="pokemon-wrapper">
                {(PokemonListState.isLoading) ? 'Loading...' :
                    PokemonListState.pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />)
                }
            </div>
            <div className="Controls">
                <button disabled={PokemonListState.prevUrl == null} className="btn" onClick={() => setPokemonListState((state) => ({...state,pokedexUrl : PokemonListState.prevUrl}))}>Prev</button>
                <button disabled={PokemonListState.nextUrl == null} className="btn" onClick={() => setPokemonListState((state) => ({...state,pokedexUrl : PokemonListState.nextUrl}))}>Next</button>
            </div>

        </div>
    )
}
export default PokemonList;