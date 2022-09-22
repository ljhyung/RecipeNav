import './home.scss';
import Header from './Header';
import Banner from './Banner';

const Home = () => {

    return ([
        <Header key="header"/>,
        <Banner key="banner"/>,
        // <Footer key="footer"/>,
    ]);

}
export default Home;