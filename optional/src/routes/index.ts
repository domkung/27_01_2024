import express from "express";
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const users = async (request: Request, response: Response, next: NextFunction) => {
    let result: AxiosResponse = await axios.get('https://dummyjson.com/users');
    const data = result?.data?.users;
    const departments = [...new Set(data.map((res: any) => res.company.department))];
    const response_data = departments.reduce((acc: any, department: any) => {
        const filter_data = data?.filter((res: any) => res.company.department === department);
        const age = filter_data.map((item: any) => item.age);
        const max = Math.max(...age);
        const min = Math.min(...age);
        const main_hair = [...new Set(filter_data.map((res: any) => res.hair.color))];
        const response_hair = main_hair.reduce((object_hear: any, hair: any) => {
            object_hear[hair] = filter_data?.filter((r: any) => r.hair.color.toUpperCase() === hair.toUpperCase()).length;
            return object_hear;
        }, {});
        const response_address = filter_data.reduce((object_address: any, detail: any) => {
            object_address[detail.firstName+detail.lastName]=detail.address.address+","+detail.address.city+","+detail.address.postalCode+","+detail.address.state;
            return object_address;
        }, {});
        acc[department] = {
            "male": filter_data?.filter((res: any) => res.gender.toUpperCase() === "MALE").length,
            "female": filter_data?.filter((res: any) => res.gender.toUpperCase() === "FEMALE").length,
            "ageRange": min != max ? (min + "-" + max) : min,
            "hair": response_hair,
            "addressUser":response_address
        };
        return acc;
    }, {});
    
    return response.send(JSON.stringify(response_data, null, 2));
};

const router = express.Router();
router.use('/', users);
export default router;