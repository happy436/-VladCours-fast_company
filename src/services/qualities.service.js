import httpService from "./http.services";

const qualityEndPoint = "quality/";

const qualityService = {
    get: async () => {
        const req = await httpService.get(qualityEndPoint);
        return req.data;
    }
};

export default qualityService;
