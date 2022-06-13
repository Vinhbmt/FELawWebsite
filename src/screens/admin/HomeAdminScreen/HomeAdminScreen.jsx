import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import './style.scss';
import Chart from 'react-apexcharts'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AuthAction from "../../../redux/actions/AuthAction";

const HomeAdminScreen = () => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    // const dispatch = useDispatch();
    // const navigate = useNavigate();

    // const { authState: { accountInfo } } = useSelector(state => {
    //     return { authState: state.authState };
    // })

    // const asyncGetAccountInfo = async () => {
    //     const response = await dispatch(await AuthAction.asyncGetAccountInfo("admin"));
    //     if(!response) {
    //         navigate('/admin/login');
    //     }
    // }

    // useEffect(async () => {
    //     asyncGetAccountInfo();
    // }, [])

    const chartOptions = {
        series: [{
            name: 'Online Customers',
            data: [40,70,20,90,36,80,30,91,60]
        }, {
            name: 'Store Customers',
            data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10]
        }],
        options: {
            color: ['#6ab04c', '#b92959'],
            chart: {
                background: 'transparent'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            }
        }
    }

    return (
        <div className={classnames("admin-page", "info-admin-page")}>
            <h1>Chào mừng đến với trang quản trị web luật sư</h1>
            <div>
                {/* <img src={accountInfo.avatar} alt="avatar"></img> */}
                <div className="col-6">
                    <div className="chart">
                        {/* chart */}
                        <Chart
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
                <div className="info-admin">
                    <div>
                        <span>Tên</span>
                        <span>Vinh</span>
                    </div>
                    <div>
                        <span>Email</span>
                        <span>congvinhnguyen9123@gmail.com</span>
                    </div>
                    <div>
                        <span>Địa chỉ</span>
                        <span>Không có</span>
                    </div>
                    <div>
                        <span>Quốc gia</span>
                        <span>Không có</span>
                    </div>
                    <div>
                        <span>Vai trò</span>
                        <span>Admin</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeAdminScreen;
