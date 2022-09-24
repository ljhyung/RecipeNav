import './home.scss';
import Header from './Header';
import Banner from './Banner';
import Graph from './Graph';
import Footer from './Footer';

const Home = () => {

    return ([
        <Header key="header"/>,
        <Banner key="banner"/>,
        <Graph key="graph"/>,

        <Footer key="footer"/>,
    ]);

}
export default Home;