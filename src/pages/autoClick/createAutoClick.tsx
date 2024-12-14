import { FC, Fragment } from "react";
import { Breadcrumb } from 'antd';

const CreateAutoClick: FC = () => {
    return <Fragment>
        <Breadcrumb
            items={[
                {
                    title: 'auto click',
                },
                {
                    title: <a href="">Thêm mới</a>,
                },
            ]}
        />
    </Fragment>
}

export default CreateAutoClick