/**@odoo-module **/

import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class SendButton extends Component {
	static template = "point_of_sale.SendButton";
	setup() {
	    this.pos = usePos();
	}

	async onClick() {       // Send the discount request to the backend- for approval
        const orderlines = this.pos.orders[0].orderlines;
        const discountData = orderlines.map((line) => {
            return {
                product_name: line.full_product_name,
                requested_discount: line.requested_discount || '0',  // fallback if undefined
                uuid: line.uuid,
                product_id: line.product.id,
            };
        });

        const request_check = await this.pos.orm.call("discount.request", "search", [[["name", "=", this.pos.orders[0].name]]],);
        if (request_check.length>0){
            await this.pos.orm.call("discount.request", "unlink", request_check,);
        }

        var request_vals = {
            'name': this.pos.orders[0].name,
        }
        var request = await this.pos.orm.call("discount.request","create",[request_vals])

        for (let i = 0; i < discountData.length; i++) {
            const item = discountData[i];
            var request_line_vals = {
                'name': item.uuid,
                'discount_request_id': request,
                'product_id': item.product_id,
                'discount': item.requested_discount,
            }
            var request_line = await this.pos.orm.call("discount.request.line","create",[request_line_vals])
        }
	}
}

ProductScreen.addControlButton({
component: SendButton,
});
