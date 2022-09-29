import React from 'react';
import { Row, Col } from 'antd';
import { footer } from './data';

import './footer.scss'

const Footer = () => {

    return (<footer className="footer page-wrapper">
        <div className="footer-bottom">
            <div className="page">
                <Row>
                    <Col md={24} xs={24}>
                        <span style={{ marginRight: 12 }}>본 사이트의 콘텐츠는 저작권법의 보호를 받는 바 무단 전재, 복사, 배포 등을 금합니다.</span>
                    </Col>
                    <Col md={24} xs={24}>
                         <span style={{ marginRight: 12 }}>Copyright © 2022 recipeNav</span>
                    </Col>
                </Row>
                {/* <Row></ㄲ> */}
            </div>

        </div>
    </footer>);
};

export default Footer;
