import {Col, Row} from "antd";
import "./home.scss";

import Myinfo from "./Myinfo";
import Myingredients from "./Myingredients";
import Myrecipes from "./Myrecipes";

const Home = () => {

    return (
        <Row className="body">
            <Col md={8} xs={24}>
                <Myinfo key="myinfo"/>
            </Col>
            <Col md={16} xs={24}>
                <Col span={24}>
                    <Myingredients key="Myingredients"/>
                </Col>
                <Col span={24}>
                    <Myrecipes key="Myrecipes"/>
                </Col>
            </Col>
        </Row>
    );
};
export default Home;
