const MeetingStatus = {
    PENDING :0,
    APPROVED : 1,
    PAID : 2,
    FINISHED : 3,
    NOT_APPROVED : 4,
    NOT_FINISHED : 5,

    codeToStatus : {
        0: "Đang chờ",
        1: "Đã phê duyệt",
        2: "Đã thanh toán",
        3: "Đã hoàn thành",
        4: "Không phê duyệt",
        5: "Không hoàn thành"
    }
  }
  
export default MeetingStatus;