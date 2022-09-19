import SigninMain from './Signin/SigninMain.js'
import 'antd/dist/antd.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Col, Row } from "antd";


const Page2 = () => {
  const ref = useRef(null);

  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [windowSize, setWindowSize] = useState(
    { width: window.innerWidth, height: window.innerHeight }
  );

  const handleResize = () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);


  return (
    window.innerWidth > 900 ?
      <Row >
        <Col flex="auto" ref={ref}>x: {window.innerWidth}, y: {window.innerHeight} width:{width}, height:{height}</Col>
        <Col flex="500px" style={{
          background: 'rgba(166, 141, 96, 1)',
          height: '100vh'
        }} ><Signin /></Col>
      </Row >
      : <Row >
        <Col style={{
          background: 'rgba(166, 141, 96, 1)',
          height: '100vh',
          width: '100vw',
        }}><Signin /></Col>
      </Row>

  );
};

export default Page2;
