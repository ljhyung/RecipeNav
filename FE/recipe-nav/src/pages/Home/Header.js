import { Menu, Row, Col, Button, Popover, Badge } from 'antd';
import './header.scss';


const Header = () => {

    const menu = [
        <Button className="header-lang-button" ghost size="small" key="lang">
            English
        </Button>,
        <Menu mode={'horizontal'} defaultSelectedKeys={['home']} id="nav" key="nav">
            <Menu.Item key="home">
                사랑
            </Menu.Item>
            <Menu.Item key="docs/spec">
                우정
            </Menu.Item>
            <Menu.Item key="docs/react">
                평화
            </Menu.Item>
            <Menu.Item key="docs/pattern">
                그리고
            </Menu.Item>
            <Menu.Item key="docs/resource">
                낭만
            </Menu.Item>
            <Menu.Item key="pro">
                <a
                    href="http://pro.ant.design"
                    className="header-link"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PRO
                    <span style={{
                        display: 'inline-block', position: 'relative', top: -2, width: 18,
                    }}
                    >
                        <Badge dot />
                    </span>
                </a>
            </Menu.Item>
        </Menu>,
    ];

    return (
        <Row>
            <Col lg={4} md={5} sm={24} xs={24}>
                <a id="logo">
                    <img alt="logo" src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg" />
                    <span>Ant Design</span>
                </a>
            </Col>
            <Col lg={20} md={19} sm={0} xs={0}>
                {menu}
            </Col>
        </Row>
    );
};

export default Header;
