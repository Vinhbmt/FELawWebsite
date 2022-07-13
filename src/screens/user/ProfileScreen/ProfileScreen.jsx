import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss"
import AccountUserAction from "../../../redux/actions/AccountUserAction";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listMeeting, setListMeeting] = useState([])


    const getListMeeting = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetAppointment(0))
        if(response.status === 200) {
            await setListMeeting(response.data);
        }
    }

    useEffect(() => {
        getListMeeting();
    }, [])

    console.log(listMeeting)

    return (
        <div className="profile-container">
            <div className="padding1">
                <strong>Trang cá nhân người dùng</strong>
            </div>
            <div class="table-users">
                <div class="header-profile">Users</div>

                <table cellspacing="0">
                    <tr className="title-table">
                        <th>Luật sư</th>
                        <th>Email</th>
                        <th>Ngày</th>
                        <th>Giờ</th>
                        <th>Trạng thái</th>
                    </tr>

                    <tr>
                        <td>Lương</td>
                        <td>manhluong135@gmail.com</td>
                        <td>25/06/2022</td>
                        <td>8:00-10:00</td>
                        <td>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </td>
                    </tr>

                    <tr>
                        <td><img src="https://i.picsum.photos/id/1027/100/100.jpg" alt="" /></td>
                        <td>John Doe</td>
                        <td>john.doe@foo.com</td>
                        <td>01 800 2000</td>
                        <td>Blanditiis, aliquid numquam iure voluptatibus ut maiores explicabo ducimus neque, nesciunt rerum perferendis, inventore.</td>
                    </tr>

                    <tr>
                        <td><img src="https://i.picsum.photos/id/64/100/100.jpg" alt="" /></td>
                        <td>Jane Smith</td>
                        <td>jane.smith@foo.com</td>
                        <td>01 800 2000</td>
                        <td> Culpa praesentium unde pariatur fugit eos recusandae voluptas.</td>
                    </tr>

                    <tr>
                        <td><img src="https://i.picsum.photos/id/1025/100/100.jpg" alt="" /></td>
                        <td>John Smith</td>
                        <td>john.smith@foo.com</td>
                        <td>01 800 2000</td>
                        <td>Aut voluptatum accusantium, eveniet, sapiente quaerat adipisci consequatur maxime temporibus quas, dolorem impedit.</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default ProfileScreen;