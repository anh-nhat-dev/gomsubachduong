/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { getComments, comment } from "common/api";
import StarRating from "react-star-ratings";
import { useLocation } from "react-router-dom";
import { TabCommentWrapper } from "./style";
import moment from "moment";
import queryString from "query-string";
import Ava from "assets/img/noavatar.jpg";
import { Link, Element } from "react-scroll";
import Pagination from "components/Pagination";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TabComment = ({ productId = "" }) => {
  const location = useLocation();
  const search = queryString.parse(location.search);

  const [comments, setComments] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { page } = search;

  const [filter, setFiller] = React.useState({
    limit: 10,
    total: 0,
  });

  const [showCommentForm, setShowCommentForm] = React.useState(false);

  const [inputCommnet, setInputComment] = React.useReducer(
    (o, n) => ({ ...o, ...n }),
    {
      rate: 5,
      body: "",
      email: "",
      full_name: "",
    }
  );

  const [replyFor, setReplyFor] = React.useState();

  const handleSendComment = () => {
    comment({
      ...inputCommnet,
      product_id: productId,
      reply_id: replyFor?.id,
    }).then(() => {
      setInputComment({ body: "" });
      getCommentsProduct();
    });
  };

  const updateInputComment = (e) => {
    const { name, value } = e.target;

    setInputComment({ [name]: value });
  };

  const getCommentsProduct = () => {
    if (productId) {
      setLoading(true);
      getComments({
        product_id: productId,
        page: page,
        limit: filter.limit,
      })
        .then(({ data }) => {
          if (Array.isArray(data.docs)) {
            setComments(data.docs);
          } else {
            setComments([]);
          }

          setFiller({ ...filter, total: data?.pages?.total });
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  React.useEffect(() => {
    getCommentsProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, page]);

  return (
    <TabCommentWrapper>
      <div className="h-title">
        Bình luận về sản phẩm
        <span
          style={{
            background: "#e00",
            color: "#fff",
            fontSize: 12,
            padding: "2px 10px",
            borderRadius: 3,
            MozBorderRadius: 3,
            marginTop: "-5px",
            display: "inline-block",
            position: "absolute",
          }}
        >
          {filter.total}
        </span>
      </div>
      <Element name="comment-form" className="comment-form">
        <img
          src={Ava}
          alt="avatar"
          className="img-avatar"
        />
        <form className="form-post">
          <div className="relative">
            <textarea
              name="body"
              value={inputCommnet.body}
              onChange={updateInputComment}
              placeholder="Nội dung bình luận"
              onFocus={() => setShowCommentForm(true)}
            />
            <div
              className="form-input"
              style={{ display: showCommentForm ? "block" : "none" }}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowCommentForm(false);
                  setReplyFor(null);
                }}
                className="close"
              >
                x
              </a>
              <table style={{ width: "100%" }} className="tbl-common">
                <tbody>
                  <tr className="font14">
                    <td style={{ width: "50%" }}>
                      {replyFor?.name
                        ? `Trả lời bình luận của: ${replyFor.name}`
                        : "Nhập thông tin để bình luận"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="text"
                        id="name0"
                        name="full_name"
                        className="inputText"
                        placeholder="Họ tên (bắt buộc)"
                        value={inputCommnet.full_name}
                        onChange={updateInputComment}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="email"
                        id="email0"
                        name="email"
                        className="inputText"
                        placeholder="Email"
                        value={inputCommnet.email}
                        onChange={updateInputComment}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        className="pull-left"
                        style={{
                          paddingRight: 10,
                          position: "relative",
                          top: 7,
                        }}
                      >
                        Đánh giá:
                      </label>
                      <div
                        className="rating"
                        style={{ float: "left" }}
                        id="select-rate-pro0"
                      >
                        <StarRating
                          rating={inputCommnet.rate}
                          changeRating={(newRating) => {
                            setInputComment({ rate: newRating });
                          }}
                          starDimension="20px"
                          starSpacing="5px"
                          starRatedColor="#ffa53f"
                        />
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input
                        type="button"
                        defaultValue="Bình luận"
                        className="btn-red"
                        onClick={handleSendComment}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/*form-input*/}
            <div className="space10" />
          </div>
          {/*relative*/}
        </form>
      </Element>
      <SkeletonTheme color="##e6e4e4" highlightColor="#ddd">
        {loading
          ? Array(10)
              .fill(1)
              .map(() => {
                return (
                  <div style={{ marginBottom: 15, display: "flex" }}>
                    <p style={{ marginRight: 15 }}>
                      <Skeleton width={32} height={32} />
                    </p>
                    <p style={{ width: "100%" }}>
                      <Skeleton count={3} />
                    </p>
                  </div>
                );
              })
          : comments.map((com) => {
              return (
                <div key={com._id} className="item_comment first">
                  <div className="comment_left">
                    <img
                      src="https://gomsubaokhanh.vn/template/default/images/noavatar.jpg"
                      alt="avatar"
                    />
                  </div>
                  <div className="comment_right">
                    <div className="comment-name">
                      <span style={{ marginRight: 15 }}>{com.full_name}</span>
                      <StarRating
                        rating={com.rate}
                        starDimension="15px"
                        starSpacing="0px"
                        starRatedColor="#ffa53f"
                      />
                    </div>
                    <p>{com.body}</p>
                    <div className="info_feeback">
                      <div className="info-cm" id="comment_like_718">
                        <Link
                          to="comment-form"
                          spy={true}
                          smooth={true}
                          duration={500}
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setShowCommentForm(true);
                            setReplyFor({ name: com.full_name, id: com._id });
                          }}
                        >
                          Phản hồi
                        </Link>
                        - <span>{moment(com.createdAt).fromNow()}</span>
                      </div>
                    </div>
                    {com?.replies?.map((com_rep) => {
                      return (
                        <div key={com_rep._id} className="item_reply">
                          <div className="comment_left">
                            <img
                              src="https://gomsubaokhanh.vn/template/default/images/noavatar.jpg"
                              alt="avatar"
                            />
                          </div>
                          <div className="comment_right">
                            <div className="comment-name">
                              <span>{com_rep?.full_name}</span>
                            </div>
                            <p>{com_rep?.body}</p>
                            <div className="info_feeback">
                              <span style={{ color: "#888" }}>
                                ({moment(com_rep.createdAt).fromNow()})
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
      </SkeletonTheme>
      <Pagination limit={filter.limit} totalDocument={filter.total} />
    </TabCommentWrapper>
  );
};

export default React.memo(TabComment);
