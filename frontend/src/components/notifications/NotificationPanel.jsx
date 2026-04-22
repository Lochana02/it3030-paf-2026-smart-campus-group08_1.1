import { CheckCheck, Clock3, CircleAlert } from "lucide-react";

const formatDate = (value) => {
  if (!value) {
    return "Just now";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Just now";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
};

export default function NotificationPanel({
  notifications,
  unreadCount,
  onMarkRead,
  onMarkAllRead,
  onRefresh,
  loading,
  compact = false,
}) {
  return (
    <div className={`bg-white/90 backdrop-blur-2xl border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.12)] ${compact ? "rounded-2xl" : "rounded-[2rem]"}`}>
      <div className={`flex items-center justify-between border-b border-slate-200 ${compact ? "px-4 py-3" : "px-6 py-5"}`}>
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Inbox</p>
          <h2 className="text-lg font-black text-slate-900">Notifications</h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <Clock3 className="h-4 w-4" />
            Refresh
          </button>
          <button
            type="button"
            onClick={onMarkAllRead}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
          >
            <CheckCheck className="h-4 w-4" />
            Mark all as read
          </button>
        </div>
      </div>

      <div className={compact ? "max-h-[28rem] overflow-y-auto" : "max-h-[36rem] overflow-y-auto"}>
        {loading ? (
          <div className="px-6 py-10 text-center text-sm text-slate-500">Loading notifications...</div>
        ) : notifications.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <CircleAlert className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-slate-900">No notifications yet</p>
            <p className="mt-1 text-xs text-slate-500">New booking, ticket, and comment updates will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {notifications.map((notification) => (
              <article
                key={notification.id}
                className={`px-6 py-4 transition-colors ${notification.read ? "bg-white" : "bg-sky-50/80"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`mt-1 h-2.5 w-2.5 rounded-full ${notification.read ? "bg-slate-300" : "bg-sky-500"}`} />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{notification.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{notification.message}</p>
                      </div>

                      {!notification.read && (
                        <button
                          type="button"
                          onClick={() => onMarkRead(notification.id)}
                          className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] font-semibold text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
                        >
                          Mark read
                        </button>
                      )}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 font-semibold uppercase tracking-[0.2em]">
                        {notification.type}
                      </span>
                      <span>{formatDate(notification.createdAt)}</span>
                      {notification.referenceId && <span>Ref: {notification.referenceId}</span>}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-slate-200 px-6 py-4 text-xs text-slate-500">
        Unread count: <span className="font-bold text-slate-900">{unreadCount}</span>
      </div>
    </div>
  );
}
