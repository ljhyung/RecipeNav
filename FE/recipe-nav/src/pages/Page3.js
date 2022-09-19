import React, {useState} from 'react'; // eslint-disable-line no-unused-vars


const Page3 = () => {
  const logOut = ()=>{
    alert("로그아웃 되었습니다.")
  }
  const ProfileEdit =()=>{
    alert("수정 페이지로 이동")
  }
  return (
    <>
      <div className="Myinfos">
        <div className="Userinfo">
          <p>
            이미지 유저 이미지 받아오기
          </p>
          <p>
            성별 유저성별 받아오기
          </p>
          <p>
            나이 유저나이 받아오기
          </p>
          <button className="Logout" onClick={logOut}>
            로그아웃
          </button>
          <button className="ProfileEdit" onClick={ProfileEdit}>
            프로필 수정
          </button>
        </div>
        <div className="UserContents">
          <div className="Recipes">
            <div className="Myrecipes">
              <p>즐겨찾는 레시피</p>
            </div>
            <div className="Recentrecipes">
              <p>최근 조회 레시피</p>
            </div>
          </div>
          <div className="Ingredients">
            <div className="Myingredients">
              <p>즐겨찾는 식재료</p>
            </div>
            <div className="RecentIngredients">
              <p>최근 조회 식재료</p>
            </div>
          </div>  
        </div>
      </div>
    </>
  );
};

export default Page3;
