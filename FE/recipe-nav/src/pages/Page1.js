import style from './Page1.module.css';
import { Col, Row } from "antd";
import Signin from './Signin/Signin.js'



//첫페이지
const Page1 = () => {
  return (
    <Row >
      <Col flex="auto" className={style.Notice}></Col>
      <Col flex="500px" className={style.Signin}><Signin style={{ width: '100%' }} /></Col>
    </Row>
  );
};

export default Page1;
