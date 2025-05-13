"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
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
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { usePlusStore } from "@/hooks/use-plus";
import toast from "react-hot-toast";

const ConversationPage = () => {
  const plusStore = usePlusStore();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("deepseek-chat");
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

      const response = await axios.post("/api/conversation", {
        messages: newMessages,
        model: selectedModel,
      });

      setMessages((current) => [...current, userMessage, response.data]); //更新消息列表

      form.reset(); //重置输入框
    } catch (error: any) {
      if (error?.response?.status === 403) {
        plusStore.onOpen(); //打开Plus对话框
      } else {
        toast.error("出错啦！");
      }
    } finally {
      router.refresh(); //刷新页面
    }
  };

  return (
    <div>
      <Heading
        title="你好！我是AI助手"
        description="快来与我进行对话，获取你想要的答案吧~"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="请输入内容"
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
              <div className="col-span-12 lg:col-span-2">
                <div className="relative">
                  <Select
                    value={selectedModel}
                    onValueChange={setSelectedModel}
                    disabled={isLoading}
                    defaultValue="deepseek-chat">
                    <SelectTrigger
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-400 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}>
                      {isHovered && (
                        <div
                          className={cn(
                            "absolute top-[-35px] left-0 z-10",
                            "rounded border border-gray-300 bg-white px-2 py-1 text-sm text-gray-600",
                            "whitespace-nowrap shadow-md",
                          )}>
                          点击切换模型
                        </div>
                      )}
                      <SelectValue placeholder="模型" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deepseek-chat">DeepSeek</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o-mini</SelectItem>
                      <SelectItem value="o3-mini">GPT-o3-mini</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
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
                <p className="text-sm">{message.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
