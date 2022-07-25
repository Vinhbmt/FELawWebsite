import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss"
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import AuthAction from "../../../redux/actions/AuthAction";
import Moment from 'react-moment';
import moment from 'moment';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [listPayment, setListPayment] = useState([])
    const {
        authState: { accountInfo },
      } = useSelector((state) => {
        return { authState: state.authState };
      });
    
      const asyncGetAccountInfo = async () => {
        const response = await dispatch(await AuthAction.asyncGetAccountInfo("user"));
        if(!response) {
          navigate('/login');
        }
      };
    
      useEffect(() => {
        asyncGetAccountInfo();
      }, []);

      function getCashString(amount) {
        if (!amount) {
            return '-'
        }
        const split = `${Math.abs(amount)}`.split('')
        const arrayLength = split.length
    
        if (arrayLength <= 3) {
            return `${amount}`
        }
        const numberOfComma = Math.floor((arrayLength - 1) / 3)
    
        for (let i = 1; i <= numberOfComma; i++) {
            split.splice(arrayLength - 3 * i, 0, ',')
        }
        amount < 0 && (split.unshift('-'))
        return split.join('')
        }

    const getListPayment = async () => {
        const response = await dispatch(await AccountUserAction.asyncGetPayment());
        if(response.status == 200) {
            setListPayment(response.data);
        }
    }

    useEffect(() => {
        getListPayment();
    }, [])

    console.log(listPayment);

    return (
        <div className="profile-container">
            <div className="padding1">
                <strong>Trang cá nhân người dùng</strong>
            </div>
            <div className="profile-user">
                <div className="user-wallet">
                    <div className="user-wallet-container">
                        <div className="charge">Số dư khả dụng</div>
                        <div className="wallet"><i className='fas  fa-wallet'></i>{` ${getCashString(accountInfo.balance)} VND`}</div>
                    </div>
                </div>
                {/* <div className="list-appoinment">

                </div> */}
                <div className="container5">
                    <h2>Lịch sử giao dịch</h2>
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="payment-id">Mã thanh toán</div>
                            <div className="customer-name">Tài khoản nhận</div>
                            <div className="amount-due">Số tiền</div>
                            <div className="payment-time">Thời gian</div>
                            <div className="payment-descrip">Nội dung</div>
                        </li>
                        {listPayment.length > 0 &&
                            listPayment.map((p) => {
                                return (
                                    <li class="table-row">
                                        <div class="payment-id" data-label="Job Id">{p._id}</div>
                                        <div class="customer-name" data-label="Customer Name">{p.destination.firstName + " " + p.destination.lastName}</div>
                                        <div class="amount-due" data-label="Amount">{p.amount}</div>
                                        <div class="payment-time" data-label="Time">{moment(p.createdAt).format('h:mm:ss a, DD/MM/YYYY')}</div>
                                        <div class="payment-descrip" data-label="Payment Status">{p.description}</div>
                                    </li>
                                )
                            })
                        }
                        {/* <li class="table-row">
                            <div class="col col-10" data-label="Job Id">42235</div>
                            <div class="col col-20" data-label="Customer Name">John Doe</div>
                            <div class="col col-30" data-label="Amount">$350</div>
                            <div class="col col-40" data-label="Payment Status">Pending</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Job Id">42442</div>
                            <div class="col col-2" data-label="Customer Name">Jennifer Smith</div>
                            <div class="col col-3" data-label="Amount">$220</div>
                            <div class="col col-4" data-label="Payment Status">Pending</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Job Id">42257</div>                         
                            <div class="col col-2" data-label="Customer Name">John Smith</div>
                            <div class="col col-3" data-label="Amount">$341</div>
                            <div class="col col-4" data-label="Payment Status">Pending</div>
                        </li>
                        <li class="table-row">
                            <div class="col col-1" data-label="Job Id">42311</div>
                            <div class="col col-2" data-label="Customer Name">John Carpenter</div>
                            <div class="col col-3" data-label="Amount">$115</div>
                            <div class="col col-4" data-label="Payment Status">Pending</div>
                        </li> */}
                    </ul>
                </div>

            </div>
        </div>
    )
}

export default ProfileScreen;