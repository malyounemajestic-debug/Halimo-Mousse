import { PaymentRecord } from '../types';

export const initialPaymentRecords: PaymentRecord[] = [
  {
    id: 'pay-2026-07',
    month: 'July 2026',
    invoiceNumber: 'SWA-INV-8821',
    amount: 300,
    dueDate: '2026-07-05',
    paidDate: '2026-07-04',
    status: 'paid',
    method: 'Zelle / Bank Transfer',
    notes: 'Tuition installment for Month 1 (Onboarding & Foundation modules)'
  },
  {
    id: 'pay-2026-08',
    month: 'August 2026',
    invoiceNumber: 'SWA-INV-9104',
    amount: 300,
    dueDate: '2026-08-05',
    paidDate: '2026-08-05',
    status: 'paid',
    method: 'Stripe Online Portal',
    notes: 'Tuition installment for Month 2 (eBay Dropshipping & Shopify Stores)'
  },
  {
    id: 'pay-2026-09',
    month: 'September 2026',
    invoiceNumber: 'SWA-INV-9430',
    amount: 300,
    dueDate: '2026-09-05',
    paidDate: '2026-09-03',
    status: 'paid',
    method: 'Zelle / Direct Wire',
    notes: 'Tuition installment for Month 3 (KDP & AI Marketing Mastery)'
  },
  {
    id: 'pay-2026-10',
    month: 'October 2026',
    invoiceNumber: 'SWA-INV-9788',
    amount: 300,
    dueDate: '2026-10-05',
    status: 'upcoming',
    method: 'Auto-Pay Scheduled (Stripe)',
    notes: 'Upcoming tuition installment for Month 4 (Truck Dispatching & Paid Ads)'
  },
  {
    id: 'pay-2026-11',
    month: 'November 2026',
    invoiceNumber: 'SWA-INV-1012',
    amount: 300,
    dueDate: '2026-11-05',
    status: 'pending',
    method: 'Pending Invoice',
    notes: 'Tuition installment for Month 5 (Etsy, POD, & Scaling Funnels)'
  },
  {
    id: 'pay-2026-12',
    month: 'December 2026',
    invoiceNumber: 'SWA-INV-1049',
    amount: 300,
    dueDate: '2026-12-05',
    status: 'pending',
    method: 'Pending Invoice',
    notes: 'Tuition installment for Month 6 (Graduation & Portfolio Launch)'
  }
];
