import { ElNotification, NotificationHandle, NotificationOptions } from "element-plus";

let notifyHandler: NotificationHandle | null = null;
export const showNotify = (message: string, type: NotificationOptions["type"] = "success") => {
  if (!message) return null;
  notifyHandler = ElNotification({
    title: "提示",
    message,
    type,
    duration: 1500,
    customClass: "global-doain-notify",
  });

  return notifyHandler;
};

export const showSingleNotify = (
  message: string,
  type: NotificationOptions["type"] = "success",
) => {
  if (notifyHandler) {
    notifyHandler.close();
    notifyHandler = null;
  }
  return showNotify(message, type);
};
