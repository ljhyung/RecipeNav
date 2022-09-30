import { FileUnknownOutlined } from "@ant-design/icons";
import style from "./EmptySearchPage.module.css";

const EmptySearchPage = () => {
  return (
    <>
      <div className={style["empty-box"]}>
        <FileUnknownOutlined />
      </div>
      <div>
        <h2>적합한 리소스를 찾을 수 없습니다.</h2>
        <h4>더 유용한 서비스가 되기 위해 노력하겠습니다.</h4>
      </div>
    </>
  );
};

export default EmptySearchPage;
