import React from "react";
import "./style.scss"

const Rating = ({rating}) => {
    return (
        <>
            {rating == 1 &&
            <>    
                <span className="fa fa-star" style={{color: "#fbc926"}}></span>
            </>
            }
            {rating == 2 &&
            <>   
               <span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span>
            </>
            }
            {rating == 3 &&
            <>
                <span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span>
            </>
            }
            {rating == 4 &&
            <>
                <span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span>
            </>
            }
            {rating == 5 &&
            <>
                <span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span>
            </>
            }
        </>
    )
}

export default Rating;