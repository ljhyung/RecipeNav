import {Row, Col, Tooltip} from "antd";
import {header} from "./data";
import "./header.scss";
import LogoMain from "../../assets/LogoMain.png";
import {Link, Outlet} from "react-router-dom";
const Header = (props) => {
    const menuChild = header.map((item, i) => {
        return (
            <Col key={i.toString()} span={6}>
                <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                    <span className="nav-title">{item.title}</span>
                </Tooltip>
            </Col>
        );
    });

    return (
        <div style={{
                height: "67.39px"
            }}>
            <header {...props}>
                <Link className="logo" to='/'>
                    <img alt="logo" src={LogoMain}/>
                </Link>
                <Row className="nav">{menuChild}</Row>
            </header>
        </div>
    );
};

export default Header;
