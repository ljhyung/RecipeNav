import style from './Notice.module.css';
import { Row, Image } from 'antd';

//캐러셀 연습

const Notice = ({ img }) => {
    return (
        <div className={`${style.container}`}>
            < Row justify="center">
                <Image src="/Test1.jpg" />
            </Row>
        </div>
    );
};

export default Notice;