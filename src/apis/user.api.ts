import instance from "../helper/api.helper";

export const userAPI = {
    login,
    create,
    getByIdUser
};

function login(data : any) {
    return instance.post("/user/login", data);
}

function create(data : any) {
    return instance.post("/user/create", data);
}

function getByIdUser() {
    return instance.get("/user/get-by-id");
}

