import "./home.scss";
import { Link, Outlet } from "react-router-dom";

import Banner from "./Banner";
import Graph from "./Graph";
import Page1 from "./Page1";
import Page2 from "./Page2";
import MyIngredients from "./MyIngredients";


const Home = () => {
  return [

    <Link to={"/mypage"}>테스트</Link>,
    <Banner key="banner" />,
    <Page2 key="page2" />,
    <MyIngredients key="myingredients" />,
    <Page1 key="page1" />,
    <Page1 key="page1" />,
    <Page1 key="page1" />,
    // <Graph key="graph" />,
    <Outlet></Outlet>,
  ];
};
export default Home;
