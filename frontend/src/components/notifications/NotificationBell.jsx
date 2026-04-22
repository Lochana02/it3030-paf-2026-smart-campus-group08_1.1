import { useEffect, useRef, useState, useCallback } from "react";
import { Bell } from "lucide-react";
import { fetchNotifications, fetchUnreadCount, getNotificationUserId, markAllNotificationsAsRead, markNotificationAsRead } from "../../services/notificationService";
import NotificationPanel from "./NotificationPanel";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef(null);

  const userId = getNotificationUserId();

  const loadNotifications = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const [notificationsResponse, unreadResponse] = await Promise.all([
        fetchNotifications(userId),
        fetchUnreadCount(userId),
      ]);

      setNotifications(notificationsResponse.data);
      setUnreadCount(unreadResponse.data);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || "Unable to load notifications");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (open) {
      loadNotifications();
    }
  }, [open, userId, loadNotifications]);

  useEffect(() => {
    loadNotifications();
  }, [userId, loadNotifications]);

  const handleMarkRead = async (notificationId) => {
    if (!userId) {
      return;
    }

    await markNotificationAsRead(userId, notificationId);
    await loadNotifications();
  };

  const handleMarkAllRead = async () => {
    if (!userId) {
      return;
    }

    await markAllNotificationsAsRead(userId);
    await loadNotifications();
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200"
        aria-label="Open notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-14 z-50 w-[min(92vw,30rem)]">
          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 shadow-xl">
              {error}
            </div>
          ) : (
            <NotificationPanel
              notifications={notifications}
              unreadCount={unreadCount}
              onMarkRead={handleMarkRead}
              onMarkAllRead={handleMarkAllRead}
              onRefresh={loadNotifications}
              loading={loading}
              compact
            />
          )}
        </div>
      )}
    </div>
  );
}
