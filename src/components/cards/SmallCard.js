import "./Card.scss"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const SmallCard = (props) => {

    const [previewID, setPreviewID] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")
    
    const {id, imgUrl, evidenceUrls, fullName, yearExperiences, ratingScore, majorFields, description, address } = props.lawyer;
    const navigate = useNavigate();
    //console.log(rating)
    return (
        <>
            {/* <article>
                <img src={imgUrl} alt={fullName}/>
                <div class="text">
                    <h3>{fullName}</h3>
                    <p className="card-text">Experience: {yearExperiences} <i class="far fa-star"></i></p>
                    <p className="card-text">Rate Score: {ratingScore}</p>
                    <p>{`${description.substring(0, 200)}...`}</p>
                </div>
                <div class="control-btn">
                    <button
                        onClick={() => navigate(`/lawyer/${id}`)}
                    >
                        Show more
                    </button>
                </div>
            </article> */}
            <div className="info-container1" >
                <div className="image-detail-info1">
                    <div className="image1" onClick={() => navigate(`/lawyer/${id}`)}>
                        <img src={imgUrl} alt="Vinh" />
                    </div>
                    <div className="detail-info1">
                        <div className="lawyer-name1">{fullName}</div>
                        <div className="rating"><span className="fa fa-star" style={{ color: "#fbc926" }}></span><span className="fa fa-star" style={{ color: "#fbc926" }}></span><span className="fa fa-star" style={{ color: "#fbc926" }}></span><span className="fa fa-star" style={{ color: "#fbc926" }}></span><span className="fa fa-star" style={{ color: "#fbc926" }}></span></div>
                        <div className="rate-score mb-20">Đánh giá của VLaw: {ratingScore}</div>
                        <div className="address mb-10"><i className='fas fa-map-marker-alt mr-2'></i>{address}</div>                      
                    </div>
                </div>
                <div className="major-field">
                    <label>Lĩnh vực hành nghề: </label>
                    <br />
                    <div>{majorFields.join(', ')}</div>
                </div>
                <div className="descrip">
                    <label>Thông tin luật sư: </label>
                    <br/>
                    <p>{`${description.substring(0, 200)}...`}</p>
                </div>
                <span className="show-more" onClick={() => navigate(`/lawyer/${id}`)} >
                    Xem thêm
                </span>
            </div>
        </>
    )    
}

export default SmallCard;