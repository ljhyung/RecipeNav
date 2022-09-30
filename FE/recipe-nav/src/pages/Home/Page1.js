import {Button, Col, Row} from "antd";
import {useEffect, useState} from "react";
import Graph from "./Graph"
import {useSelector} from "react-redux";
import apiClient from "../../api";

const Page1 = () => {
    const accessToken = useSelector((state) => state.auth.accessToken);

    const [testElements, setTestElements] = useState([]);
    const [best5, setBest5] = useState([3, 10, 15, 20, 25]);
    const [bestPick, setBestPick] = useState();
    const [bestPicked, setBestPicked] = useState();

    useEffect(() => {
        if (bestPick == null) {
            changePick(best5[0]);
        }
    }, []); //

    useEffect(() => {
        if (bestPicked != null) {
            setBest5([
                ...best5,
                bestPicked
            ])
            // findIngredientInfo(bestPicked)
        }
    }, [bestPicked]);

    useEffect(() => {
        if (best5.length == 4 && testElements.length == 0) {
            console.log(best5)
            best5.map((item,i)=> {
                console.log(item)
                findIngredientInfo(item)
            })
        }
    }, [best5]);

    useEffect(() => {
        console.log(testElements)
        findIngredientInfo()
    }, [testElements])

    const findIngredientInfo = (ingredientSeq) => {
        console.log(ingredientSeq)
        apiClient
            .get("/ingredients/" + ingredientSeq, {
                headers: {
                    Authorization: accessToken
                },
                params: {}
            })
            .then((response) => {
                setTestElements([
                    ...testElements,
                    response.data
                ]);
            })
            .catch((error) => {
                console.log("요청 에러");
                console.log(error);
            });
    }

    const changePick = (ingredientSeq) => {
        console.log(ingredientSeq)
        setBestPicked(bestPick)
        setBestPick(ingredientSeq)
        setBest5(best5.filter(best => best !== ingredientSeq))
        setTestElements(
            testElements.filter(testElement => testElement.ingSeq !== ingredientSeq)
        )
        console.log(testElements)
    };

    const Test = () => {
        return (
            <Col md={12} xs={24} className="page1-item">
                <Row gutter={[4, 4]}>
                    <Col span={8}>
                        <img
                            className="page1-item-img"
                            src="https://gw.alipayobjects.com/zos/rmsportal/KtRzkMmxBuWCVjPbBgRY.svg"
                            alt="img"></img>
                    </Col>
                    <Col span={16}>
                        <h2>힘들다진짜</h2>
                    </Col>
                </Row>
                <Graph key="graph" ingredientSeq={bestPick}/>
            </Col>
        );
    }

    const Test2 = () => {
        return (
            <Col md={12} xs={24} className="page1-item">
                <Row className='page1-item-contents'>
                    {Test3}
                </Row>
            </Col>
        );
    }

    const Test3 = testElements.map((item, i) => {
        return (
            <Col md={12} xs={24} className='page1-item-content-wrapper'>
                <Button
                    className='page1-item-content'
                    key={item.ingSeq}
                    onClick={() => changePick(item.ingSeq)}>
                    {item.ingName}
                </Button>
            </Col>
        );
    })

    //onClick={this.changePick}

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
                    <span>{best5}</span>
                    <div>♥</div>
                    <span>{bestPick}</span>
                </div>
            </div>
        </div>
    );
};
export default Page1;
