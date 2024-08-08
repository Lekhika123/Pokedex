import { Link } from 'react-router-dom';
import './pokemon.css'

function pokemon({ name, image ,id }) {
    return (
        <div className='pokemon'>
            <Link to={`/pokemon/${id}`}>
                <div className='pokemon-name'>{name}</div>
                <div>
                    <img className='pokemon-img' src={image}></img>
                </div>
            </Link>
        </div>
    )
}
export default pokemon;