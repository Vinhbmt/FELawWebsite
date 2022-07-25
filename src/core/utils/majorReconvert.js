const reconvert = (code) => {
    switch (code) {
        case "Bảo hiểm":
            return "LV01";
            break;
            
        case "Dân sự":
            return "LV02";
            break;
        
        case "Đất đai":
            return "LV03";
            break;

        case "Doanh nghiệp":
            return "LV04";
            break;

        case "Giao thông vận tải":
            return "LV05";
            break;

        case "Hành chính":
            return "LV06";
            break;

        case "Hình sự":
            return "LV07";
            break;

        case "Hôn nhân gia đình":
            return "LV08";
            break;

        case "Lao động":
            return "LV09";
            break;

        case "Sở hữu trí tuệ":
            return "LV10";
            break;

        case "Thừa kế đất đai":
            return "LV11";
            break;

        case "Thuế":
            return "LV12";
            break;
    }
}

export default reconvert;