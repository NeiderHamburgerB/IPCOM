import { Router } from 'express'
import { PurchaseController } from './purchase.controller'

export class PurchaseRoutes {

    public router: Router = Router()

    constructor() {
        this.config()
    }

    config(): void {
        
        this.router.get('/resumen/:fecha',PurchaseController.getData)
      
    }

}

const purchaseRoutes = new PurchaseRoutes();
export default purchaseRoutes.router;