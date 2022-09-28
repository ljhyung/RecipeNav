import { Row, Col, Tooltip } from "antd";
import { header } from "./data";
import "./header.scss";
import LogoMain from "../../assets/LogoMain.png";
import { Link, Outlet } from "react-router-dom";
const Header = (props) => {
  const menuChild = header.map((item, i) => {
    const content = item.children.map((child, ii) => (
      <Link to={child.link} key={ii.toString()} className="tip-block">
        <span className="tip-img">
          <img src={child.img} alt="img" />
        </span>
        <div className="tip-content">
          {child.title}
          <div>{child.desc}</div>
        </div>
      </Link>
    ));

    return (
      <Col key={i.toString()} span={6}>
        <Tooltip
          title={content}
          placement="bottom"
          overlayClassName="header-tip-wrap"
        >
          <span className="nav-title">{item.title}</span>
        </Tooltip>
      </Col>
    );
  });

  return (
    <div style={{ height: "67.39px" }}>
      <header {...props}>
        <a className="logo">
          <img alt="logo" src={LogoMain} />
        </a>
        <Row className="nav">{menuChild}</Row>
      </header>
    </div>
  );
};

export default Header;
