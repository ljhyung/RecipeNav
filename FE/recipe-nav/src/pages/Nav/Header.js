import { Row, Col, Tooltip } from "antd";
import { header } from "./data";
import "./header.scss";
import LogoMain from "../../assets/LogoMain.png";
import {Link, Outlet} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setAthenticated} from "../../store/slices/authSlice";
import {setToken} from "../../store/slices/authSlice";
import {UnorderedListOutlined} from '@ant-design/icons';
import {Dropdown, Menu, Space} from 'antd';

const Header = (props) => {

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setAthenticated(false));
        dispatch(setToken(""));
        console.log("adios")
    }

    const content = (() => (
        <> < Link to = "/ingredient" className = "tip-block" > <div className="tip-content">
            식자재
        </div>
    </Link>
    <Link to="/recipe" className="tip-block">
        <div className="tip-content">
            레시피
        </div>
    </Link>
    <Link to="/budget" className="tip-block">
        <div className="tip-content">
            예산
        </div>
    </Link>
    <Link to="/mypage" className="tip-block">
        <div className="tip-content">
            Mypage
        </div>
    </Link>
    <div className="tip-block" onClick={logout}>
        <div className="tip-content" >
            로그아웃
        </div>
    </div>
</>
    ));

    const menu = (
        <Menu
            items={[
                {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                            1st menu item
                        </a>
                    ),
                    key: '0'
                }, {
                    label: (
                        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                            2nd menu item
                        </a>
                    ),
                    key: '1'
                }, {
                    type: 'divider'
                }, {
                    label: '3rd menu item（disabled）',
                    key: '3',
                    disabled: true
                }
            ]}/>
    );

    return (
        <div style={{
                height: "67.39px"
            }}>
            <Row>
                <Col md={24} xs={0}>
                    <header>
                        <Link className="logo" to='/'>
                            <img alt="logo" src={LogoMain}/>
                        </Link>
                        <Row className="nav">
                            <Col span={4}>
                                <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                                    <Link to="/ingredient" className="nav-title">식자재</Link>
                                </Tooltip>
                            </Col>
                            <Col span={4}>
                                <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                                    <Link to="/recipe" className="nav-title">레시피</Link>
                                </Tooltip>
                            </Col>
                            <Col span={4}>
                                <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                                    <Link to="/budget" className="nav-title">예산</Link>
                                </Tooltip>
                            </Col>
                            <Col span={4}>
                                <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                                    <Link to="/mypage" className="nav-title">MyPage</Link>
                                </Tooltip>
                            </Col>
                            <Col span={4} className='logout'>
                                <Tooltip placement="bottom" overlayClassName="header-tip-wrap">
                                    <span onClick={logout} className="nav-title">로그아웃</span>
                                </Tooltip>
                            </Col>
                            {/* 로그아웃 이벤트핸들러 */}
                        </Row>
                    </header>

                </Col>
                <Col md={0} xs={24}>
                    <header>
                        <Link className="logo" to='/'>
                            <img alt="logo" src={LogoMain}/>
                        </Link>
                        <Row className="nav">
                            <Tooltip title={content} placement="bottom" overlayClassName="header-tip-wrap">
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
