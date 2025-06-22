/** @odoo-module **/

import { _t } from "@web/core/l10n/translation";
import { ProductScreen } from "@point_of_sale/app/screens/product_screen/product_screen";
import { useBarcodeReader } from "@point_of_sale/app/barcode/barcode_reader_hook";
import { patch } from "@web/core/utils/patch";
import { ErrorPopup } from "@point_of_sale/app/errors/popups/error_popup";

patch(ProductScreen.prototype, {
    setup() {
        super.setup(...arguments);
    },

    onNumpadClick(buttonValue) {        // Updated the discount functionality for adding custom discount
        if (this.pos.numpadMode == 'discount_trick') {
            const selectedLine = this.currentOrder.get_selected_orderline();
            let discount = String(selectedLine.requested_discount || ''); // Ensure it's a string
            if (buttonValue === 'Backspace') {
                discount = discount.slice(0, -1);
            } else {
                discount = discount + String(buttonValue);
            }

            if (!isNaN(discount)) {     // avoid empty string on double clicking %Disc button
                const discountValue = parseFloat(discount);

                if (!isNaN(discountValue) && discountValue > 100) {
                    discount = '100';
                }
                selectedLine.requested_discount = discount;
            }
        }

        if (["quantity", "price"].includes(buttonValue)) {      // normal condition excluding discount
            this.numberBuffer.capture();
            this.numberBuffer.reset();
            this.pos.numpadMode = buttonValue;
            return;
        }
        else if(["discount"].includes(buttonValue)) {      // custom condition with discount
            this.numberBuffer.capture();
            this.numberBuffer.reset();
            this.pos.numpadMode = 'discount_trick';
            return;
        }
        this.numberBuffer.sendKey(buttonValue);
    }


});
