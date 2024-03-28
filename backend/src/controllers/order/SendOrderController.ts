import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController{
    async handle(req: Request, res: Response){
        const { order_id } = req.body;

        const addItem = new SendOrderService();

        const order = await addItem.execute({
            order_id 
        });

        return res.json(order);
    }
}

export { SendOrderController };
