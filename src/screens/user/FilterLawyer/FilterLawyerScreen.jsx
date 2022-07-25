import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import majorData from "../../../majorData"
import LawyerAdminAction from "../../../redux/actions/LawyerAdminAction";
import RowCard from "../../../components/cards/RowCard";
import convert from "../../../core/utils/majorConvert";
import "./style.scss"
import { useParams } from "react-router-dom";
import reconvert from "../../../core/utils/majorReconvert";

const FilterLawyer = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const [province, setProvince] = useState([]);
    const [listLawyers, setListLawyers] = useState([]);
    const [majorChoice, setMajorChoice] = useState("");
    const [addressChoice, setAddressChoice] = useState("");

    const getListLawyer = async () => {
        const response = await dispatch(await LawyerAdminAction.asyncGetLawyer(2, {"majorFields": params.majorId, "address": ""}));
        console.log(response);
        if(response.status === 201) {
            await setListLawyers(response.data);
        }
    }

    useEffect(() => {
        getListLawyer();
    }, [params.majorId])

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

    const handleFilterLawyer = async () => {
        const response = await dispatch(await LawyerAdminAction.asyncGetLawyer(2, {"majorFields": reconvert(majorChoice), "address": addressChoice}));
        console.log(response);
        if(response.status === 201) {
            await setListLawyers(response.data);
        }
    }

    console.log(listLawyers);

    return (
        <div>
            <div className="padding">
                <strong>Các luật sư của chúng tôi</strong>
                <p>Justice delayed is justice denied.</p>
                <span>William E. Gladstone</span>
            </div>
            <div className="filter-container">
                <h1>Luật sư lĩnh vực {convert(params.majorId).toLowerCase()} tại tất cả tỉnh thành</h1>
                <div className="filter-content">
                    <div className="filter-sidebar">
                        <div className="major_lawyer">
                            <select defaultValue=" " className="major_select" onChange={(e) => setMajorChoice(e.target.value)} placeholder="Tất cả tỉnh thành">
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
                        <div className="province_lawyer">
                            <select defaultValue=" " className="province_select"  onChange={(e) => setAddressChoice(e.target.value)} placeholder="Tất cả tỉnh thành">
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
                        <div className="apply-filter">
                            <button onClick={handleFilterLawyer}>Tim kiem</button>
                        </div>
                        <p>Bạn muốn tìm luật sư / văn phòng luật sư / công ty luật tư vấn pháp lý luật Giỏi – Uy Tín tại Tất cả quận huyện Toàn quốc. iLAW có Danh sách luật sư nổi tiếng và đầy kinh nghiệm chuyên tư vấn luật Bảo hiểm. Hỗ trợ tư vấn cho bạn về bảo hiểm xã hội, bảo hiểm y tế, bảo hiểm thất nghiệp, bảo hiểm tài sản, bảo hiểm cháy nổ, bảo hiềm hàng hoá trên đường vận chuyển bằng đường bộ, đường biển, hàng không, bảo hiểm phương tiện cơ giới, tàu và máy bay, bảo hiểm trách nhiệm và các loại bảo hiểm nhân thọ. Các Luật sư bảo hiểm cũng tư vấn cho bạn giải quyết các tranh chấp bảo hiểm hoặc đại diện tranh tụng để bảo vệ quyền và lợi ích hợp pháp cho bạn.

</p>
                    </div>
                    {
                    listLawyers.length > 0 ?
                    <div className="filter-lawyer">
                        {listLawyers.map((lawyer) =>
                            <RowCard lawyer={lawyer} />
                        )}
                    </div>
                    :
                    <div className="filter-lawyer1"><strong>Không tìm thấy luật sư nào thỏa mãn</strong></div>
                        }
                </div>
            </div>
        </div>
    )
}

export default FilterLawyer;