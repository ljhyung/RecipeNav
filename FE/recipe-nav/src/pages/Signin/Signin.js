import style from './Signin.module.css';
import Main from './Main'
import Signup from './Signup'
import "antd/dist/antd.css";
//로그인 버튼
const Signin = (props) => {
    console.log(props.state)

    return (
        <>
        {props.state === 'Main' ? <Main /> : null}
        {props.state === 'FirstLogin' ? <Signup /> : null}
        </>
    );
};

export default Signin;
