import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NaverOauth from "./pages/oauth/NaverOauth";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Page1 from "./pages/Page1";
import RecipeSearch from "./pages/Recipe/RecipeSearch";
//https://hururuek-chapchap.tistory.com/212
//최상단 컴포넌트 , 라우터 관리

//프로그래밍 라우팅 이동
//
//
//
//

function App() {
  const authenticated = useSelector((state) => state.auth.authenticated);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>환영</h1>} />

        <Route
          path="/home"
          element={
            authenticated ? <h1>홈</h1> : <Navigate to="/login" replace />
          }
        />

        <Route path="/login" element={<Page1 />} />

        <Route path="/recipe" element={<RecipeSearch />} />
        <Route path="/oauth/naver" element={<NaverOauth />} />
        <Route path="*" element={<h1>에러러</h1>} />
      </Routes>
    </>
  );
}

export default App;
