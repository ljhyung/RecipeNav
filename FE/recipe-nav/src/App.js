import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NaverOauth from "./pages/oauth/NaverOauth";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Mypage from "./pages/Mypages/Mypage";
import ProfileEdit from "./pages/ProfileEdits/ProfileEdit";

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
    <Routes>
      <Route path="/" element={<Page1 />} />
      <Route path="/login" element={<Page2 />} />
      <Route path="/profile/*" element={<Page3 />} />
      <Route path="/home" element={<Page3 />} />
      <Route path="oauth/naver" element={<NaverOauth />} />
      <Route path="/mypage/*" element={<Mypage />} />
      <Route path="/profile-edit/*" element={<ProfileEdit />} />
      <Route path="*" element={<h1>에러</h1>} />
    </Routes>
  );
}

export default App;
