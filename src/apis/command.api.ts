import instance from "../helper/api.helper";

export const commandApi = {
    run,
};



async function run(data: any) {
    const respone = await instance.post("/command/run", data);
    return respone.data
}