let lawyers = [
    {
        id: 0,
        img: "Cap USD.jpg",
        name: "Nguyễn Quang Trung",
        ratings: 5,
        ratesScore: 9.8,
        phoneNumber: "0862 667 736",
        majorFields: ["Bảo hiểm", "Dân sự", "Đất đai", "Hình sự", "Doanh nghiệp"],
        description: "Luật sư Nguyễn Quang Trung là Giám đốc - thành viên sáng lập hãng luật TLT Legal."
    },
    {
        id: 1,
        img: "wanda.jpg",
        name: "Trịnh Thị Hạnh",
        ratings: 5,
        ratesScore: 9.4,
        phoneNumber: "0931 927 636",
        majorFields: ["Hôn nhân","Gia đình", "Bảo hiểm", "Dân sự", "Đất đai", "Doanh nghiệp"],
        description: "Luật sư Trịnh Thị Hạnh tốt nghiệp trường Đại học Luật Hà Nội, hiện là Giám đốc điều hành của Công ty luật Hạnh Minh - Đoàn Luật sư TP.HCM."
    },
    {
        id: 2,
        img: "Dr Strange.jpg",
        name: "Nguyễn Thành Tựu",
        ratings: 5,
        ratesScore: 9.4,
        phoneNumber: "0919 195 939",
        majorFields: ["Thuế", "Sở hữu trí tuệ", "Doanh nghiệp"],
        description: "Luật sư Nguyễn Thành Tựu là Thành viên sáng lập và Luật sư điều hành tại NVCS Law firm với hơn 60 Luật sư và Cộng sự."
    },
    {
        id: 3,
        img: "Iron Man.jpg",
        name: "Đoàn Văn Nên",
        ratings: 5,
        ratesScore: 9.7,
        phoneNumber: "0903 328 166",
        majorFields: ["Đất đai", "Dân sự", "Doanh nghiệp", "Hình sự", "Thừa kế - Di chúc"],
        description: "Luật sư Đoàn Văn Nên hiện đang là Luật sư thuộc Đoàn Luật sư thành phố Hồ Chí Minh. Với hơn 10 năm kinh nghiệm hành nghề, Luật sư Đoàn Văn Nên đã hỗ trợ thành công nhiều vụ việc cho khách hàng là cá nhân và doanh nghiệp. Luật sư có kinh nghiệm chuyên môn trong các lĩnh vực như Dân sự, Hình sự, Hành chính, Hôn nhân Gia đình, Nhà đất - Xây dựng, Hộ tịch - Tư pháp, Di chúc - Thừa kế, Lao động - Bảo hiểm xã hội... "
    },
    {
        id: 4,
        img: "maw.jpg",
        name: "Nguyễn Thanh Thanh",
        ratings: 5,
        ratesScore: 9.5,
        phoneNumber: "0903 805 552",
        majorFields: ["Hình sự", "Đất đai", "Dân sự", "Doanh nghiệp", "Hôn nhân gia đình"],
        description: "Luật sư Nguyễn Thanh Thanh có hơn 12 năm kinh nghiệm trong lĩnh vực pháp lý ở nhiều lĩnh vực khác nhau: Tranh tụng, Hình sự, Hành chính, Đất đai, Lao động, Kinh doanh, Thương mại."
    },
    {
        id: 5,
        img: "midnight.jpg",
        name: "Dương Hoài Vân",
        ratings: 5,
        ratesScore: 9.6,
        phoneNumber: "0984 499 996",
        majorFields: ["Hình sự", "Đất đai", "Dân sự", "Doanh nghiệp", "Thừa kế - Di chúc"],
        description: "Luật sư Dương Hoài Vân hiện tại đang giữ chức vụ Giám đốc của Công ty Luật TNHH Một thành viên Vân Hoàng Minh tại Thành phố Hồ Chí Minh."
    },
    {
        id: 6,
        img: "nhen.jpg",
        name: "Nguyễn Hồng Quân",
        ratings: 5,
        ratesScore: 9.7,
        phoneNumber: "0829 678 999",
        majorFields: ["Hình sự", "Đất đai"],
        description: "Luật sư Nguyễn Hồng Quân hiện là Giám Đốc Điều Hành công ty Luật Trung Quân, Đoàn Luật Sư thành phố Hà Nội."
    },
    {
        id: 7,
        img: "thanos.jpg",
        name: "Nguyễn Cao Trí",
        ratings: 5,
        ratesScore: 9.3,
        phoneNumber: "0909 058 983",
        majorFields: ["Dân sự", "Đất đai", "Thừa kế - Di chúc", "Hôn nhân gia đình", "Hình sự"],
        description: "Luật sư Nguyễn Cao Trí là luật sư sáng lập Công ty Luật TNHH Sài Gòn Chí Nhân, thuộc Đoàn luật sư TP.Hồ Chí Minh."
    },
    {
        id: 8,
        img: "Thor.jpg",
        name: "Huỳnh Đức Hữu",
        ratings: 5,
        ratesScore: 9.4,
        phoneNumber: "0919 272 727",
        majorFields: ["Dân sự", "Đất đai", "Thừa kế - Di chúc", "Hôn nhân gia đình"],
        description: "Luật sư Huỳnh Đức Hữu hiện đang là thành viên của Đoàn Luật sư thành phố Hồ Chí Minh, Hội luật gia Việt Nam."
    },
    {
        id: 9,
        img: "thorragnaronkimagehulk.jpg",
        name: "Đinh Văn Quế",
        ratings: 5,
        ratesScore: 9.5,
        phoneNumber: "0287 300 2686",
        majorFields: ["Hình sự"],
        description: "Thạc sĩ-Luật sư Đinh Văn Quế, sinh năm Canh Dần (1950); hiện là Ủy viên Ban Thường vụ Liên đoàn luật sư Việt Nam; nguyên Thành viên Hội đồng thẩm phán, Chánh Tòa hình sự Tòa án nhân dân tối cao, Cố vấn pháp luật của UBND tỉnh Bà Rịa-Vũng Tàu."
    }
]

export default lawyers;