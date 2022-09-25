import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import "./App.css";
import NaverOauth from "./pages/oauth/NaverOauth";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Mypage from "./pages/Mypages/Mypage";
import ProfileEdit from "./pages/ProfileEdits/ProfileEdit";
import Home from "./pages/Home";
import Signin from "./pages/Signin/Signin";
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
        element={authenticated ? <Home /> : <Navigate to="/login" replace />}
      >
        <Route index element={<h1>홈의 메인</h1>} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/profile-edit" element={<ProfileEdit />} />
      </Route>

      <Route path="/login" element={<Signin />} />

      <Route path="oauth/naver" element={<NaverOauth />} />
      <Route path="*" element={<h1>에러</h1>} />
    </Routes>
  );
}

export default App;
