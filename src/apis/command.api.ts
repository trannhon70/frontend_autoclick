import instance from "../helper/api.helper";

export const commandApi = {
    run,
    stop,
    run_v1
};



async function run(data: any) {
    const respone = await instance.post("/command/run", data);
    return respone.data
}

async function run_v1(data: any) {
    const respone = await instance.post("/command/run-v1", data);
    return respone.data
}

async function stop() {
    const respone = await instance.post("/command/stop");
    return respone.data
}