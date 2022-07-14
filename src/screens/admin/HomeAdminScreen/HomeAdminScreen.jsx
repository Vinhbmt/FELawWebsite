import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import './style.scss';
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AuthAction from "../../../redux/actions/AuthAction";
import Badge from "../../../components/Badge/Badge";
import AccountAdminAction from "../../../redux/actions/AccountAdminAction";

const HomeAdminScreen = () => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    const {authState: { token}} = useSelector (state => {
        return { authState: state.authState };
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listUsers, setListUsers] = useState([]);

    const { authState: { accountInfo } } = useSelector(state => {
        return { authState: state.authState };
    })

    const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo());
        if (!response) {
            navigate('/admin/login');
        }
    }

    useEffect(() => {
        asyncGetAccountInfo();
    }, [])

    const getListUser = async () => {
        const response = await dispatch(await AccountAdminAction.asyncGetUser());
        if(response.status === 200) {
            await setListUsers(response.data);
        }
    }

    useEffect(() => {
        getListUser();
    }, [])

    const chartOptions = {
        series: [
            {
              name: "Khách hàng",
              data: [10, 22, 35, 40, 57, 60, 67, 70, 80, 85, 89, 93]
            },
            {
                name: "Luật sư",
                data: [6, 9, 13, 15, 15, 12, 16, 18, 13, 17, 20, 22]
              }
          ],
          options: {
            chart: {
              type: 'line',
              //id: 'areachart-2'
            },
          xaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ]
          }
        }
    }

    return (
        <div className="admin-page-container">
            <h1>Chào mừng đến với trang quản trị web luật sư</h1>
            
            <div>
                <div className="badge-container">
                    <Badge value={20} title="Meetings" percent={25}/>
                    <Badge value={25} title="Traffics" percent={50}/>
                    <Badge value={30} title="Pageviews" percent={75}/>
                    <Badge value={35} title="Visitors" percent={50}/>
                </div>
                <div className="chart-container">
                    <div className="chart">
                        <h3>Lượng người dùng trong năm</h3>
                        
                    </div>
                    <div className="table-admin-home">
                        <h3>Người dùng gần đây</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Họ</th>
                                    <th>Tên</th>
                                </tr>
                            </thead>
                            {listUsers.length > 0 ?
                                <tbody>
                                    {listUsers.map((user, index) => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.email}</td>
                                                <td>{user.firstName}</td>
                                                <td>{user.lastName}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                                :
                                <tbody>
                                    <tr>
                                        <td colSpan={5}>Không có người dùng</td>
                                    </tr>
                                </tbody>}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAdminScreen;
