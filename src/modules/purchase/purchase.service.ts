import axios from "axios";

export class PurchaseService{

    static async getDataFromAPI(apiUrl:string, startDate:Date, dias:number) {
        try {
            const response = await axios.get(apiUrl);
            const data = response.data;
    
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + dias - 1);
    
            const statistics = data.reduce((acc:any, item:any) => {
                const itemDate = new Date(item.date);
                if (itemDate >= startDate && itemDate <= endDate) {
                    if (item.compro) {
                        const monto = item.monto || 0;
                        acc.total += monto;
    
                        if (item.tdc === "amex") {
                            if (!acc.comprasPorTDC[item.tdc]) {
                                acc.comprasPorTDC[item.tdc] = 0;
                            }
                            acc.comprasPorTDC[item.tdc] += monto;
                        }
    
                        if (item.tdc === "master gold" || item.tdc === "visa gold") {
                            acc.comprasPorTDC.oro += monto;
                        }
    
                        acc.compraMasAlta = Math.max(acc.compraMasAlta, monto);
                    } else {
                        acc.nocompraron++;
                    }
                }
                return acc;
            }, {
                total: 0,
                comprasPorTDC: {
                    amex: 0,
                    oro: 0
                },
                nocompraron: 0,
                compraMasAlta: 0
            });
    
            statistics.total = Math.round(statistics.total * 100) / 100;
            statistics.comprasPorTDC.amex = Math.round(statistics.comprasPorTDC.amex);
            statistics.comprasPorTDC.oro = Math.round(statistics.comprasPorTDC.oro);
            statistics.compraMasAlta = Math.round(statistics.compraMasAlta);
    
            return statistics;
        } catch (error) {
            throw new Error('Error fetching data from API');
        }
    }

    




}