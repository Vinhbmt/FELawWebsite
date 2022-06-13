import { useNavigate, Link } from "react-router-dom";
import { useTitle } from "../../../core/customHook";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import './style.scss';
import LawyerAction from "../../../redux/actions/LawyerAction";
import { useEffect, useState } from "react";
import { register } from "../../../redux/actions/LawyerAction";

const RegisterLawyer = () => {
    useTitle("Đăng ký luật sư");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [majorFields, setMajorFields] = useState([]);
    const [description, setDescription] = useState('');
    const [ratingScore, setRatingScore] = useState(0);
    const [yearExperiences, setYearExperiences] = useState(0);
    const [idImage, setIdImage] = useState("");
    const [degImage, setDegImage] = useState("");


    const [previewID, setPreviewID] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")
    const [previewDeg, setPreviewDeg] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")


    const handleIDImageChange = (e) => {
        setPreviewID(URL.createObjectURL(e.target.files[0]))
        setIdImage(e.target.files[0])
    }
    const handleDegImageChange = (e) => {
        setPreviewDeg(URL.createObjectURL(e.target.files[0]))
        setDegImage(e.target.files[0])
    }
    // use hook form 

    


    const onSubmitRegister = async (e) => {
        e.preventDefault();
        console.log("helooo")
        let lawyerData = new FormData()
        lawyerData.append("email", email)
        lawyerData.append("firstName", firstName)
        lawyerData.append("lastName", lastName)
        lawyerData.append("password", password)
        lawyerData.append("role", "lawyer")
        lawyerData.append("majorFields", majorFields)
        lawyerData.append("description", description)
        lawyerData.append("ratingScore", ratingScore)
        lawyerData.append("yearExperiences", yearExperiences)
        lawyerData.append("files[]", idImage)
        lawyerData.append("files[]", degImage)
        console.log(lawyerData)
        const response = await fetch('https://localhost:4000/api/v1/users/lawyer', {
      method: 'POST',
      body: lawyerData
    })
        console.log(response)
    }

    return(
            <div>
                <h1>Tạo tài khoản mới</h1>
                <div className="submit-form">
                    <form onSubmit={onSubmitRegister}>
                        <div class="txt_field">
                            <input
                                type="text"
                                //className="form-control"
                                //placeholder="Enter email"
                                name="email"
                                value={email}
                                onChange= {(e) => setEmail(e.target.value)} />
                            <span></span>
                            <label><i class='fas fa-id-card'></i>Email</label>
                        </div>
                        <div class="txt_field">
                            <input
                                type="text"
                                //className="form-control"
                                //placeholder="Enter email"
                                name="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)} />
                            <span></span>
                            <label><i class='fas fa-user-alt'></i>First Name</label>
                        </div>   
                        <div class="txt_field">
                            <input
                                type="text"
                                //className="form-control"
                                //placeholder="Enter email"
                                name="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} />
                            <span></span>
                            <label><i class='fas fa-user-alt'></i>Last Name</label>
                        </div>                    
                        <div class="txt_field">
                            <input
                                type="password"
                                // className="form-control"
                                // placeholder="Enter password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                            <span></span>
                            <label><i class='fas fa-lock'></i>Password</label>
                        </div>
                        <div>
                            <label>Linh vuc</label>
                            <select name="majorFileds" onChange={(value) => setMajorFields(value)} defaultValue={""} multiple >
                                <option value="Hinh su">Hinh su</option>
                                <option value="Dan su">Dan su</option>
                                <option value="Doanh nghiep">Doanh nghiep</option>
                                <option value="Thue">Thue</option>
                            </select>
                        </div>
                        <div class="txt_field">
                            <textarea
                                type="text"
                                //className="form-control"
                                //placeholder="Enter email"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} />
                            <span></span>
                            <label><i class='fas fa-user-alt'></i>Description</label>
                        </div>
                        <div class="txt_field">
                            <input
                                type="number"
                                //className="form-control"
                                //placeholder="Enter email"
                                name="ratingScore"
                                value={ratingScore}
                                onChange={(e) => setRatingScore(e.target.value)} />
                            <span></span>
                            <label><i class='fas fa-user-alt'></i>Diem</label>
                        </div>
                        <div>
                            <label>Kinh nghiem</label>
                            <select name="majorFileds" onChange={(value) => setYearExperiences(value)} defaultValue={""} >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                            </select>
                        </div>
                        <div className='edit-image-source'>
                            <div className="alert alert-info ">
                                <img src={previewID} alt="image-music" className="img img-fluid "></img>
                                <label className="btn btn-outline-primary btn-light btn-block m-2 text-left">
                                    IDImage
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleIDImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>
                        <div className='edit-image-source'>
                            <div className="alert alert-info ">
                                <img src={previewDeg} alt="image-music" className="img img-fluid "></img>
                                <label className="btn btn-outline-primary btn-light btn-block m-2 text-left">
                                    DEGImage
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={handleDegImageChange}
                                        accept="image/*"
                                        hidden
                                    />
                                </label>
                            </div>
                        </div>
                        <input type="submit" value="Create account" />
                        <div class="signup_link">
                            Already have an account?
                            <Link className="nav-link" to="/lawyer/login">Sign in</Link>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default RegisterLawyer