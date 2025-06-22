# -*- coding: utf-8 -*-
from odoo import fields, models, _


class DiscountRequestLine(models.Model):
    """Set the Discount Request Line for the approval"""
    _name = 'discount.request.line'

    name = fields.Char(string="Name(Line unique id)")
    discount_request_id = fields.Many2one('discount.request', string='Discount Request')
    product_id = fields.Many2one('product.product', string='Product')
    discount = fields.Float(string='Discount %')
    stage = fields.Selection([("draft", "Draft"), ("approved", "Approved")],
                             default="draft", readonly=True)

    def action_approve_discount_line(self):
        '''Update discount request line and inform user'''
        self.stage = 'approved'
        return {
            "type": "ir.actions.client",
            "tag": "display_notification",
            "params": {
                "title": _("Submit Approval"),
                "message": _(
                    "Click 'Submit' button to inform POS Cashier."),
                "sticky": False,
                'next': {
                    'type': 'ir.actions.act_window_close',
                }
            },
        }
