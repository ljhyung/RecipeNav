import { StarFilled } from "@ant-design/icons";

const RecipeGradeComponet = (props) => {
  const grade = props.grade;
  let gradeArr = new Array(grade);
  for (let i = 0; i < grade; i++) {
    gradeArr[i] = i;
  }
  return (
    <>
      {gradeArr.map((item, i) => {
        return <StarFilled key={i} />;
      })}
    </>
  );
};

export default RecipeGradeComponet;
