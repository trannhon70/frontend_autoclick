import instance from "../helper/api.helper";

export const proxyAPI = {
    create,
    getPaging,
    getById,
    update,
    deletes,
    play,
    stop
};



async function create(data : any) {
    const respone = await instance.post("/proxy/create", data);
    return respone.data
}

async function play(data : any) {
    const respone = await instance.post("/proxy/play", data);
    return respone.data
}

async function stop() {
    const respone = await instance.post("/proxy/stop");
    return respone.data
}
async function getPaging(query: any) {
    const response = await instance.get(`/proxy/get-paging?pageIndex=${query.pageIndex}&pageSize=${query.pageSize}&search=${query.search}`);
    return response.data
}

async function getById(id: any) {
    const response = await instance.get(`/proxy/get-by-id/${id}`);
    return response.data
}

async function update(id:number, body: any) {
    const response = await instance.put(`/proxy/update/${id}`,body);
    return response.data
}


async function deletes(id: any) {
    const response = await instance.delete(`/proxy/delete/${id}`);
    return response.data
}