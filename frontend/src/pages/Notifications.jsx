import { useCallback, useEffect, useState } from "react";
import { BellRing, RefreshCcw, Save } from "lucide-react";
import NotificationPanel from "../components/notifications/NotificationPanel";
import {
  fetchNotifications,
  fetchUnreadCount,
  getNotificationUserId,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  setNotificationUserId,
} from "../services/notificationService";

export default function Notifications() {
  const [userIdInput, setUserIdInput] = useState(getNotificationUserId());
  const [currentUserId, setCurrentUserId] = useState(getNotificationUserId());
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async (userId = currentUserId) => {
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
  }, [currentUserId]);

  useEffect(() => {
    loadNotifications(currentUserId);
  }, [currentUserId, loadNotifications]);

  const handleSaveUserId = async () => {
    const trimmedUserId = userIdInput.trim();

    if (!trimmedUserId) {
      setError("Enter a user id, email, or stored notification identifier first");
      return;
    }

    setNotificationUserId(trimmedUserId);
    setCurrentUserId(trimmedUserId);
    await loadNotifications(trimmedUserId);
  };

  const handleMarkRead = async (notificationId) => {
    if (!currentUserId) {
      return;
    }

    await markNotificationAsRead(currentUserId, notificationId);
    await loadNotifications(currentUserId);
  };

  const handleMarkAllRead = async () => {
    if (!currentUserId) {
      return;
    }

    await markAllNotificationsAsRead(currentUserId);
    await loadNotifications(currentUserId);
  };

  const handleRefresh = async () => {
    await loadNotifications(currentUserId);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_34%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)] px-4 py-8 text-slate-900 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold uppercase tracking-[0.28em] text-white">
                <BellRing className="h-4 w-4" />
                Notification Center
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight sm:text-5xl">Track booking, ticket, and comment updates in one place.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                  This page uses the same notification endpoints as the compact bell in the header. If your login flow does not yet store a user id, paste the email or user identifier here and the UI will persist it locally.
                </p>
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl bg-slate-900 p-5 text-white shadow-xl sm:min-w-72">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Unread</span>
                <span className="text-2xl font-black text-white">{unreadCount}</span>
              </div>
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition-transform hover:scale-[0.99]"
              >
                <RefreshCcw className="h-4 w-4" />
                Refresh feed
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">User scope</p>
              <h2 className="mt-2 text-xl font-black text-slate-900">Choose the notification owner</h2>
            </div>

            <label className="block text-sm font-semibold text-slate-700">
              User id, email, or local key
              <input
                type="text"
                value={userIdInput}
                onChange={(event) => setUserIdInput(event.target.value)}
                placeholder="student@campus.edu"
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition-colors focus:border-sky-400 focus:bg-white"
              />
            </label>

            <button
              type="button"
              onClick={handleSaveUserId}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-500"
            >
              <Save className="h-4 w-4" />
              Save and load notifications
            </button>

            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Current scope</p>
              <p className="mt-1 break-all">{currentUserId || "No user id set yet"}</p>
            </div>

            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                {error}
              </div>
            )}
          </div>

          <NotificationPanel
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkRead={handleMarkRead}
            onMarkAllRead={handleMarkAllRead}
            onRefresh={handleRefresh}
            loading={loading}
          />
        </section>
      </div>
    </div>
  );
}
