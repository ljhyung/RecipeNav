import { Col, Row } from "antd";
import "./home.scss";

import Myinfo from "./Myinfo";
import Myingredients from "./Myingredients";

const Home = () => {

    return (
        <Row className="body">
            <Col md={12} xs={24}>
                <Myinfo key="myinfo" />
            </Col>
            <Col md={12} xs={24}>
                <Myingredients key="Myingredients" />
            </Col>
        </Row>
    );
};
export default Home;
