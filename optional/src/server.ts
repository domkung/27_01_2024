import http from 'http';
import express, { Express } from "express";
import morgan from 'morgan';
import routers from './routes/index';
const router: Express = express();

router.use(morgan('dev'));

router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((request, response, next) => {
    response.header('Content-Type', 'application/json')
    response.header("Access-Controller-Allow-Origin", "*");
    response.header("Access-Controller-Allow-Headers", "origin, X-Requested-With,Content-Type,Accept, Authorization");
    if (request.method === "OPTIONS") {
        response.header("Access-Controller-Allow-Methods", "GET PATCH DELETE POST PUT");
        return response.status(200).json({});
    }
    next();
});
router.use('/', routers);

router.use((request, response, next) => {
    const error = new Error('not Found');
    return response.status(404).json({
        message: error.message
    });
});
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => console.log("The Server is runing on port " + PORT))