import { Route, Routes } from "react-router-dom";
import "./App.css";
import NaverOauth from "./pages/oauth/NaverOauth";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Mypage from "./pages/Mypages/Mypage";
import ProfileEdit from "./pages/ProfileEdits/ProfileEdit";

//https://hururuek-chapchap.tistory.com/212
//최상단 컴포넌트 , 라우터 관리

//프로그래밍 라우팅 이동
//
//
//
//

function App() {
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
