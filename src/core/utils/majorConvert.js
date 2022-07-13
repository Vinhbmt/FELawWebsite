const convert = (code) => {
    switch (code) {
        case "LV01":
            return "Bảo hiểm";
            break;
            
        case "LV02":
            return "Dân sự";
            break;
        
        case "LV03":
            return "Đất đai";
            break;

        case "LV04":
            return "Doanh nghiệp";
            break;

        case "LV05":
            return "Giao thông vận tải";
            break;

        case "LV06":
            return "Hành chính";
            break;

        case "LV07":
            return "Hình sự";
            break;

        case "LV08":
            return "Hôn nhân gia đình";
            break;

        case "LV09":
            return "Lao động";
            break;

        case "LV10":
            return "Sở hữu trí tuệ";
            break;

        case "LV11":
            return "Thừa kế đất đai";
            break;

        case "LV12":
            return "Thuế";
            break;
    }
}

export default convert;