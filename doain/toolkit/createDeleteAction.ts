import { ElMessageBox } from "element-plus";

import { usePaginationView } from "../components/index";
import { httpClient } from "../core/index";
import { showNotify } from "./showNotify";

export interface DeleteActionOptions {
  url: string;
  formatDeleteParams?: (params: any) => any;
  message?: string;
  title?: string;
}

export const createDeleteAction = (options: DeleteActionOptions) => {
  const {
    url: deleteUrl,
    formatDeleteParams,
    message: deleteMessageContent = "是否确定删除此数据?",
    title = "提示",
  } = options;

  return async (row: Record<string, any>) => {
    const sharedMethods = usePaginationView();
    try {
      await ElMessageBox.confirm(deleteMessageContent, title);
      const { success, message, error } = await httpClient.request({
        url: deleteUrl,
        data: formatDeleteParams ? formatDeleteParams(row) : row,
        method: "POST",
      });

      if (!error) {
        showNotify(message, success ? "success" : "warning");
      } else {
        sharedMethods?.reload();
      }
    } catch (e) {
      // cancel
    }
  };
};
