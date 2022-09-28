import React from "react";
import { Input, Slider } from 'antd';
import { UserOutlined } from "@ant-design/icons";


const BudgetSearch = (props) => {

    return <>
        <div>
            <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
            <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
            <Slider
                range={{
                    draggableTrack: true,
                }}
                step={100}
                tooltip={"open"}
                max={500000}
                min={0}
                defaultValue={[20, 50]}
            />
        </div>
    </>
}

export default BudgetSearch;