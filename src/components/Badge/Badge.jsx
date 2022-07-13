import React from "react";
import "./style.scss"

const Badge = (props) => {
    return (
        <div className="badge">
            <div className="value">
                {props.value}
            </div>
            <h3>{props.title}</h3>
            <div class="progress">
                <div className={`progress-bar w-${props.percent}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div className="percent">{props.percent}%</div>
        </div>
    )
}

export default Badge;