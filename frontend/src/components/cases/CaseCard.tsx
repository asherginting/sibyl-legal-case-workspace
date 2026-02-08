"use client";

import { PaperClip, People } from "@/icons";

export type CaseCardData = {
  id: string;
  title: string;
  description: string;
  category: string;
  jurisdiction: string;
  createdAt: string;
  clientLabel: string;
  attachmentsCount: number;
  access: {
    status: "GRANTED" | "REQUESTED" | "REVOKED" | null;
    grantedAt: string | null;
  };
  actions: {
    canOpen: boolean;
    canRequestAccess: boolean;
    canWithdraw: boolean;
  };
};

type CaseCardProps = {
  data: CaseCardData;
  onOpenCase?: (id: string) => void;
  onRequestAccess?: (id: string) => void;
  onWithdraw?: (id: string) => void;
};

function formatPostedAgo(isoDate: string) {
  const date = new Date(isoDate);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) return "Posted today";
  if (diffDays === 1) return "Posted 1 day ago";
  return `Posted ${diffDays} days ago`;
}

function formatDate(isoDate: string | null) {
  if (!isoDate) return "";

  return new Date(isoDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function CaseCard({
  data,
  onOpenCase,
  onRequestAccess,
  onWithdraw,
}: CaseCardProps) {
  const { access, actions } = data;

  return (
    <div className="rounded-md border border-faded bg-white p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-muted">
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-faded px-2 py-0.5 text-xs text-sage-dark">
            {data.category}
          </span>
          <span className="inline-flex items-center justify-center">
            <span className="h-1 w-1 rounded-full bg-muted" />
          </span>
          <span className="text-muted text-xs">{data.jurisdiction}</span>
        </div>
        <span className="text-muted text-xs">
          {formatPostedAgo(data.createdAt)}
        </span>
      </div>
      <div className="w-full">
        <h3 className="text-sm font-medium text-black-soft line-clamp-2">
          {data.title}
        </h3>
        <p className="text-sm text-muted line-clamp-2">{data.description}</p>
      </div>
      <div className="flex items-center gap-4 text-xs text-muted">
        <div className="flex items-center gap-1">
          <People className="size-5 text-placeholder" />
          <span>{data.clientLabel}</span>
        </div>
        <div className="flex items-center gap-1">
          <PaperClip className="size-5 text-placeholder" />
          <span>{data.attachmentsCount} Attachments</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-faded pt-4">
        <div className="flex items-center gap-3 text-xs">
          {access.status === "GRANTED" && (
            <>
              <span className="rounded-full bg-mint px-2.5 py-1 text-color-success font-medium text-success">
                Approved
              </span>
              <span className="text-muted">
                Access granted on {formatDate(access.grantedAt)}
              </span>
            </>
          )}
          {access.status === "REQUESTED" && (
            <>
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-orange-600 font-medium">
                Pending approval
              </span>
              <span className="text-muted">
                Requested on {formatDate(access.grantedAt)}
              </span>
            </>
          )}
          {access.status === "REVOKED" && (
            <>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-red-600 font-medium">
                Access not approved
              </span>
            </>
          )}
        </div>
        <div className="flex gap-2">
          {actions.canOpen && (
            <button
              onClick={() => onOpenCase?.(data.id)}
              className="inline-flex items-center justify-center min-w-20 h-8 gap-1 rounded-sm border border-faded bg-white px-3  text-xs text-black-soft hover:bg-weak cursor-pointer"
            >
              Open Case
            </button>
          )}
          {actions.canRequestAccess && (
            <button
              onClick={() => onRequestAccess?.(data.id)}
              className="inline-flex items-center justify-center min-w-20 w-30.75 h-8 gap-1 rounded-sm border border-white/10 bg-brand px-3 text-xs text-white shadow-[0_0_0_1px_#FF6A2B,0_1px_2px_0_#12110F3D] hover:opacity-90 cursor-pointer"
            >
              Request Access
            </button>
          )}
          {actions.canWithdraw && (
            <button
              onClick={() => onWithdraw?.(data.id)}
              className="inline-flex items-center justify-center min-w-20 h-8 gap-1 rounded-sm border border-faded bg-white px-3  text-xs text-black-soft hover:bg-weak cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
