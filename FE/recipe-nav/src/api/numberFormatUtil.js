const  numberChage= (price) => {
    

    let priceNum = Number(price);
    //우선 스트링을 숫자로 바꿔주고
    priceNum = Math.round(priceNum /10);
    priceNum = priceNum * 10;
    return priceNum;
};
  
  export { numberChage };
  