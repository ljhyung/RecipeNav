import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myRecipes: [
    {
      recSeq: 5,
      recName: "식빵고구마파이",
      recStep: null,
      recCost: null,
      recCode: "180330",
      recSummary: "식빵을 이용한 간단 고구마파이! 아이들 영양 간식으로 딱!",
      cateCode: "3020002",
      cateFrac: "서양",
      foodCode: "3010014",
      foodFrac: "빵/과자",
      cookingTime: "30분",
      recCalorie: "0Kcal",
      recAmount: "2인분",
      recLevel: "초보환영",
      recIngFrac: " ",
      recPrice: 5000,
      recImg: "http://file.okdab.com/recipe/148291043686100008.jpg",
      reviews: [],
      recipeIngredientList: [
        {
          recIngSeq: 3612,
          recName: "식빵고구마파이",
          ingName: "건블루베리",
          ingAmount: "1/2T",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3613,
          recName: "식빵고구마파이",
          ingName: "고구마",
          ingAmount: "2개(大)",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3614,
          recName: "식빵고구마파이",
          ingName: "꿀",
          ingAmount: "1/2T",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3615,
          recName: "식빵고구마파이",
          ingName: "달걀노른자",
          ingAmount: "1개",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3616,
          recName: "식빵고구마파이",
          ingName: "마요네즈",
          ingAmount: "1T",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3617,
          recName: "식빵고구마파이",
          ingName: "소금",
          ingAmount: "약간",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3618,
          recName: "식빵고구마파이",
          ingName: "식빵",
          ingAmount: "5쪽",
          ingType: "주재료",
          ingPrice: null,
        },
        {
          recIngSeq: 3619,
          recName: "식빵고구마파이",
          ingName: "우유",
          ingAmount: "1cup",
          ingType: "주재료",
          ingPrice: null,
        },
      ],
      recipeProcessList: [
        {
          recProSeq: 31,
          recCode: "180330",
          recOrder: "4",
          recDes:
            "식빵을 반으로 접고 고구마메시가 튀어나오지 않도록 빵 가장자리를 포크를 이용해 꾸욱~눌러준다.",
          proUrl: " ",
          proTip: " ",
        },
        {
          recProSeq: 32,
          recCode: "180330",
          recOrder: "3",
          recDes:
            "식빵을 밀대로 얇게 밀어 납작하게 만들어 준 후 가장자리는 깔끔하게 잘라 낸다.\n식빵의 가장자리에 달걀물을 바르고 고구마메시를 식빵위에 올려준다.",
          proUrl: "http://file.okdab.com/recipe/148291043688000011.jpg",
          proTip: " ",
        },
        {
          recProSeq: 33,
          recCode: "180330",
          recOrder: "1",
          recDes: "깨끗하게 씻은 고구마를 찜통에 넣고 쪄준다.",
          proUrl: "http://file.okdab.com/recipe/148291043686500009.jpg",
          proTip: " ",
        },
        {
          recProSeq: 34,
          recCode: "180330",
          recOrder: "2",
          recDes:
            "잘 쪄진 고구마는 껍질을 벗기고 볼에 담에 으깨고 마요네즈, 우유, 건블루베리, 꿀, 소금을 넣고 으깬 고구마와 잘 섞어 고구마메시를 만들어 준다.",
          proUrl: "http://file.okdab.com/recipe/148291043686800010.jpg",
          proTip: " ",
        },
        {
          recProSeq: 35,
          recCode: "180330",
          recOrder: "5",
          recDes:
            "사선으로 빵에 칼집을 내어 빵 겉에 달걀물을 고루 발라준다.\n200도로 예열된 오븐에 약 6분간 구워준다.",
          proUrl: "http://file.okdab.com/recipe/148291043690000012.jpg",
          proTip: " ",
        },
      ],
    },
  ],
  recipes: [],
  selectedRecipe: {
    recSeq: "",
    recName: "",
    recStep: null,
    recCost: null,
    recCode: "",
    recSummary: "",
    cateCode: "",
    cateFrac: "",
    foodCode: "",
    foodFrac: "",
    cookingTime: "",
    recCalorie: "",
    recAmount: "",
    recLevel: "",
    recIngFrac: "",
    recPrice: 0,
    recImg: "",
    reviews: [],
    recipeIngredientList: [],
    recipeProcessList: [],
  },
  page: 1,
  size: 50,
  totalItem: 0,
  searchString: "",
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipes(state, action) {
      console.log(action.payload);
      state.recipes = action.payload;
    },
    setSelectedRecipe(state, action) {
      for (let i = 0; i < state.recipes.length; i++) {
        if (state.recipes[i].recSeq === action.payload) {
          state.selectedRecipe = state.recipes[i];
        }
      }
    },
    setSelectedRecipeSimlar(state, action) {
      state.selectedRecipe = action.payload;
    },
    setSelectedRecipeReview(state, action) {
      state.selectedRecipe.reviews = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setSize(state, action) {
      state.size = action.payload;
    },
    setTotalItem(state, action) {
      state.totalItem = action.payload;
    },
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    setMyRecipes(state, action) {
      state.myRecipes = action.payload;
    },
  },
});
export const {
  setRecipes,
  setSelectedRecipe,
  setSelectedRecipeReview,
  setPage,
  setSize,
  setTotalItem,
  setSearchString,
  setMyRecipes,
  setSelectedRecipeSimlar,
} = recipeSlice.actions;
export default recipeSlice.reducer;
