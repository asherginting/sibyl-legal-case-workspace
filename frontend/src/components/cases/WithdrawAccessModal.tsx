"use client";

type WithdrawAccessModalProps = {
  open: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onWithdraw: () => void;
};

export function WithdrawAccessModal({
  open,
  title,
  description,
  onCancel,
  onWithdraw,
}: WithdrawAccessModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-sm rounded-lg bg-white border border-faded shadow-lg p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-medium text-black-soft">{title}</h3>
          <button
            onClick={onCancel}
            className="text-muted hover:text-black-soft text-sm cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">{description}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="inline-flex items-center justify-center h-8 px-3 rounded-sm border border-faded bg-white text-xs hover:bg-weak"
          >
            Cancel
          </button>
          <button
            onClick={onWithdraw}
            className="inline-flex items-center justify-center h-8 px-3 rounded-sm bg-brand-dark text-xs text-white shadow hover:opacity-90"
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );
}
