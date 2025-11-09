import instance from "../helper/api.helper";

export const historyApi = {
    getAll,
};

async function getAll() {
    const respone = await instance.get("/history/get-All");
    return respone.data
}
