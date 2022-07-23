import {RequestHandler} from 'express';

import { UserInfo } from '../models/modelsUser';

let USERINFO: UserInfo[] = [];

export const createReq: RequestHandler = (req,res,next) => {
    const info = req.body
    const newReq = new UserInfo(info);

    USERINFO.push(newReq);

    res.status(201).json({message: 'Created response.',yourResponse: newReq});
};

export const getRes: RequestHandler = (req,res,next) => {
    res.json({response : USERINFO});
    USERINFO = []
};
