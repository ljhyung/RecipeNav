import {Col, Row} from "antd";
import axios from "axios";
import Graph from "./Graph"

const Page1 = () => {

    const Test = () => {
        return (
            <Col md={12} xs={24} className="page1-item">
                <a className="page1-item-link">
                    <h2 className="page1-item-title">마늘</h2>
                    <Row>
                        <Col span={8}>
                            <img
                                className="page1-item-img"
                                src="https://gw.alipayobjects.com/zos/rmsportal/KtRzkMmxBuWCVjPbBgRY.svg"
                                alt="img"></img>
                        </Col>
                        <Col span={16}>
                            <div>마늘쌉니다! 내가 약속해요</div>
                        </Col>
                    </Row>
                    <Graph/>
                </a>
            </Col>
        );
    }
    
    const Test2 = () => {
        return (
            <Col md={12} xs={24} className="page1-item">
                <a className="page1-item-link">
                    <h2 className="page1-item-title">마늘</h2>
                    <Row>
                        <Col md={12} xs={24}>
                            안
                        </Col>
                        <Col md={12} xs={24}>
                            녕
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} xs={24}>
                            해
                        </Col>
                        <Col md={12} xs={24}>
                            요
                        </Col>
                    </Row>
                </a>
            </Col>
        );
    }

    return (
        <div className="page1 page-wrapper">
            <div className="page">
                <div className="contents-wrap">
                    <h1>
                        실시간 급락 식재료
                    </h1>
                    <Row>
                        <Test/>
                        <Test2/>
                    </Row>
                </div>
            </div>
        </div>
    );
};
export default Page1;
