import './pokemon.css'

function pokemon({name,image}){
    return(
        <div className='pokemon'>
            <div className='pokemon-name'>{name}</div>
            <div>
                <img className='pokemon-img' src={image}></img>
            </div>
        </div>
    )
}
export default pokemon;