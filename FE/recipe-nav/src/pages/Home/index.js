import "./home.scss";
import { Link, Outlet } from "react-router-dom";

import Banner from "./Banner";
import Graph from "./Graph";
import Page2 from "./Page2";
import RealTimeTopLosers from "./RealTimeTopLosers";
import RealTimeTopGainers from "./RealTimeTopGainers";
// import MyIngredients from "./MyIngredients";

const Home = () => {
  return (
    <div className="body">
      <Banner key="banner" />
      <Page2 key="page2" />
      <RealTimeTopGainers key="RealTimeTopGainers" />
      <RealTimeTopLosers key="RealTimeTopLosers" />
      {/* <MyIngredients key="myingredients"/> */}
      <Outlet></Outlet>
    </div>
  );
};
export default Home;
