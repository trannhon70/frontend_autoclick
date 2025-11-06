import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row, Space } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { FaPlay, FaRegStopCircle } from "react-icons/fa";
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

    const onClickStop = async () => {
        await commandApi.stop()
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
                                <Form.Item
                                    label="Từ khóa tìm kiếm:"
                                    required
                                >
                                    <Form.List
                                        name="keywords"
                                        initialValue={[""]}
                                        rules={[
                                            {
                                                validator: async (_, names) => {
                                                    if (!names || names.length < 1) {
                                                        return Promise.reject(new Error("Phải có ít nhất 1 từ khóa!"));
                                                    }
                                                },
                                            },
                                        ]}
                                    >
                                        {(fields, { add, remove }) => (
                                            <div className="w-[100%]">
                                                {fields.map(({ key, name, ...restField }) => (
                                                    <div className="flex items-start gap-2.5 justify-between" >
                                                        <Form.Item
                                                            style={{ width: '100%' }}
                                                            className="w-[100%]"
                                                            {...restField}
                                                            name={name}
                                                            rules={[
                                                                { required: true, message: "Không được để trống!" },
                                                            ]}
                                                        >
                                                            <Input style={{ width: '100%' }} className="w-[100%]" placeholder="Nhập từ khóa..." />
                                                        </Form.Item>

                                                        {fields.length > 1 && (
                                                            <MinusCircleOutlined
                                                                onClick={() => remove(name)}
                                                                style={{ color: "red", marginTop: '10px' }}
                                                                width={100}
                                                            />
                                                        )}
                                                    </div>
                                                ))}

                                                <Form.Item>
                                                    <Button
                                                        type="dashed"
                                                        onClick={() => add()}
                                                        icon={<PlusOutlined />}
                                                        block
                                                    >
                                                        Thêm từ khóa
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        )}
                                    </Form.List>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Col span={24}>
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
                                <Col span={24}>
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
                            </Col>

                            <Col span={24}>
                                <Form.Item className='flex items-center justify-end' label={null}>
                                    <Button loading={loading} icon={<FaPlay />} color="primary" variant="solid" htmlType="submit">
                                        Chạy
                                    </Button>
                                    <Button icon={<FaRegStopCircle color='red' />} onClick={onClickStop} className="ml-2.5" color="orange" variant="solid" type="default">
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