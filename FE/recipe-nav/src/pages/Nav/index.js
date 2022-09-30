import "./nav.scss";
import Header from "./Header";

import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  return [
    <Header key="header" />,
    // <Link to={"/mypage"}>테스트</Link>,
    <Outlet></Outlet>,
    <Footer key='footer' />,
  ];
};
export default Nav;
