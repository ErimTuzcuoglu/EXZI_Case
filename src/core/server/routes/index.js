import {routerGenerator} from '../routerGenerator';
import userRouter from './user';

const router = routerGenerator.createRouter();

router.use('/users', userRouter);

export default router;

