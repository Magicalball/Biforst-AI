import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "音乐描述不能为空",
  }).max(3000, {
    message: "描述不能超过3000字符"
  }),
  style: z.string().min(1, {
    message: "请选择音乐风格"
  }).max(200, {
    message: "风格描述不能超过200字符"
  }),
  title: z.string().min(1, {
    message: "标题不能为空"
  }).max(80, {
    message: "标题不能超过80字符"
  }),
});
