import type { FormProps } from 'antd';
import { Breadcrumb, Button, Form, Input, Popover } from "antd";
import type { FC } from "react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { proxyAPI } from '../../../apis/proxy.api';

type FieldType = {
    host?: string;
    port?: string;
    user_proxy?: string;
    pass_proxy?: string;
};

const ProxyCreate:FC = () =>{
    const [form] = Form.useForm();
    const param = useParams();
    const navige = useNavigate();
    const variant = Form.useWatch('variant', form);

    const getByIds=  async () =>{
        const result = await proxyAPI.getById(param.id);
        form.setFieldsValue({
            host: result.data.host,
            port: result.data.port,
            user_proxy: result.data.user_proxy,
            pass_proxy: result.data.pass_proxy,
        });
    }

    useEffect(() =>{
        if(param.id){
            getByIds()
        }
    },[param.id])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const body = {
            host: values.host,
            port: values.port,
            user_proxy: values.user_proxy,
            pass_proxy: values.pass_proxy,
        }
        if (param.id) {
            try {

                const result = await proxyAPI.update(Number(param.id), body)
                if (result.statusCode === 1) {
                    toast.success(`Cập nhật thành công!`)
                    form.resetFields();
                    navige(-1);
                }
            } catch (error: any) {
                console.log(error);
                toast.error(`${error.response.data.message}`)
            }
        } else {
            try {

                const result = await proxyAPI.create(body);
                if (result.statusCode === 1) {
                    toast.success(`Thêm mới thành công!`)
                    form.resetFields();
                }
            } catch (error: any) {
                console.log(error);
                toast.error(`${error.response.data.message}`)
            }
        }

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const onClickPrev = () => {
        navige(-1)
    }

    return <Fragment>
        <Breadcrumb
            items={[
                {
                    title: 'Quản lý proxy',
                },
                {
                    title: <a href="">{param.id ? "Cập nhật" : "Thêm mới"}</a>,
                },
            ]}
        />
        <div className="flex items-center justify-center text-2xl text-gray-700 font-bold mb-7 " >{param.id ? "Cập nhật" : "Thêm mới"} proxy</div>
        <div className="flex items-center justify-center w-full " >
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                variant={variant || 'filled'}
                style={{ width: 700 }}
                initialValues={{ remember: true, variant: 'filled' }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >


                <Form.Item<FieldType>
                    label="Địa chỉ IP"
                    name="host"
                    rules={[{ required: true, message: 'Địa chỉ IP không được bỏ trống!' }]}
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Port"
                    name="port"
                    rules={[{ required: true, message: 'Port không được bỏ trống!' }]}
                >
                    <Input size="large" />
                </Form.Item>

                 <Form.Item<FieldType>
                    label="User"
                    name="user_proxy"
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Pass"
                    name="pass_proxy"
                >
                    <Input size="large" />
                </Form.Item>

                <Form.Item label={null}>
                    <Button color="orange" variant="solid" htmlType="submit">
                        {param.id ? "Cập nhật" : "Thêm mới"}
                    </Button>
                    <Button onClick={onClickPrev} className="ml-2.5" color="orange" type="default">
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </Fragment>
}

export default ProxyCreate