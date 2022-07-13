import React from "react";
import { useNavigate } from "react-router-dom";
import "./RowCard.scss"

const RowCard = (props) => {
    const navigate = useNavigate();
    const {id, imgUrl, evidenceUrls, fullName, yearExperiences, ratingScore, majorFields, description, address } = props.lawyer;

    return (
        <div className="row-card">          
            <div className="image2" onClick={() => navigate(`/lawyer/${id}`)}>
                <img src={imgUrl} alt="Vinh" />
            </div>
            <div className="row-card-info">
                <span className="row-card-name"><h3>Luật sư:</h3> {fullName}</span>
                <div className="rate-score-exp">
                    <div><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span><span className="fa fa-star" style={{color: "#fbc926"}}></span></div>
                    <div className="rate-score mb-20">Đánh giá của VLaw: <span>{ratingScore}</span></div>
                    <div>{yearExperiences} năm kinh nghiệm</div>
                </div>
                <p>{`${description.substring(0, 200)}...`}</p>
                <div className="row-address">
                    <span>Địa chỉ văn phòng/ Công ty:</span> {address}
                </div>
            </div>
        </div>
    )
}

export default RowCard;