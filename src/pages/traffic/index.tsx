import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Col, Form, Input, Row, Space } from "antd";
import type { FC } from "react";
import { Fragment, useState } from "react";
import { FaPlay, FaRegStopCircle } from "react-icons/fa";
import { toast } from 'react-toastify';
import { proxyAPI } from '../../apis/proxy.api';
type FieldType = {
    urls?: any[];
    time?: number;
    page?: number;
    chats?: any[];
    quantity?: number;
};
const Traffic: FC = () => {
    const [form] = Form.useForm();
    const variant = Form.useWatch('variant', form);
    const [loading, setLoading] = useState<boolean>(false)
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        const body = {
            urls: Array.from({ length: Number(values.quantity) }, () => values.urls).flat(),
            time: Number(values.time) * 1000,
            page: values.page,
            chats: values.chats
        }

        proxyAPI.play(body).then((_res: any) => {
            setLoading(true)
        }).catch((_err: any) => {
            // setLoading(false)
        })

    };
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        toast.warning('Link và chat không được bỏ trống!')
    };

    const onClickPrev = () => {
        proxyAPI.stop().then((_res: any) => {
            setLoading(false)
        }).catch((_err: any) => {
            setLoading(false)
        })
    }
    return <Fragment>
        <div className="flex items-center justify-center font-semibold text-2xl uppercase text-green-600" >
            Thực hiện traffic website
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
                    <Col span={12}>
                        <Row gutter={{ md: 24 }}>
                            <Col span={24}>
                                <Form.List
                                    name="urls"
                                    rules={[
                                        {
                                            validator: async (_, urls) => {
                                                if (!urls || urls.length < 1) {
                                                    return Promise.reject(new Error('Phải nhập ít nhất 1 link!'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={name}
                                                        rules={[{ required: true, message: 'Link không được bỏ trống!' }]}
                                                        style={{ flex: 1, width: '100%' }}
                                                    >
                                                        <Input style={{ width: '500px' }} placeholder="Nhập link" size="large" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(name)}
                                                        style={{ color: 'red' }}
                                                    />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Thêm link
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={12}>
                        <Row gutter={{ md: 24 }}>
                            <Col span={24}>
                                <Form.Item<FieldType>
                                    label="Thời gian ở lại trang web"
                                    name="time"
                                    rules={[
                                        { required: true, message: 'Thời gian ở lại trang web không được bỏ trống!' },
                                        { type: 'number', min: 179, message: 'Thời gian phải từ 180 giây trở lên!' }
                                    ]}
                                    getValueFromEvent={(e) => Number(e.target.value)}
                                >
                                    <Space.Compact style={{ width: '100%' }} >
                                        <Input type='number' size="large" style={{ width: '80%' }} defaultValue="" />
                                        <Input size="large" style={{ width: '20%' }} defaultValue="giây" />
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item<FieldType>
                                    label="số lượng page chạy cùng lúc"
                                    name="page"
                                    rules={[
                                        { required: true, message: 'số lượng page không được bỏ trống!' },
                                        { type: 'number', min: 1, message: 'số lượng page từ 1 page trở lên!' }
                                    ]}
                                    getValueFromEvent={(e) => Number(e.target.value)}
                                >
                                    <Space.Compact style={{ width: '100%' }} >
                                        <Input type='number' size="large" style={{ width: '80%' }} defaultValue="" />
                                        <Input size="large" style={{ width: '20%' }} defaultValue="trang" />
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item<FieldType>
                                    label="Số lần chạy"
                                    name="quantity"
                                    rules={[
                                        { required: true, message: 'Số lần chạy không được bỏ trống!' },
                                        { type: 'number', min: 1, message: 'Số lần chạy từ 1 trở lên!' }
                                    ]}
                                    getValueFromEvent={(e) => Number(e.target.value)}
                                >
                                    <Space.Compact style={{ width: '100%' }} >
                                        <Input type='number' size="large" style={{ width: '80%' }} defaultValue="" />
                                        <Input size="large" style={{ width: '20%' }} defaultValue="lần" />
                                    </Space.Compact>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.List
                                    name="chats"
                                    rules={[
                                        {
                                            validator: async (_, urls) => {
                                                if (!urls || urls.length < 1) {
                                                    return Promise.reject(new Error('Phải nhập ít nhất 1 chat!'));
                                                }
                                            },
                                        },
                                    ]}
                                >
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Space
                                                    key={key}
                                                    style={{ display: 'flex', marginBottom: 8, width: '100%' }}
                                                    align="baseline"
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={name}
                                                        rules={[{ required: true, message: 'chat không được bỏ trống!' }]}
                                                        style={{ flex: 1, width: '100%' }}
                                                    >
                                                        <Input style={{ width: '500px' }} placeholder="Nhập chat" size="large" />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        onClick={() => remove(name)}
                                                        style={{ color: 'red' }}
                                                    />
                                                </Space>
                                            ))}

                                            <Form.Item>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
                                                    Thêm chat
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            </Col>
                        </Row>

                    </Col>
                </Row>
                <Row gutter={16}>

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
            </Form>

        </div>
    </Fragment>
}

export default Traffic