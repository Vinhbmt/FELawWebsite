import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();
    const [ showList, setShowList] = useState(false);

    return (
        <div className="navbar">
            <ul>
                <li onClick={() => navigate(`/`)}>Trang chu</li>
                <li className="intro" onMouseOver={() => setShowList(!showList)}>
                    <p>Gioi thieu</p>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;