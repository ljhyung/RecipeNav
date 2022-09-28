import { Route, Routes,  Navigate } from "react-router-dom";
import "./App.css";
import NaverOauth from "./pages/oauth/NaverOauth";
import { useSelector } from "react-redux";
import Mypage from "./pages/Mypages/Mypage";
import ProfileEdit from "./pages/ProfileEdits/ProfileEdit";
import Home from "./pages/Home";
import Nav from "./pages/Nav";
import Signin from "./pages/Signin/Signin";
import RecipeSearch from "./pages/Recipe/RecipeSearch";
import RecipeDetail from "./pages/Recipe/RecipeDetail";
import BudgetSearch from "./pages/budget/BudgetSearch";
//https://hururuek-chapchap.tistory.com/212
//최상단 컴포넌트 , 라우터 관리

//프로그래밍 라우팅 이동
//
//
//
//

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={authenticated ? <Nav /> : <Navigate to="/login" replace />}
      >
        <Route path="/" element={<Home />}/>

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
        <Route path="/recipe">
          <Route index element={<RecipeSearch />} />
          <Route path=":recSeq" element={<RecipeDetail />} />
        </Route>
        
        <Route path="/budget" element={<BudgetSearch/>}></Route>
      </Route>

      <Route path="/login" element={<Signin />} />

      <Route path="oauth/naver" element={<NaverOauth />} />
      <Route path="*" element={<h1>에러</h1>} />
    </Routes>
  );
}

export default App;
