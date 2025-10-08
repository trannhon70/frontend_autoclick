import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row, Space } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { FaPlay, FaRegStopCircle } from "react-icons/fa";
import { proxyAPI } from '../../apis/proxy.api';
import { commandApi } from '../../apis/command.api';

type FieldType = {
    keyword?: string;
    domain?: string;
    quantity?: number
};

const ComponentClickAds: FC = () => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true)
        commandApi.run(values).then((_res: any) => {
            setLoading(false)
        }).catch((_err: any) => {
            console.log(_err);
            setLoading(false)
        })


    };
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onClickPrev = () => {

    }
    return <>
        <div className="flex items-center justify-center font-semibold text-2xl uppercase text-green-600" >
            Thực hiện click ads
        </div>
        <div className="flex items-center justify-center w-full mt-4 " >

            <Form
                form={form}
                name="basic"
                wrapperCol={{ span: 24 }}
                variant={variant || 'filled'}
                layout="vertical"
                style={{ width: '1200px' }}
                initialValues={{ variant: 'filled' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Row gutter={{ md: 24 }}>

                    <Col span={24}>
                        <Row gutter={{ md: 24 }}>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="Từ khóa tìm kiếm :"
                                    name="keyword"
                                    rules={[
                                        { required: true, message: 'từ khóa không được bỏ trống!' }
                                    ]}
                                >
                                    <Space.Compact style={{ width: '100%' }} >
                                        <Input size="large" style={{ width: '80%' }} defaultValue="" />
                                        <Input size="large" style={{ width: '20%' }} defaultValue="key" />
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="Nhập domain :"
                                    name="domain"
                                    rules={[
                                        { required: true, message: 'Domain không được bỏ trống!' },
                                    ]}

                                >
                                    <Space.Compact style={{ width: '100%' }} >
                                        <Input size="large" style={{ width: '80%' }} defaultValue="" />
                                        <Input size="large" style={{ width: '20%' }} defaultValue="web" />
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item<FieldType>
                                    label="Nhập số lần click :"
                                    name="quantity"
                                    rules={[
                                        { required: true, message: 'số lần click không được bỏ trống!' },
                                    ]}

                                >
                                    <Space.Compact style={{ width: '100%' }} >
                                        <Input size="large" style={{ width: '80%' }} defaultValue="" />
                                        <Input size="large" style={{ width: '20%' }} defaultValue="lần" />
                                    </Space.Compact>
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item className='flex items-center justify-end' label={null}>
                                    <Button loading={loading} icon={<FaPlay />} color="primary" variant="solid" htmlType="submit">
                                        Chạy
                                    </Button>
                                    <Button icon={<FaRegStopCircle color='red' />} onClick={onClickPrev} className="ml-2.5" color="orange" variant="solid" type="default">
                                        Dừng
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Col>
                </Row>

            </Form>

        </div>
    </>
}

export default ComponentClickAds