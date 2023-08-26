import { ExcelService } from "./excel.service"
import { Response, NextFunction } from "express"

export class ExcelController {

    static generateJson(req: any, res: Response, next: NextFunction) {
        try {
            const filePath = 'test.xlsx';
            
            const result = ExcelService.processXLSXFile(filePath);
            
            res.send(JSON.stringify(result, null, 2));

        } catch (error) {
            console.error('Error:', error.message);
            res.status(400).json({ error: 'bad request' });
        }
    }

}
