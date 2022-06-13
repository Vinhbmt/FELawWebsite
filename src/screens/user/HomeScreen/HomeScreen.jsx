import { useState, useEffect } from "react"
import "./HomeScreen.scss"
import SmallCard from "../../../components/cards/SmallCard"
import lawyers from "../../../data"
import SearchBar from "../../../components/SearchBar/SearchBar"

const HomeScreen = () => {
    const [lawyer, setLawyer] = useState([])

    useEffect(() => {
        setLawyer(lawyers);
    }, [])

    // const loadAllhotels = async () => {
    //     let res = await allHotels();
    //     setHotels(res.data);
    // }; 
    return (
        <>
            <div className="background_image">
                <div className="container">
                    <div className="container_2">
                        <div className="container_1">
                            <h1 className="u-text-color-navy hero-heading text-center hidden-xs">
                                Cùng bạn chia sẻ mọi vấn đề về pháp luật
                            </h1>
                        </div>
                        <div className="container_3">
                            <div className="find_law">
                                <a href="#">Tìm Luật sư</a>
                            </div>
                        </div>
                    </div>
                    <div className="select_lawyer">
                        <form className="simple_form">
                            <div className="selection">
                                <div className="province_lawyer">
                                    <select defaultValue=" " className="province_select" placeholder="Tất cả tỉnh thành">
                                        <option defaultValue="All">Tất cả tỉnh thành</option>
                                        <option value="hcm">HCM</option>
                                        <option value="hn">HN</option>
                                    </select>
                                </div>
                                <div className="major_lawyer">
                                    <select defaultValue=" " className="major_select" placeholder="Tất cả tỉnh thành">
                                        <option defaultValue="All">Tất cả lĩnh vực</option>
                                        <option value="hcm">HCM</option>
                                        <option value="hn">HN</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button className="find">Tìm kiếm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <h1 className="title">All Lawyers</h1>
            </div>
            {/* <div className="col">
                <br />
                <SearchBar />
            </div> */}
            <main class="grid">
                {lawyer.map( (lawyer) => 
                    <SmallCard key={lawyer.id} lawyer={lawyer} />
                )}
            </main>
       </>
    )
}


export default HomeScreen;