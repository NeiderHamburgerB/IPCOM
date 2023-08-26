
import { Router } from 'express'
import { ExcelController } from './excel.controller'

export class ExcelRoutes {

    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        
        this.router.get('/generate-json',ExcelController.generateJson)
      
    }

}

const excelRoutes = new ExcelRoutes()
export default excelRoutes.router