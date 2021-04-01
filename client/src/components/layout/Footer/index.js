/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-target-blank */
import Gmaps from "assets/img/ggmaos.JPG"
import ImgLogo from "assets/img/Logo Bạch Dương 1.png";
import React from "react";
import AvatarF1 from "assets/img/ser1_new.png"
import AvatarF2 from "assets/img/ser3_new.png"
import AvatarF3 from "assets/img/service_footer_2.png"
import FontAwesome from "react-fontawesome";
import { Row, Col } from "reactstrap";
import { Link } from "react-scroll";
import {
  FooterBottom,
  BackToTop,
  SocialButton,
  NewFooter,
  FooterService,
} from "./style";

import ProductViewed from "./ProductViewed";

const Footer = () => {
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className="container mt-3">
      <Row>
        <Col xs={12}>
          <ProductViewed />
        </Col>
      </Row>
      {/*<FooterService>
        <div className="service-box">
          <img
            src={AvatarF1}
            style={{ height: 45 }}
          />
          <b>Giao hàng toàn quốc</b>
          <span>
            <i>Thời gian giao từ 3-6 ngày</i>
          </span>
        </div>
        <div className="service-box">
          <img
            src={AvatarF2}
            style={{ height: 45 }}
          />
          <b>Thanh toán dễ dàng</b>
          <span>
            <i>Thanh toán khi nhận hàng</i>
          </span>
        </div>
        <div className="service-box">
          <img
            src={AvatarF3}
            style={{ height: 45 }}
          />
          <b>Đổi và trả hàng</b>
          <span>
            <i>Thời gian đổi trả lên đến 7 ngày</i>
          </span>
        </div>
      </FooterService>*/}

      <NewFooter>
        <div className="row">
          <div className="col-12 col-md-3 company-info">
            <div className="company-info">
              <a href="/" className="logo">
                <img
                  src={ImgLogo}
                  alt="GỐM SỨ BẠCH DƯƠNG"
                />
              </a>
              <b
                style={{
                  fontFamily: "arial",
                  color: "#333",
                  textTransform: "none",
                  marginBottom: 0,
                }}
              >
              </b>
              Địa chỉ: Thôn 1, Giang Cao, Bát Tràng, Hà Nội <br />
              Điện thoại: 0333 869 169 <br />
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="link">
              <div className="title">Thông tin</div>
              <a rel="dofollow" href="/gioi-thieu">
                Giới thiệu
              </a>
              <a rel="dofollow" href="/sitemap" target="_blank">
                Sơ đồ web
              </a>
              <a rel="dofollow" href="/lien-he">
                Liên hệ - hợp tác
              </a>
              <a href="/tai-khoan-ngan-hang.html">Tài khoản ngân hàng</a>
            </div>
          </div>
          <div className="col-12 col-md-3">
            <div className="link">
              <div className="title">Chính sách chung</div>
              <a rel="nofollow" href="/chinh-sach-bao-hanh.html">
                Chính sách bảo hành
              </a>
              <a rel="nofollow" href="/chinh-sach-doi-moi.html">
                Chính sách đổi mới
              </a>
              <a rel="nofollow" href="/chinh-sach-van-chuyen.html">
                Chính sách vận chuyển
              </a>
              <a rel="nofollow" href="/chinh-sach-bao-mat-thong-tin.html">
                Chính sách bảo mật thông tin
              </a>
              <br />
              <div className="title">Hỗ trợ khách hàng</div>
              <a rel="nofollow" href="/mua-hang-online.html">
                Mua hàng Online
              </a>
            </div>
          </div>
          {/*fcol*/}
          <div className="col-12 col-md-3 map">
            <div className="title">Bản đồ</div>
            <a
              href="https://goo.gl/maps/yRDDEijYRZJyyzMf9"
              target="_blank"
            >
              <img
                src= {Gmaps}
                alt="bản đồ"
              />
            </a>
          </div>
          {/*<div className="col-12">
            <div id="footer-social">
              <a
                href="http://online.gov.vn/HomePage/CustomWebsiteDisplay.aspx?DocId=45357"
                target="_blank"
                title="Đã đăng ký bộ công thương"
                style={{
                  maxWidth: 250,
                  width: "auto",
                  position: "absolute",
                  right: 0,
                  right: 18,
                  top: -41,
                }}
              >
                <img
                  className="lazy"
                  src="https://gomsubaokhanh.vn/template/default/images/bct.png"
                  data-original="https://gomsubaokhanh.vn/template/default/images/bct.png"
                  alt
                  style={{ display: "inline" }}
                />
              </a>
               <a href="//www.dmca.com/Protection/Status.aspx?ID=00eef554-a847-4efd-87d4-810396a9d48f" title="DMCA.com Protection Status" class="dmca-badge"> <img src ="https://images.dmca.com/Badges/dmca-badge-w250-5x1-10.png?ID=00eef554-a847-4efd-87d4-810396a9d48f"  alt="DMCA.com Protection Status" /></a>
              <a
                href="https://www.facebook.com/gomsubaokhanh/"
                target="_blank"
                rel="”nofollow”"
              >
                <img
                  src="https://gomsubaokhanh.vn/template/default/images/fb_icon_social_new.png"
                  alt="social"
                />
              </a>
              <a
                href="https://www.youtube.com/channel/UC4HFy73EyfpiZn0moEtGP6Q"
                target="_blank"
                rel="”nofollow”"
              >
                <img
                  src="https://gomsubaokhanh.vn/template/default/images/youtube_icon_social_new.png"
                  alt="social"
                />
              </a>
              <a
                href="https://tiki.vn/cua-hang/gom-bat-trangg"
                target="_blank"
                rel="”nofollow”"
              >
                <img
                  src="https://gomsubaokhanh.vn/template/default/images/tiki_icon_social_new.png"
                  alt="social"
                />
              </a>
              <a
                href="https://www.lazada.vn/shop/gom-su-bao-khanh-bat-trang-/?spm=a2o4n.pdp.seller.1.11253dfcNOn6P5&itemId=279152203&channelSource=pdp"
                target="_blank"
                rel="”nofollow”"
              >
                <img
                  src="https://gomsubaokhanh.vn/template/default/images/lazada_icon_social_new.png"
                  alt="social"
                />
              </a>
              <a
                href="https://www.sendo.vn/shop/gom-su-bao-khanh-bat-trang"
                target="_blank"
                rel="”nofollow”"
              >
                <img
                  src="https://gomsubaokhanh.vn/template/default/images/sendo_icon_social_new.png"
                  alt="social"
                />
              </a>
              <a
                href="https://shopee.vn/gomsubaokhanh"
                target="_blank"
                rel="”nofollow”"
              >
                <img
                  src="https://gomsubaokhanh.vn/template/default/images/shoppe_icon_social_new.png"
                  alt="social"
                />
              </a>
            </div>
              </div>*/}
          {/*footer-social*/}
        </div>
        {/*footer-container*/}
      </NewFooter>

      <FooterBottom className="row footer">
        <div className="col-12 col-md-4 item">
          <FontAwesome name="map-marker" />
          <div>
            <b>CỬA HÀNG</b>
            <br />
            <a
              style={{
                fontSize: "smaller",
              }}
              href="https://www.google.com/maps/place/G%E1%BB%91m+S%E1%BB%A9+B%E1%BA%A3o+Kh%C3%A1nh+-+B%C3%A1t+Tr%C3%A0ng/@20.9734985,105.9121485,18z/data=!4m5!3m4!1s0x3135afe7a0c213c5:0xd21193bac9a85cad!8m2!3d20.9736375!4d105.9131284"
              target="_blank"
            >
              Số 121 Khu Công Nghiệp Làng Nghề Bát Tràng{" "}
              <span
                style={{
                  fontSize: 12,
                  color: "#ffa800",
                }}
              >
                {/*<br></br>[Xem bản đồ]*/}
              </span>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-4 item">
          <FontAwesome name="phone-square" />
          <div className="text">
            <b>
              <a href="tel:0333 869 169">0333 869 169</a> /
              <a href="tel:0857 857 843">0857 857 843</a>
            </b>
          </div>
        </div>
        <div className="col-12 col-md-4 item">
          <FontAwesome name="envelope-o" />
          <div class="text">
            <a href="mailto:gomsubachduong@gmail.com">gomsubachduong@gmail.com</a>
          </div>
        </div>
      </FooterBottom>
      <BackToTop>
        <Link
          title="Lên đầu trang"
          to={`back-to-top`}
          spy={true}
          smooth={true}
          duration={500}
          style={{ display: "block" }}
        >
          <i className="fa fa-angle-up" />
        </Link>
      </BackToTop>

      <SocialButton>
        <div
          className="social-button-content"
          style={{ display: toggle ? "grid" : "none" }}
        >
          <a
            href="http://www.messenger.com/t/gomsubaokhanh"
            target="blank"
            className="mes"
          >
            {/*<i class="fa fa-facebook-square" aria-hidden="true"></i>*/}
            <img
              border={0}
              src="https://gomsubaokhanh.vn/media/lib/messenger.png"
              width={40}
              height={40}
            />
            <span>Nhắn tin Facebook</span>
          </a>
          <a href="http://zalo.me/0901500333" className="zalo">
            {/*<i class="fa fa-commenting-o" aria-hidden="true"></i>*/}
            <img
              border={0}
              src="https://gomsubaokhanh.vn/media/lib/zalo-chat.png"
              width={40}
              height={40}
            />
            <span>Zalo: 0901 500 333</span>
          </a>
        </div>
        <a className="user-support" onClick={() => setToggle(!toggle)}>
          <i className="fa fa-user-circle-o" aria-hidden="true" />
          <div className="animated alo-circle" />
          <div className="animated alo-circle-fill" />
        </a>
      </SocialButton>
    </div>
  );
};

export default React.memo(Footer);
