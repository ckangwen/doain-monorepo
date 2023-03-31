import { Dict } from "@charrue/types";
import { PaginationViewProps } from "../PaginationView/index";

export interface CrudConfig {
  url: {
    list: string;
    delete?: string;
  };
  columns: any[];
  querySchema: any;
  paginationViewProps?: Omit<PaginationViewProps, "url" | "columns" | "schema">;
  actions?: {
    enable: {
      delete?: boolean;
      view?: boolean;
    };
    text?: {
      delete?: string;
      view?: string;
    };
    params?: {
      delete?: (row: Dict) => Dict;
      view?: (row: Dict) => {
        id: string;
        query: Dict;
      };
    };
  };
}

export const defineCrudPage = (config: CrudConfig) => {
  return {
    ...config,
    paginationViewProps: config.paginationViewProps ?? {},
    actions: {
      enable: {
        delete: config.actions?.enable.delete ?? Boolean(config.url.delete),
        view: config.actions?.enable.view ?? true,
      },
      text: {
        delete: config.actions?.text?.delete ?? "删除",
        view: config.actions?.text?.view ?? "查看详情",
      },
      params: {
        delete: config.actions?.params?.delete ?? ((row) => ({ id: row.id })),
        view: config.actions?.params?.view ?? ((row) => ({ id: row.id, query: {} })),
      },
    },
  };
};

export type RequiredCrudConfig = ReturnType<typeof defineCrudPage>;
