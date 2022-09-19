import React, { useEffect } from 'react'; // eslint-disable-line no-unused-vars
import { Routes, useNavigate, Link, Route, BrowserRouter as Router } from 'react-router-dom'; // eslint-disable-line no-unused-vars
import axios from 'axios';
import styles from './Mypage.module.css'; // eslint-disable-line no-unused-vars

const Mypage = () => {
  // 프로필 수정페이지로 이동
  const navigate = useNavigate();

  const moveToProfileEdit =() => { 
    navigate('/profile-edit')
  };
  
  // 로그아웃
  const logOut = () => {
    
  }

  //사용자 정보 받아오기
  async function getUserData() { 
    try {
      //응답 성공
      const response = await axios.get('url주소',{
        params:{
          //url 뒤에 붙는 param id값
          id: 12345
        }
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  //즐겨찾기 레시피 정보 받아오기
  async function getMyRecipe() {
    try {
      //응답 성공
      const response = await axios.get('url주소',{
        params:{
          //url 뒤에 붙는 param id값
          id: 12345
        }
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  //최근 조회한 레시피 정보 받아오기
  async function getRecentRecipe() {
    try {
      //응답 성공
      const response = await axios.get('url주소',{
        params:{
          //url 뒤에 붙는 param id값
          id: 12345
        }
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  //즐겨찾기 식재료 정보 받아오기
  async function getMyIngredient() {
    try {
      //응답 성공
      const response = await axios.get('url주소',{
        params:{
          //url 뒤에 붙는 param id값
          id: 12345
        }
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }

  //최근 조회한 식재료 정보 받아오기
  async function getRecentIngredient() {
    try {
      //응답 성공
      const response = await axios.get('url주소',{
        params:{
          //url 뒤에 붙는 param id값
          id: 12345
        }
      });
      console.log(response);
    } catch (error) {
      //응답 실패
      console.error(error);
    }
  }
  
  const user_name = '김싸피'
  const user_gender = '남'
  const user_age = '33'
  const user_img = './assets/img/ing2'
  const rec = ['./assets/img/ing1','감튀', '오이소박이', '라면']
  const recentrec = ['치킨','함박', '카레라이스', '떡볶이']
  const ing = ['닭가슴살', '소고기', '계란', '치즈' ]
  const recenting = ['오이', '당근', '배추', '가래떡']
    
  return (
    <>
      <div className="Myinfos">
        <div className={styles.Userinfo}>
          <p>
            <img className={styles.UserImage} src={user_img.default} alt='userimage'/>
          </p>
          <p className={styles.UserNickname}>
            {user_name} 님 
          </p>
          <p className={styles.UserGender}>
            성별 {user_gender}
          </p>
          <p className={styles.UserAge}>
            나이 {user_age}
          </p>
          <div className="Logout">
            <button onClick={logOut}>
              로그아웃
            </button>
          </div>
          <div className="ProfileEdit">
            
              <button onClick={moveToProfileEdit}>
                프로필 수정
              </button>
     
          </div>
        </div>
        <div className="UserContents">
          <div className="Recipes">
            <div className="Myrecipes">
              <p className={styles.MyrecipesTitle}>
                즐겨찾는 레시피
              </p>
              <div className={styles.MyrecipesImage}>
                즐겨찾는 레시피 사진들~
              </div>
            </div>
            <div className={styles.RecentRecipe}>
              <p className={styles.RecentRecipeTitle}>
                최근 조회 레시피
              </p>
                <div className={styles.RecentRecipeImage}>
                  {recentrec.map((value, index) => (
                    <span key={index}>
                      {value}
                    </span>
                  ))}
                </div>
            </div>
          </div>
          <div className={styles.Ingredient}>
            <div className={styles.Myingredient}>
              <p className={styles.MyingredientTitle}>
                즐겨찾는 식재료
              </p>
                <div className={styles.MyingredientImage}>
                  {ing.map((value, index) => (
                    <span key={index}>
                      {value}
                    </span>
                  ))}
                </div>
            </div>
            <div className={styles.Rencentingredient}>
              <p className={styles.RencentIngredientTitle}>
                최근 조회 식재료
              </p>
                <div className={styles.RecentINGREDIENTImage}>
                  {recenting.map((value, index) => (
                    <span key={index}>
                      {value}
                    </span>
                  ))}
                </div>
            </div>
          </div>  
        </div>
      </div>
    </>
  );
};

export default Mypage;