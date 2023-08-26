import { PurchaseService } from "./purchase.service";
import { Response, NextFunction } from "express";

export class PurchaseController {
   
    static async getData(req:any, res:Response, next:NextFunction) {
        try {
            const { fecha } = req.params;
            const dias = parseInt(req.query.dias) || 1;
            const apiUrl = `${process.env.URI_API_RECRUIT}/${fecha}`;
    
            const startDate = new Date(fecha);
    
            const statistics = await PurchaseService.getDataFromAPI(apiUrl, startDate, dias);
    
            res.json(statistics);
        } catch (error) {
            console.error('Error:', error.message);
            res.status(400).json({ error: 'bad request' });
        }
    }

}


