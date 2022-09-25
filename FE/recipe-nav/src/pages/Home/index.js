import "./home.scss";
import Header from "./Header";
import Banner from "./Banner";
import Graph from "./Graph";
import Footer from "./Footer";
import { Link, Outlet } from "react-router-dom";

const Home = () => {
  return [
    <Header key="header" />,

    //<Banner key="banner" />,
    //<Graph key="graph" />,
    //<Footer key="footer" />,

    <Link to={"/mypage"}>테스트</Link>,
    <Outlet></Outlet>,
  ];
};
export default Home;
