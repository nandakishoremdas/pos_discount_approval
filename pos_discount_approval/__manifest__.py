# -*- coding: utf-8 -*-
{
    'name': 'POS Discount Approval',
    'version': '17.0.1.0.0',
    'category': 'POS',
    'summary': 'POS Discount Manager Approval Workflow',
    'description': 'Adds a POS discount approval flow. Discounts are stored '
                   'temporarily and applied only after backend approval via a '
                   'new approval menu. Only approved discounts are applied to '
                   'the order or specific lines using an "Update" button in POS.',
    'maintainer': '',
    'company': '',
    'website': '',
    'depends': ['point_of_sale'],
    'data': [
        'security/discount_approval_groups.xml',
        'security/ir.model.access.csv',
        'views/discount_request_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
        ],
        'point_of_sale._assets_pos': [
            'pos_discount_approval/static/src/**/*',
        ]
    },
    'images': ['static/description/banner.jpg'],
    'license': 'AGPL-3',
    'installable': True,
    'auto_install': False,
    'application': False,
}
