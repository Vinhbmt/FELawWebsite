import './style.scss';

const FooterUser = () => {

    return (
        <footer className="footer-dark">
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-md-3 item">
                        <h3>Services</h3>
                        <ul>                           
                            <li><a href="#">User</a></li>
                            <li><a href="#">Lawyer</a></li>
                            <li><a href="#">Review Rule</a></li>
                        </ul>
                    </div>
                    <div className="col-sm-6 col-md-3 item">
                        <h3>About</h3>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Terms</a></li>
                            <li><a href="#">Security Policy</a></li>
                        </ul>
                    </div>
                    <div className="col-md-6 item text">
                        <h3>VLaw</h3>
                        <p>VLAW chỉ cung cấp thông tin và nền tảng công nghệ để bạn sử dụng thông tin đó. Chúng tôi không phải là công ty luật và không cung cấp dịch vụ pháp lý. Bạn nên tham vấn ý kiến Luật sư cho vấn đề pháp lý mà bạn đang cần giải quyết. Vui lòng tham khảo Điều khoản sử dụng và Chính sách bảo mật khi sử dụng website.</p>
                    </div>
                    <div className="col item social"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a></div>
                </div>
                <p className="copyright">VLaw © 2018</p>
            </div>
        </footer>
    )

}

export default FooterUser;