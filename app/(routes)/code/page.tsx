"use client";

import axios from "axios";
import * as z from "zod";
import Markdown from "react-markdown";
import { useState } from "react";
import { CodeIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constance";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/chat/index.mjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyPage } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { BotHead } from "@/components/bothead";
import { UserHead } from "@/components/userhead";

const CodePage = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((current) => [...current, userMessage, response.data]); //更新消息列表

      form.reset(); //重置输入框
    } catch (error: Error | unknown) {
      //错误处理记得回头看一下
      console.log(error);
    } finally {
      router.refresh(); //刷新页面
    }
  };

  return (
    <div>
      <Heading
        title="欢迎使用代码生成模式 "
        description="用AI提高你的编程效率"
        icon={CodeIcon}
        iconColor="text-green-600"
        bgColor="bg-green-600/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full grid-cols-12 gap-2 rounded-lg border p-4 px-3 focus-within:shadow-sm md:px-6">
              <FormField
                name="prompt"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="帮我用React编写一个按钮组件"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}>
                发送
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-6 space-y-4">
          {isLoading && (
            <div className="bg-muted flex w-full items-center justify-center rounded-lg p-8">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && <EmptyPage label="哇！被发现了^-^" />}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => (
              <div
                key={message.content}
                className={cn(
                  "flex w-full items-start gap-x-8 rounded-lg p-8",
                  message.role === "user" ? "border border-black/10 bg-white" : "bg-muted",
                )}>
                {message.role === "user" ? <UserHead /> : <BotHead />}
                <div className="overflow-hidden text-sm leading-7">
                  <Markdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="my-2 w-full overflow-auto rounded-lg border bg-black/10 p-2">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="rounded-lg bg-black/10 p-1"
                          {...props}
                        />
                      ),
                    }}>
                    {message.content || ""}
                  </Markdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePage;
