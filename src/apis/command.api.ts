import instance from "../helper/api.helper";

export const commandApi = {
    run,
    stop
};



async function run(data: any) {
    const respone = await instance.post("/command/run", data);
    return respone.data
}

async function stop() {
    const respone = await instance.post("/command/stop");
    return respone.data
}