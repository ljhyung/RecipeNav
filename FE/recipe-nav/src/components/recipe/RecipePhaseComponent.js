import { Image } from "antd";
import style from "./RecipePhaseComponent.module.css";
import { proxyImageURL } from "../../api";
/*
  recProSeq: 1,
          recCode: "195453",
          recOrder: "5",
          recDes:
            "모양을 낸 반죽에 밀가루를 묻히고, 계란을 푼 계란물을 묻혀준다.",
          proUrl: "http://file.okdab.com/recipe/148299577271000135.jpg",
          proTip: " ",
*/

const RecipePhaseComponent = (props) => {
  const phase = props.phase;
  return (
    <>
      <div className={style["phase-container"]}>
        {phase.proUrl.trim() !== "" && phase.proUrl !== null && (
          <div className={style["imgage-box"]}>
            <Image src={proxyImageURL + phase.proUrl}></Image>
          </div>
        )}
        <div className={style["desc-box"]}>
          <div>
            <h2>Step {props.recOrder}</h2>
          </div>
          <div className={style["split-line"]}></div>
          <div>
            <h4>{phase.recDes}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipePhaseComponent;
