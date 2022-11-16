import { Row, Col, Tooltip } from "antd";
import { header } from "./data";
import "./header.scss";
import LogoMain from "../../assets/LogoMain.png";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAthenticated } from "../../store/slices/authSlice";
import { setToken } from "../../store/slices/authSlice";
import { UnorderedListOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space } from "antd";
import { useRef, useState } from "react";
import QueueAnim from "rc-queue-anim";

const Header = (props) => {
  const [positon, setPositon] = useState("");

  const logop = useRef();
  const ingp = useRef();
  const recipep = useRef();
  const budgetp = useRef();
  const myPagep = useRef();
  const navArray = [logop, ingp, recipep, budgetp, myPagep];

  const dispatch = useDispatch();
  const logout = () => {
    dispatch(setAthenticated(false));
    dispatch(setToken(""));
    console.log("adios");
  };

  const navCurrentPositonHighlightHandle = (target) => {
    for (let i = 0; i < navArray.length; i++) {
      console.log(navArray[i]);
      navArray[i].current.style.color = "#eaf2ce";
    }
    target.current.style.color = "#9cd918";
  };

  const content = () => (
    <>
      {" "}
      <Link to="/ingredient" className="tip-block">
        {" "}
        <div className="tip-content">식자재</div>
      </Link>
      <Link to="/recipe" className="tip-block">
        <div className="tip-content">레시피</div>
      </Link>
      <Link to="/budget" className="tip-block">
        <div className="tip-content">예산</div>
      </Link>
      <Link to="/mypage" className="tip-block">
        <div className="tip-content">Mypage</div>
      </Link>
      <div className="tip-block" onClick={logout}>
        <div className="tip-content">로그아웃</div>
      </div>
    </>
  );

  const menu = (
    <Menu
      items={[
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              1st menu item
            </a>
          ),
          key: "0",
        },
        {
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.aliyun.com"
            >
              2nd menu item
            </a>
          ),
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "3rd menu item（disabled）",
          key: "3",
          disabled: true,
        },
      ]}
    />
  );

  return (
    <div
      style={{
        height: "67.39px",
        position: "relative",
      }}
    >
      <Row>
        <Col md={24} xs={0}>
          <header>
            <QueueAnim>
              <Link
                className="logo"
                to="/"
                ref={logop}
                onClick={() => navCurrentPositonHighlightHandle(logop)}
              >
                <img alt="logo" src={LogoMain} />
              </Link>
              <Row className="nav">
                <Col span={4}>
                  <Tooltip
                    placement="bottom"
                    overlayClassName="header-tip-wrap"
                  >
                    <Link
                      to="/ingredient"
                      className="nav-title"
                      ref={ingp}
                      onClick={() => navCurrentPositonHighlightHandle(ingp)}
                    >
                      식자재
                    </Link>
                  </Tooltip>
                </Col>
                <Col span={4}>
                  <Tooltip
                    placement="bottom"
                    overlayClassName="header-tip-wrap"
                  >
                    <Link
                      to="/recipe"
                      className="nav-title"
                      ref={recipep}
                      onClick={() => navCurrentPositonHighlightHandle(recipep)}
                    >
                      레시피
                    </Link>
                  </Tooltip>
                </Col>
                <Col span={4}>
                  <Tooltip
                    placement="bottom"
                    overlayClassName="header-tip-wrap"
                  >
                    <Link
                      to="/budget"
                      className="nav-title"
                      ref={budgetp}
                      onClick={() => navCurrentPositonHighlightHandle(budgetp)}
                    >
                      예산
                    </Link>
                  </Tooltip>
                </Col>
                <Col span={4}>
                  <Tooltip
                    placement="bottom"
                    overlayClassName="header-tip-wrap"
                  >
                    <Link
                      to="/mypage"
                      className="nav-title"
                      ref={myPagep}
                      onClick={() => navCurrentPositonHighlightHandle(myPagep)}
                    >
                      MyPage
                    </Link>
                  </Tooltip>
                </Col>
                <Col span={4} className="logout">
                  <Tooltip
                    placement="bottom"
                    overlayClassName="header-tip-wrap"
                  >
                    <span onClick={logout} className="nav-title">
                      로그아웃
                    </span>
                  </Tooltip>
                </Col>
                {/* 로그아웃 이벤트핸들러 */}
              </Row>
            </QueueAnim>
          </header>
        </Col>
        <Col md={0} xs={24}>
          <header>
            <Link className="logo" to="/">
              <img alt="logo" src={LogoMain} />
            </Link>
            <Row className="nav">
              <Tooltip
                title={content}
                placement="bottom"
                overlayClassName="header-tip-wrap"
              >
                <span className="nav-title">메뉴</span>
              </Tooltip>
            </Row>
          </header>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
