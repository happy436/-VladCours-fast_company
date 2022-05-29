import httpService from "./http.services";

const professionEndPoint = "profession/";

const professionService = {
    get: async () => {
        const req = await httpService.get(professionEndPoint);
        return req.data;
    }
};

export default professionService;
