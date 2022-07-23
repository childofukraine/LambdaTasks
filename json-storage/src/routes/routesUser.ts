import { Router } from 'express';

import { createReq,getRes} from '../controllers/controllersUser';

const router = Router();

router.post('/*[A-Za-z0-9_]', createReq);

router.get('/*[A-Za-z0-9_]', getRes);

export default router;