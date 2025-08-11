import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import type { GetProps, TableProps } from 'antd';
import { Breadcrumb, Input, Tooltip } from "antd";
import moment from "moment";
import type { FC } from 'react';
import { Fragment, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ErrorComponent from "../../../components/error";
import LoadingLayout from "../../../components/loadingLayout";
import TableComponent from "../../../components/table";
import { proxyAPI } from "../../../apis/proxy.api";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const ProxyManage:FC = () =>{
     const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(25);
    const [search, setSearch] = useState<string>("");
    const navige = useNavigate();
    const queryClient = useQueryClient();


    const { data, isError, isLoading } = useQuery({
        queryKey: ["label", { pageIndex, pageSize, search }],
        queryFn: () => proxyAPI.getPaging({ pageIndex, pageSize, search }),
        placeholderData: keepPreviousData,
        staleTime: 5000,
    });

    if (isLoading) return <LoadingLayout />
    if (isError) return <ErrorComponent />

    const columns: TableProps<any>['columns'] = [
        {
            title: "STT",
            dataIndex: 'age',
            key: 'age',
            render(_value, _record, index) {
                return <Fragment>{index + 1}</Fragment>
            },
            width:50
        },
       
        {
            title: "IP",
            dataIndex: 'host',
            key: 'host',
            render(_value, _record, _index) {
                return <Fragment>{_value }</Fragment>
            },
        },

        {
            title: "Port",
            dataIndex: 'port',
            key: 'port',
            render(_value, _record, _index) {
                return <Fragment>{_value }</Fragment>
            },
        },

         {
            title: "user proxy",
            dataIndex: 'user_proxy',
            key: 'user_proxy',
            render(_value, _record, _index) {
                return <Fragment>{_value }</Fragment>
            },
        },

         {
            title: "pass proxy",
            dataIndex: 'pass_proxy',
            key: 'pass_proxy',
            render(_value, _record, _index) {
                return <Fragment>{_value }</Fragment>
            },
        },

        {
            title: "Người tạo",
            dataIndex: 'user',
            key: 'user',
            render(_value, _record, _index) {
                return <Fragment>{_value.fullName }</Fragment>
            },
        },

        {
            title: "Thời gian tạo",
            key: 'created_at',
            dataIndex: 'created_at',
            render(value, _record, _index) {
                return <Fragment>{moment(value * 1000).format('DD-MM-YYYY HH:mm')}</Fragment>
            },
        },
        {
            title: "Thao tác",
            key: 'delete',
            dataIndex: 'delete',
            render(_value, record, _index) {
                return <div className='flex gap-4 ' >
                    <Tooltip title="Xóa">
                        <MdDelete className="cursor-pointer" onClick={() => onClickDelete(record.id)} color="red" size={25} />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                        <BiSolidEdit className="cursor-pointer" onClick={() => onClickEdit(record.id)} color="#008236" size={25} />
                    </Tooltip>
                </div>
            },
            width:100
        },
    ];

    const onClickEdit = (id: number) => {
        navige(`/quan-ly-proxy/cap-nhat/${id}`)
    }

    const onClickDelete = async (id: number) => {
        try {
            const result = await proxyAPI.deletes( id )
            if (result.statusCode === 1) {
                toast.success(`Xóa nhãn thành công!`);
                queryClient.invalidateQueries({ queryKey: ["label"] });
            }
        } catch (error: any) {
            console.log(error);
            toast.error(`${error.response.data.message}`)
        }
    }

    const onChangePage = (page: number, pageSize: number) => {
        setPageIndex(page)
        setPageSize(pageSize)
    }

    const onSearch: SearchProps['onSearch'] = (value, _e, _info) => {
        setSearch(value);
    }
    return <Fragment>
        <Breadcrumb
            items={[
                {
                    title: 'Quản lý Label',
                },
                {
                    title: <a href="">danh sách</a>,
                },
            ]}
        />
        <div className="w-[300px] my-2">
            <Search

                placeholder="Nhập tên Label"
                allowClear
                enterButton="Tìm kiếm"
                size="middle"
                onSearch={onSearch}
            />
        </div>
        <TableComponent columns={columns} data={data.data} total={data.total} pageIndex={pageIndex} pageSize={pageSize} onChangePage={onChangePage} />
    </Fragment>
}

export default ProxyManage