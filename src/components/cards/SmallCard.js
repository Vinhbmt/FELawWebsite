import "./Card.css"
import React from 'react';
import { useNavigate } from "react-router-dom";


const SmallCard = (props) => {
    
    const {id, img, name, ratings, ratesScore, majorFields, description } = props.lawyer;
    const navigate = useNavigate();
    //console.log(rating)
    return (
        <>
            <article>
                <img src={require("../assets/img/" + img)} alt={name}/>
                <div class="text">
                    <h3>{name}</h3>
                    <p className="card-text">Rating: {ratings} <i class="far fa-star"></i></p>
                    <p className="card-text">Rate Score: {ratesScore}</p>
                    <p>{`${description.substring(0, 200)}...`}</p>
                </div>
                <div class="control-btn">
                    <button
                        onClick={() => navigate(`/lawyer/${id}`)}
                    >
                        Show more
                    </button>
                </div>
            </article>
        </>
    )    
}

export default SmallCard;