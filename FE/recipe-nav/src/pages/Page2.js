import Signin from './Signin/Signin.js'
import 'antd/dist/antd.css';
import { useEffect, useState } from 'react';
import { Col, Row } from "antd";

// 첫페이지 console.log(`브라우저 화면 사이즈 x: ${window.innerWidth},y:
// ${window.innerHeight}`);

const Page2 = () => {

  const [background, setBackground] = useState(
    '#fffff'
  );

  const [windowSize, setWindowSize] = useState(
    { width: window.innerWidth, height: window.innerHeight }
  );

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);


  return (
    window.innerWidth > 600 ?
      <Row >
        <Col flex="auto" style={{ backgroundColor: `${background}` }}>x: {window.innerWidth}, y: {window.innerHeight}</Col>
        <Col flex="500px" style={{
          background: 'rgba(166, 141, 96, 1)',
          height: '100vh'
        }} ><Signin /></Col>
      </Row >
      : <Row >
        <Col flex="500px" style={{
          background: 'rgba(166, 141, 96, 1)',
          height: '100vh',
        }}><Signin /></Col>
      </Row>

  );
};

export default Page2;
