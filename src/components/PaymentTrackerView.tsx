import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Receipt, 
  Download, 
  ShieldCheck, 
  DollarSign, 
  Plus, 
  ExternalLink,
  Lock
} from 'lucide-react';
import { PaymentRecord } from '../types';

interface PaymentTrackerViewProps {
  payments: PaymentRecord[];
  onRecordPayment: (payment: Omit<PaymentRecord, 'id'>) => void;
}

export const PaymentTrackerView: React.FC<PaymentTrackerViewProps> = ({
  payments,
  onRecordPayment
}) => {
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<PaymentRecord | null>(null);

  // New payment form
  const [payMonth, setPayMonth] = useState('October 2026');
  const [payMethod, setPayMethod] = useState('Zelle');
  const [payNotes, setPayNotes] = useState('Tuition fee payment processed');

  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalUpcoming = payments
    .filter(p => p.status !== 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const nextDue = payments.find(p => p.status === 'upcoming') || payments[3];

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    onRecordPayment({
      month: payMonth,
      invoiceNumber: `SWA-INV-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: 300,
      dueDate: '2026-10-05',
      paidDate: new Date().toISOString().split('T')[0],
      status: 'paid',
      method: payMethod,
      notes: payNotes
    });
    setShowPayModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tuition & School Fee Tracker
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Somali Wealth Academy monthly tuition is fixed at $300.00/month.
          </p>
        </div>

        <button
          onClick={() => setShowPayModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-xs transition-colors self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Record / Submit Payment</span>
        </button>
      </div>

      {/* Hero Payment Reminder Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border border-emerald-900/60 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <AlertCircle className="w-4 h-4" />
              <span>Automatic Payment Reminder · Month 4 Tuition</span>
            </div>

            <h2 className="text-xl font-bold text-white">
              Next School Fee Due: {nextDue?.dueDate} ($300.00)
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Halimo Mousse, your September tuition is fully verified. Your next installment of $300 for October will cover advanced Truck Dispatching and TikTok Shop scaling.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-300 font-medium">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                Verified Student Account: SWA-2026-HM92
              </span>
              <span className="text-slate-400">·</span>
              <span className="text-amber-300 font-semibold">Due in 8 Days</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
            <button
              onClick={() => setShowPayModal(true)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              <CreditCard className="w-4 h-4" />
              <span>Pay Online Now ($300)</span>
            </button>
            <div className="text-[11px] text-center text-slate-400">
              Accepted: Stripe · Zelle · Wire · PayPal
            </div>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Monthly Tuition Rate
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              $300
            </span>
            <span className="text-xs text-slate-500">/ month</span>
          </div>
          <p className="mt-2 text-[11px] text-emerald-600 font-medium">
            Fixed cohort tuition guarantee
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Total Paid to Date
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
              ${totalPaid}.00
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 font-medium">
            3 Months Settled (Jul, Aug, Sep)
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Remaining Term Balance
          </span>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              ${totalUpcoming}.00
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 font-medium">
            Oct, Nov, Dec installments
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Account Good Standing
          </span>
          <div className="mt-2 flex items-center gap-2">
            <ShieldCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            <span className="text-base font-bold text-emerald-700 dark:text-emerald-400">
              Active & In Good Standing
            </span>
          </div>
          <p className="mt-2 text-[11px] text-slate-500 font-medium">
            Full access to all course modules
          </p>
        </div>
      </div>

      {/* Payment History Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              Tuition Ledger & Payment History
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Official Somali Wealth Academy student financial records
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Billing Month</th>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {payments.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white">
                    {item.month}
                    {item.notes && (
                      <span className="block text-[11px] font-normal text-slate-500">
                        {item.notes}
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-4 font-mono text-xs text-slate-600 dark:text-slate-400">
                    {item.invoiceNumber}
                  </td>

                  <td className="py-4 px-4 tabular-nums font-bold text-slate-900 dark:text-white">
                    ${item.amount}.00
                  </td>

                  <td className="py-4 px-4 tabular-nums text-xs text-slate-600 dark:text-slate-400">
                    {item.dueDate}
                  </td>

                  <td className="py-4 px-4 text-xs text-slate-600 dark:text-slate-300">
                    {item.method}
                  </td>

                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-semibold ${
                      item.status === 'paid'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : item.status === 'upcoming'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>
                      {item.status === 'paid' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span className="capitalize">{item.status}</span>
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(item)}
                      className="px-3 py-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 rounded-lg transition-colors"
                    >
                      {item.status === 'paid' ? 'Receipt' : 'Details'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Submission Modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Submit School Fee Payment ($300)
            </h3>
            <p className="text-xs text-slate-500">
              Record monthly installment for Somali Wealth Academy tuition.
            </p>

            <form onSubmit={handleConfirmPayment} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Tuition Month
                </label>
                <select
                  value={payMonth}
                  onChange={(e) => setPayMonth(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="October 2026">October 2026 ($300.00)</option>
                  <option value="November 2026">November 2026 ($300.00)</option>
                  <option value="December 2026">December 2026 ($300.00)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Payment Method
                </label>
                <select
                  value={payMethod}
                  onChange={(e) => setPayMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Zelle / Direct Bank Transfer">Zelle / Direct Bank Transfer</option>
                  <option value="Stripe Debit/Credit Card">Stripe Debit/Credit Card</option>
                  <option value="PayPal Transfer">PayPal Transfer</option>
                  <option value="Wire Transfer">Bank Wire Transfer</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Confirmation Notes / Reference
                </label>
                <input
                  type="text"
                  value={payNotes}
                  onChange={(e) => setPayNotes(e.target.value)}
                  placeholder="e.g. Reference #ZEL-928192"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPayModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                >
                  Record $300 Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-600">Somali Wealth Academy</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Official Tuition Invoice: {selectedInvoice.invoiceNumber}
                </h3>
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600 text-xs">
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between py-1 border-b">
                <span>Student Name:</span>
                <span className="font-bold text-slate-900 dark:text-white">Halimo Mousse</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Student ID:</span>
                <span className="font-mono">SWA-2026-HM92</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Billing Period:</span>
                <span className="font-semibold">{selectedInvoice.month}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Tuition Amount:</span>
                <span className="font-bold text-emerald-600 text-sm">${selectedInvoice.amount}.00</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Status:</span>
                <span className="font-semibold uppercase">{selectedInvoice.status}</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span>Payment Method:</span>
                <span>{selectedInvoice.method}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  alert("Invoice receipt downloaded successfully.");
                  setSelectedInvoice(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
