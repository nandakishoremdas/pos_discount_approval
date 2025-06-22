# -*- coding: utf-8 -*-
from odoo import fields, models

class DiscountRequest(models.Model):
    """Set the Discount Request for the approval"""
    _name = 'discount.request'

    name = fields.Char(string="Name")
    request_line_ids = fields.One2many('discount.request.line','discount_request_id')

    def action_discount_submit(self):
        '''On submitting: A badge on the POS pops-up '''
        self.env['bus.bus']._sendone('notifyPosScreen', 'activate_apply_discount_button', {'order_name': self.name})
        return
