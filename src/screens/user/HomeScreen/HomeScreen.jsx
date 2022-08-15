import { useState, useEffect } from "react"
import "./HomeScreen.scss"
import SmallCard from "../../../components/cards/SmallCard"
import lawyers from "../../../data"
import SearchBar from "../../../components/SearchBar/SearchBar"
import LawyerAdminAction from "../../../redux/actions/LawyerAdminAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Widget, addResponseMessage, setQuickButtons } from 'react-chat-widget';
import axios from "axios";
import 'react-chat-widget/lib/styles.css';
import logo from './logo.png';
import majorData from "../../../majorData"
import $ from 'jquery';
import jQuery from "jquery"

const HomeScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listLawyers, setListLawyers] = useState([]);
    const [loading, setLoading] = useState(false);
    const buttons = [{label: 'Giá cả', value: '1'}, {label: 'Luật sư', value: '2'}];
    const repMess = ["Bạn đang có vấn đề gì", "Bạn muốn tìm luật sư nào"];
    const [myMess, setMyMess] = useState('0');
    const [province, setProvince] = useState([]);

    useEffect(() => {
        if(myMess == '0'){
            addResponseMessage("Bạn đang cần chúng tôi giúp đỡ");
        } else if(myMess == '1'){
            addResponseMessage("Bạn đang băn khoăn về giá cả");
        } else if(myMess == '2'){
            addResponseMessage("Bạn muốn tìm luật sư nào");
        }
        setQuickButtons(buttons);
    }, [loading]);
    
    const handleNewUserMessage = (data) => {
        console.log(`New message incoming! ${data}`);
        
        // Now send the message throught the backend API
    };

    useEffect(() => {
        handleNewUserMessage(myMess); 
    }, [myMess]);

    const handleQuickButtonClicked = data => {
        console.log(data);
        //setQuickButtons(buttons.filter(button => button.value !== data));
        setMyMess(data)
        setLoading(!loading);
    };

    const getListLawyer = async () => {
        const response = await dispatch(await LawyerAdminAction.asyncGetLawyer(2, {"majorField": "","address": ""}));
        console.log(response);
        if(response.status === 201) {
            await setListLawyers(response.data);
        }
    }

    useEffect(() => {
        getListLawyer();
    }, [])

    const getProvince = async () => {
        const response = await axios({
            method: 'get',
            url: `https://provinces.open-api.vn/api/`
        });
        if(response.status == 200) {
            setProvince(response.data);
        }
    }

    useEffect(() => {
        getProvince();
    }, [])

    //console.log(province);


    // $(function () {
    //     $('.container-home').slick({
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 2000,
    //     });
    // });


    

    // const loadAllhotels = async () => {
    //     let res = await allHotels();
    //     setHotels(res.data);
    // }; 
    return (
        <div className="whole">
            <div className="background_image">
                {/* <div className="container_0">
                    <div className="container_2">
                        <div className="container_3">
                            <div className="find_law">
                                <a href="#">TÌM LUẬT SƯ</a>
                            </div>
                        </div>
                    </div>
                    <div className="select_lawyer">
                        <form className="simple_form">
                            <div className="selection">
                                <div className="province_lawyer">
                                    <select defaultValue=" " className="province_select" placeholder="Tất cả tỉnh thành">
                                        <option defaultValue="All">Tất cả tỉnh thành</option>
                                        {
                                            province.map((p) => {
                                                return (
                                                    <option value={`${p.name}`}>{p.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="major_lawyer">
                                    <select defaultValue=" " className="major_select" placeholder="Tất cả tỉnh thành">
                                        <option defaultValue="All">Tất cả lĩnh vực</option>
                                        {
                                            majorData.map((m) => {
                                                return (
                                                    <option value={`${m.value}`}>{m.value}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button className="find">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                </div> */}
            </div>

            <div className="text-center">
                <h1 className="title">Các luật sư của chúng tôi</h1>
            </div>
            {/* <div className="col">
                <br />
                <SearchBar />
            </div> */}
            <main className="grid">
                {listLawyers.slice(0,3).map( (lawyer) => 
                    <SmallCard lawyer={lawyer} />
                )}
                <buttons className="seemore" onClick={() => navigate("./major")}>Xem thêm</buttons>
            </main>
            <div className="decor">
                <div className="decor-text">
                    <h2>VLAW-CỔNG THÔNG TIN TÌM KIẾM LUẬT SƯ TRỰC TUYẾN HÀNG ĐẦU TẠI VIỆT NAM</h2>
                    <div>Giúp bạn dễ dàng tìm kiếm và lựa chọn Luật sư phù hợp với đầy đủ thông tin chính xác và cập nhật.</div>
                </div>
                <div className="decor-card">
                    <div className="card1">
                        <div className="card1-icon">
                            <span class="fas fa-users"></span>
                        </div>
                        <div className="card1-text">
                            <h3>+5,000 Luật sư trên toàn quốc</h3>
                        </div>
                    </div>
                    <div className="card1">
                        <div className="card1-icon">
                            <span class="fas fa-question-circle"></span>
                        </div>
                        <div className="card1-text">
                            <h3>+30,000 Câu hỏi tư vấn pháp luật</h3>
                        </div>
                    </div>
                        <div className="card1">
                        <div className="card1-icon">
                            <span class="fab fa-wpforms"></span>
                        </div>
                        <div className="card1-text">
                            <h3>+5,000 Biểu mẫu pháp lý</h3>
                        </div>
                    </div>
                    <div className="card1">
                        <div className="card1-icon">
                            <span class="fas fa-info-circle"></span>
                        </div>
                        <div className="card1-text">                            
                            <h3>+1,500 Thông tin hướng dẫn pháp luật</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="decor-image">
                <div>
                    <h2>We fight. You win.</h2>
                    <p>Với hơn một chục luật sư và nhiều thập kỷ kinh nghiệm, kiến ​​thức của chúng tôi giúp mang lại nhiều trường hợp thắng hơn, tỷ lệ dàn xếp cao hơn và khách hàng hạnh phúc hơn. Luật sư có thể đưa ra hoặc phá vỡ một vụ việc dựa trên cách thức vụ việc được lập hồ sơ, phát triển và định vị cho các công ty bảo hiểm và bồi thẩm đoàn - chúng tôi đảm bảo rằng không có gì bị bỏ sót trong trường hợp của bạn và kết quả của chúng tôi chứng minh điều đó. Không có gì ngạc nhiên khi VLaw lọt vào danh sách 100 luật sư về chấn thương cá nhân hàng đầu trên toàn quốc vào năm 2020.</p>
                </div>
            </div>
            {/* <Widget
                handleNewUserMessage={handleNewUserMessage}
                handleQuickButtonClicked={handleQuickButtonClicked}
                profileAvatar={logo}
                title="Văn phòng tư vấn"
                subtitle="Bạn đang cần giúp đỡ"
                chatId="1"
            /> */}
       </div>
    )
}


export default HomeScreen;