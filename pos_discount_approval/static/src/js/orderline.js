/** @odoo-module */

import { Orderline } from "@point_of_sale/app/store/models";
import { patch } from "@web/core/utils/patch";

patch(Orderline.prototype, {
    getDisplayData() {      // Update the orderline with the Requested disc value
        return {
            ...super.getDisplayData(),
            requested_disc: this.requested_discount
        };
    },

});
