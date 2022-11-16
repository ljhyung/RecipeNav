import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../api";
import { setSelectedIngredientDirect } from "../../store/slices/ingredientSlice";

const Page2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const recipeClickHandle = (recSeq) => {
    //레시피 클릭했을 때,

    console.log(recSeq);

    for (let i = 0; i < data.length; i++) {
      if (data[i].ingSeq == recSeq) {
        dispatch(setSelectedIngredientDirect(data[i]));
        navigate("/ingredient/" + recSeq);
      }
    }
  };

  useEffect(() => {
    apiClient
      .get("/my-infos/ingredients", {
        headers: {
          Authorization: accessToken,
        },
        params: {},
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
        //   dispatch(setRecipes(response.data.content));
      })
      .catch((error) => {
        console.log("요청 에러");
        console.log(error);
      });
  }, []);

  const myIngredientsCard = data.map((item, i) => {
    return (
      <li className="card-item" key={i}>
        <div
          onClick={() => recipeClickHandle(item.ingSeq)}
          className="card-item-link"
        >
          <div
            className="card-item-img"
            style={{
              width: 120,
              height: 120,
              background: `url("${item.ingImg}")`,
              borderRadius: `100%`,
              backgroundSize: `contain`,
              backgroundRepeat: `no-repeat`,
              backgroundPosition: `center`,
            }}
          />
          <div className="card-item-title">{item.ingName}</div>
        </div>
      </li>
    );
  });

  return (
    <div className="page2 page-wrapper">
      <div className="page">
        <div className="contents-wrap">
          <h1>내 관심 식자재</h1>
          <div className="box">
            <ul className="contents">{myIngredientsCard}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page2;
