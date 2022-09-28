import {Row, Col, Tooltip} from "antd";
import {header} from "./data";
import "./header.scss";
import LogoMain from "../../assets/LogoMain.png";
import {Link, Outlet} from "react-router-dom";
const Header = (props) => {
    // const menuChild = header.map((item, i) => {
    //     return (
    //         <Col key={i.toString()} span={6}>
    //             <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
    //                 <Link to={item.link} className="nav-title">{item.title}</Link>
    //             </Tooltip>
    //         </Col>
    //     );
    // });

    return (
        <div style={{
                height: "67.39px"
            }}>
            <header {...props}>
                <Link className="logo" to='/'>
                    <img alt="logo" src={LogoMain}/>
                </Link>
                <Row className="nav">
                    <Col span={6}>
                        <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                            <Link to="/ingredient" className="nav-title">식자재</Link>
                        </Tooltip>
                    </Col>
                    <Col span={6}>
                        <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                            <Link to="/recipe" className="nav-title">레시피</Link>
                        </Tooltip>
                    </Col>
                    <Col span={6}>
                        <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                            <Link to="/budget" className="nav-title">예산</Link>
                        </Tooltip>
                    </Col>
                    <Col span={6}>
                        <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                            <Link to="/mypage" className="nav-title">마이페이지</Link>
                        </Tooltip>
                    </Col>
                    <Col span={6}>
                        <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                            <span className="nav-title">로그아웃</span>
                        </Tooltip>
                    </Col>
                    {/* 로그아웃 이벤트핸들러 */}
                </Row>
            </header>
        </div>
    );
};

export default Header;
