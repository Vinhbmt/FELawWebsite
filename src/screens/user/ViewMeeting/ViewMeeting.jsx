import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import AccountUserAction from "../../../redux/actions/AccountUserAction";
import { Modal } from "react-bootstrap";
import "./style.scss";
import { toast } from "react-toastify";
import { SocketContext } from "../../../core/config/socket.config";
import LawyerAction from "../../../redux/actions/LawyerAction";

const ViewMeetingUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [paymentContent, setPaymentContent] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    authState: { accountInfo, token },
  } = useSelector((state) => {
    return { authState: state.authState };
  });
  const { socket, callUser, setName } = useContext(SocketContext);

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("-");
  }

  function formatTime(time) {
    switch (time) {
      case 1:
        return "8:00-10:00";
      case 2:
        return "10:00-12:00";
      case 3:
        return "13:00-15:00";
      case 4:
        return "15:00-17:00";
      case 5:
        return "17:00-19:00";
    }
  }

  const getAppointment = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncGetAppointment(params.meetingId)
    );
    console.log(response);
    if (response.status == 200) {
      setMeetingInfo(response.data);
      setName(response.data.userId.lastName);
    }
  };

  useEffect(() => {
    getAppointment();
    setLoading(false);
  }, [loading]);

  //view and approve lawyer
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  //const [ pendingLawyer, setPendingLawyer ] = useState(null);

  const handleViewPayment = () => {
    setShowPaymentModal(true);
  };
  const handleCloseViewPayment = () => {
    setShowPaymentModal(false);
  };

  socket.on("notification", () => {
    setLoading(true);
  });

  const handlePayment = async () => {
    const response = await dispatch(
      await AccountUserAction.asyncProcessPayment({
        destination: meetingInfo.lawyerId._id,
        meetingId: meetingInfo._id,
        amount: meetingInfo.price,
        description: paymentContent,
      })
    );
    console.log(response);
    if (response.status == 201 && response.data.isSuccess == true) {
      socket.emit("notification", {
        userId: meetingInfo.lawyerId._id,
        content: `${
          meetingInfo.userId.firstName + " " + meetingInfo.userId.lastName
        } ???? thanh to??n cu???c h???n`,
        url: `http://localhost:3000/lawyer/appointment/${meetingInfo._id}`,
      });
      handleCloseViewPayment();
      toast.success("Thanh to??n th??nh c??ng");
      setLoading(true);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleUpdateDoneMeeting = async () => {
    const response = await dispatch(
      await LawyerAction.asyncUpdateAppointment({
        meetingId: meetingInfo._id,
        status: 3,
        price: meetingInfo.price,
      })
    );
    console.log(response);
    if (response.status == 200) {
      socket.emit("notification", {
        userId: meetingInfo.lawyerId._id,
        content: `${
          meetingInfo.userId.firstName + " " + meetingInfo.userId.lastName
        } ???? ho??n th??nh cu???c h???n`,
        url: `http://localhost:3000/lawyer/appointment/${meetingInfo._id}`,
      });
      toast.success("B???n ???? ho??n th??nh cu???c h???n!");
      setLoading(true);
    } else {
      toast.error(response.data.message);
    }
  };

  const handleCallVideo = () => {
    navigate(`/videocall/${meetingInfo._id}`);

    callUser(
      meetingInfo.lawyerId.socketId,
      meetingInfo.userId.socketId,
      meetingInfo._id
    );
  };

  return (
    meetingInfo != null && (
      <>
        <div className="padding2"></div>
        <div>
          <div className="processing">
            <div className="processing1">
              <div
                className={
                  meetingInfo.status == 0 ? "processing0" : "processing2"
                }
              >
                <i class="fa fa-recycle"></i>
              </div>
              {meetingInfo.status == 0 ? (
                <div>Ch??? x??c nh???n</div>
              ) : (
                <div>???? x??c nh???n</div>
              )}
            </div>
            <i class="fas fa-arrow-right"></i>
            <div className="processing1">
              <div
                className={
                  meetingInfo.status < 2 ? "processing0" : "processing2"
                }
              >
                <i class="fa fa-dollar"></i>
              </div>
              {meetingInfo.status < 2 ? (
                <div>Ch??? thanh to??n</div>
              ) : (
                <div>???? thanh to??n</div>
              )}
            </div>
            {/* <i class='fas fa-arrow-right'></i>
                    <div className="processing1">
                        <div className={meetingInfo.status < 3 ? "processing0" : "processing2"}><i class="fa fa-comments"></i></div>
                        <div>??ang trao ?????i</div>
                    </div> */}
            <i class="fas fa-arrow-right"></i>
            <div className="processing1">
              <div
                className={
                  meetingInfo.status < 3 ? "processing0" : "processing2"
                }
              >
                <i class="fa fa-check-circle"></i>
              </div>
              {meetingInfo.status < 3 ? (
                <div>Ch??a ho??n th??nh</div>
              ) : (
                <div>???? ho??n th??nh</div>
              )}
            </div>
          </div>
        </div>
        <div className="detail-meeting-container">
          <div className="detail-meeting-title">
            Th??ng tin chi ti???t cu???c h???n
          </div>
          <div className="detail-meeting">
            <div
              className="detail-meeting-image"
              onClick={() => navigate(`/lawyer/${meetingInfo.lawyerId._id}`)}
            >
              <img src={meetingInfo.lawyerId.imgUrl} alt="lawyerName" />
            </div>
            <div className="detail-meeting-info">
              <div className="detail-meeting-info1">
                <label>T??n lu???t s??: </label>
                <div
                  onClick={() =>
                    navigate(`/lawyer/${meetingInfo.lawyerId._id}`)
                  }
                >
                  {meetingInfo.lawyerId.firstName +
                    " " +
                    meetingInfo.lawyerId.lastName}
                </div>
              </div>
              <div className="detail-meeting-info1">
                <label>Th???i gian: </label>
                <div>{formatTime(meetingInfo.timeCode)}</div>
              </div>
              <div className="detail-meeting-info1">
                <label>Ng??y: </label>
                <div>{formatDate(meetingInfo.meetingDate)}</div>
              </div>
              {meetingInfo.status == 2 && (
                <>
                  <div className="video-call">
                    <i onClick={handleCallVideo} class="fas fa-video"></i>
                  </div>
                  <div className="detail-meeting-info12">
                    <button
                      className="btn-success"
                      onClick={handleUpdateDoneMeeting}
                    >
                      ????nh d???u l?? ho??n th??nh
                    </button>
                  </div>
                  <div className="detail-meeting-info1">
                    <button className="btn-danger">B??o c??o cu???c h???n</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {meetingInfo.status == 0 && (
          <div className="meeting-status">??ang ch??? lu???t s?? x??c nh???n...</div>
        )}
        {meetingInfo.status == 1 && (
          <div className="meeting-status">
            <button className="meeting-status-btn" onClick={handleViewPayment}>
              Thanh to??n
            </button>
          </div>
        )}
        {meetingInfo.status == 2 && (
          <div className="meeting-status">
            ???? thanh to??n cu???c h???n
            <img src="https://img.icons8.com/office/16/000000/checked--v1.png" />
          </div>
        )}

        <Modal
          show={showPaymentModal}
          enforceFocus={false}
          className="modal-min modal-alert"
        >
          <Modal.Header>
            <Modal.Title>Thanh to??n</Modal.Title>
            <button
              className="btn btn-light"
              onClick={handleCloseViewPayment}
            ></button>
          </Modal.Header>
          <Modal.Body>
            <div className="payment-body">
              <div className="payment-body1">
                <div>T???i lu???t s??: </div>
                <span>
                  {meetingInfo.lawyerId.firstName +
                    " " +
                    meetingInfo.lawyerId.lastName}
                </span>
              </div>
              <div className="payment-body1">
                <div>S??? ti???n: </div>
                <span>{meetingInfo.price}</span>
              </div>
              <div>
                <div>N???i dung chuy???n kho???n: </div>
                <input onChange={(e) => setPaymentContent(e.target.value)} />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-success" onClick={handlePayment}>
              Thanh to??n
            </button>
            <button
              className="btn btn-default"
              onClick={handleCloseViewPayment}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default ViewMeetingUser;
