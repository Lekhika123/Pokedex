import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PokemonDetails.css'

function PokemonDetails() {
    const { id } = useParams();
    const[pokemon,setPokemon]=useState({});


    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log(response);
        
        setPokemon({
            name : response.data.name,
            image : response.data.sprites.other.dream_world.front_default,
            weight : response.data.weight,
            height : response.data.height,
            types : response.data.types.map((t)=> t.type.name)
        })
    }

    useEffect(() => {
            downloadPokemon();
        }, []);


    return (
        <div className='pokemon-detail-wrapper'>
             <img className='pokemon-details-img' src={pokemon.image}/>
            <div className='pokemon-details-name'>name: <span>{pokemon.name}</span></div>
            <div className='pokemon-details-name'>Height: <span>{pokemon.height}</span></div>
            <div className='pokemon-details-name'>Weight: <span>{pokemon.weight}</span></div>
            <div className='pokemon-details-types'>
                {pokemon.types && pokemon.types.map((t) => <div key={t}> {t} </div>)}
            </div>


            
        </div>
    );

}
export default PokemonDetails;