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
import Select from 'react-select';
import majorData from "../../../majorData";
import { toast } from 'react-toastify';



const RegisterLawyer = () => {
    useTitle("Đăng ký luật sư");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [majorFields, setMajorFields] = useState([]);
    const [majorFieldsCode, setMajorFieldsCode] = useState([]);
    const [description, setDescription] = useState('');
    const [yearExperiences, setYearExperiences] = useState("");
    const [idImage, setIdImage] = useState("");
    const [degImage, setDegImage] = useState("");


    const [previewID, setPreviewID] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")
    const [previewDeg, setPreviewDeg] = useState("https://via.placeholder.com/100x100.png?text=PREVIEW")

    const exp = Array.from(Array(20).keys());

      const url = `${process.env.REACT_APP_URL_BE}/api/v1/users/lawyer`;
    const handleIDImageChange = (e) => {
        setPreviewID(URL.createObjectURL(e.target.files[0]))
        setIdImage(e.target.files[0])
    }
    const handleDegImageChange = (e) => {
        setPreviewDeg(URL.createObjectURL(e.target.files[0]))
        setDegImage(e.target.files[0])
    }

    const handleChange = (e) => {
        setMajorFields(Array.isArray(e) ? e.map(x => x.value) : []);
        setMajorFieldsCode(Array.isArray(e) ? e.map(x => x.code) : []);
        
      }
    // use hook form 
    console.log(majorFieldsCode);
    


    const onSubmitRegister = async (e) => {
        e.preventDefault();
        console.log("helooo")
        let lawyerData = new FormData()
        lawyerData.append("email", email)
        lawyerData.append("firstName", firstName)
        lawyerData.append("lastName", lastName)
        lawyerData.append("password", password)
        lawyerData.append("role", "lawyer")
        for(const majorField of majorFieldsCode) {
            lawyerData.append("majorFields", majorField)
        }       
        lawyerData.append("description", description)
        lawyerData.append("yearExperiences", yearExperiences)
        lawyerData.append("files", idImage)
        lawyerData.append("files", degImage)
        console.log([...lawyerData]);
        try {
            const response = await fetch('http://localhost:4000/api/v1/users/lawyer', {
            method: 'POST',
            body: lawyerData
            })
            if(response.status === 201){
                navigate('/lawyer/login');
                toast.success("Đăng kí tài khoản thành công !");
            }
        } catch (error) {
            toast.error("Đăng kí tài khoản thất bại !"); 
        }
        
    }

    return(
            <div className="center">
                <h1>Tạo tài khoản mới</h1>
                <div className="submit-form">
                    <form onSubmit={onSubmitRegister}>
                        <div className="container-form">
                            <div className="info-upload">
                                <div className="txt_field">
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
                                <div className="txt_field">
                                    <input
                                        type="text"
                                        //className="form-control"
                                        //placeholder="Enter email"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)} />
                                    <span></span>
                                    <label><i class='fas fa-address-book mr-2'></i>Họ</label>
                                </div>   
                                <div className="txt_field">
                                    <input
                                        type="text"
                                        //className="form-control"
                                        //placeholder="Enter email"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)} />
                                    <span></span>
                                    <label><i class='far fa-address-book mr-2'></i>Tên</label>
                                </div>                    
                                <div className="txt_field">
                                    <input
                                        type="password"
                                        // className="form-control"
                                        // placeholder="Enter password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    <span></span>
                                    <label><i class='fas fa-lock'></i>Mật khẩu</label>
                                </div>
                                <div className="select">
                                    <label><i class='fas fa-briefcase'></i>Lĩnh vực</label>
                                    <br />
                                    <Select
                                        className="dropdown"
                                        placeholder="Select Option"
                                        value={majorData.filter(obj => majorFields.includes(obj.value))} // set selected values
                                        options={majorData} // set list of the data
                                        onChange={handleChange} // assign onChange function
                                        isMulti
                                        isClearable
                                    />
                                </div >
                                <div className="txt_field">
                                    <span><i className='fas fa-clipboard mr-2'></i>Mô tả</span>
                                    {/* <label><i class='fas fa-user-alt'></i>Descriptisđsdson</label> */}
                                    <br/>
                                    <textarea
                                        type="text"
                                        //className="form-control"
                                        //placeholder="Enter email"
                                        name="description"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)} />                                  
                                </div>
                                <div>
                                    <label className="mr-2"><i class='fas fa-bookmark mr-2'></i>Kinh nghiệm</label>
                                    <select name="yearExperiences" onChange={(e) => setYearExperiences(e.target.value)} >
                                        {/* <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option> */}
                                        {exp.map((year) => {
                                            return (
                                                <option value={year+1}>{year+1}</option>
                                            )
                                        })}
                                    </select>
                                    <span className="ml-2">năm</span>
                                </div>
                            </div>
                            <div className="image-upload">
                                <div className='edit-image-source'>
                                    <div className="alert alert-info image">
                                        <img src={previewID} alt="image-music" className="img img-fluid "></img>
                                        <label className="btn btn-outline-primary btn-light btn-block m-2">
                                            IdImage
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
                                    <div className="alert alert-info image">
                                        <img src={previewDeg} alt="image-music" className="img img-fluid "></img>
                                        <label className="btn btn-outline-primary btn-light btn-block m-2">
                                            DeImage
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