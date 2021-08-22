import { Request, Response, NextFunction, Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', (_req: Request, res: Response) => {
    res.render('index', { title: 'Express' });
});

router.get('/health', (_req: Request, _res: Response, next: NextFunction) => {
    next({ data: 'Success' });
});

export default router;
