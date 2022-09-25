import style from "./Signin.module.css";
import Main from "./Main";
import Signup from "./Signup";
import "antd/dist/antd.css";
//로그인 버튼
const Signin = (props) => {
  console.log(props.state);

  return (
    <>
      <Main />
      {props.USA === "FirstLogin" ? <Signup /> : null}
    </>
  );
};

export default Signin;
