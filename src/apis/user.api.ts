import instance from "../helper/api.helper";

export const userAPI = {
    login,
    create,
    getByIdUser
};

function login(data : any) {
    return instance.post("/users/login", data);
}

function create(data : any) {
    return instance.post("/users/create", data);
}

function getByIdUser() {
    return instance.get("/users/get-by-id");
}

