import { defineCrudPage } from "doain/components";
import { createColumns } from "~utils";
import { createSchemaPipeline, createInputSchema } from "@charrue/schema-form-next";

const columns = createColumns([
  ["ID", "id"],
  ["UserId", "userId"],
  ["Title", "title"],
]);

const querySchema = createSchemaPipeline(
  createInputSchema("ID", "id"),
  createInputSchema("UserId", "userId"),
  createInputSchema("Title", "title"),
);

export default defineCrudPage({
  url: {
    list: "/user/list",
    delete: "/user/delete",
  },
  columns,
  querySchema,
});
