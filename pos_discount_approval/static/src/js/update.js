/**@odoo-module **/

import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { useService } from "@web/core/utils/hooks";
import { Component } from "@odoo/owl";
import { usePos } from "@point_of_sale/app/store/pos_hook";

export class UpdateButton extends Component {
	static template = "point_of_sale.UpdateButton";
	setup() {
        this.pos = usePos();
        this.busService = this.env.services.bus_service
        this.busService.addChannel("notifyPosScreen")
        this.busService.subscribe('activate_apply_discount_button', this.activatePosDiscount.bind(this));
    }

    activatePosDiscount(payload){       //bus service to inform Cashier
        this.env.services.action.doAction({
            type: "ir.actions.client",
            tag: "display_notification",
            params: {
                message: "Manager Approved The Discount!",
                sticky: true,
            },
        });

    }

	async onClick() {       //POS screen Update button functionality

        const request = await this.pos.orm.call("discount.request", "search_read", [[["name", "=", this.pos.orders[0].name]]],);
        const request_lines = await this.pos.orm.call("discount.request.line", "search_read", [[["id", "in", request[0].request_line_ids], ["stage", "=", "approved"]]],);

        const orderlines = this.pos.orders[0].orderlines;
        for (let i = 0; i < request_lines.length; i++) {
            const item = request_lines[i];

            for (let j = 0; j < orderlines.length; j++) {
                const line = orderlines[j];

                if (line.uuid === item.name) {
                    // Apply the approved discount
                    line.set_discount(item.discount);
                    line.discount_approved = true;
                }
            }
        }

	}}

ProductScreen.addControlButton({
component: UpdateButton,
});
