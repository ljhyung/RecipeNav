import {Button, Col, Row} from "antd";
import {page1} from './data';

const Page2 = () => {
    // const children = page1     .children     .map((item, i) => {         return (
    // <Col md={8} xs={24} key={i.toString()} className="page1-item"> <a
    // className="page1-item-link" href={item.link} target="_blank" onMouseEnter={()
    // => { this.onMouseOver(i); }} onMouseLeave={this.onMouseOut}> <div
    // className="page1-item-img" style={{ boxShadow: `0 16px 32px
    // ${item.shadowColor}`                         }}> <img src={item.src}
    // alt="img"/>                     </div> <div
    // className="page1-item-title">{item.title}</div> <p>{item.content}</p> </a>
    // </Col>         ); });
    const test = page1
        .children
        .map((item, i) => {
            return (
                <Col md={4} xs={12} className="page2-item">
                    <a className="page2-item-link">
                        <div
                            className="page2-item-img"
                            style={{
                                boxShadow: `0 16px 32px ${item.shadowColor}`
                            }}>
                            <img src={item.src} alt="img"/>
                        </div>
                        <div className="page2-item-title">{item.title}</div>
                        <p>{item.content}</p>
                    </a>
                </Col>
            );
        })
    return (
        <div className="page2 page-wrapper">
            <div className="page">
                <div className="contents-wrap">
                    <h1>
                        내 관심 식자재
                    </h1>
                    <Row className="contents">
                        {test}
                    </Row>
                </div>

            </div>
        </div>
    );
};
export default Page2;
