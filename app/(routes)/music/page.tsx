"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constance";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyPage } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Download } from "lucide-react";

const MusicPage = () => {
  const plusStore = usePlusStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskId, setTaskId] = useState<string>("");
  const router = useRouter();
  const [music, setMusic] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "",
      title: "",
      callBackUrl: "https://api.example.com/callback",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const checkMusicStatus = async (taskId: string) => {
    try {
      const response = await axios.get(`/api/music/status/${taskId}`);
      const { status, audio } = response.data;

      if (status === "complete") {
        setMusic(audio);
        setIsGenerating(false);
      } else if (status === "processing") {
        // 继续轮询
        setTimeout(() => checkMusicStatus(taskId), 5000);
      }
    } catch (error: any) {
      if (error?.response?.status === 403) {
        plusStore.onOpen(); //打开Plus对话框
      }
      setIsGenerating(false);
    } finally {
      router.refresh(); //刷新页面
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);
      setIsGenerating(true);

      const response = await axios.post("/api/music", {
        prompt: values.prompt,
        style: values.style,
        title: values.title,
        customMode: true,
        instrumental: true,
        model: "V3_5",
        callBackUrl: "https://api.example.com/callback", // 添加回调 URL
      });
      setTaskId(response.data.taskId);
      checkMusicStatus(response.data.taskId);

      setMusic(response.data.audio);
      form.reset(); //重置输入框
    } catch (error) {
      console.error("生成音乐错误:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Heading
        title="欢迎使用音乐创作助手"
        description="创作任何你能想象出的音乐！"
        icon={Music}
        iconColor="text-red-700"
        bgColor="bg-red-700/10"
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
                        placeholder="请输入你的灵感~ 例如：钢琴独奏"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="音乐标题"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="style"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-2">
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择风格" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="古典">古典</SelectItem>
                        <SelectItem value="爵士">爵士</SelectItem>
                        <SelectItem value="电子">电子</SelectItem>
                        <SelectItem value="流行">流行</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}>
                开始生成
              </Button>
            </form>
          </Form>
        </div>
        <div className="mt-6 space-y-4">
          {(isLoading || isGenerating) && (
            <div className="bg-muted flex w-full items-center justify-center rounded-lg p-8">
              <Loader />
              <p className="text-muted-foreground ml-2 text-sm">
                {isGenerating ? "正在生成音乐..." : "正在处理..."}
              </p>
            </div>
          )}
          {!music && !isLoading && !isGenerating && <EmptyPage label="输入提示词开始创作吧！" />}
          {music && (
            <Card>
              <CardContent className="p-6">
                <audio
                  className="w-full"
                  controls
                  src={music}
                />
                <Button
                  onClick={() => window.open(music)}
                  variant="secondary"
                  className="mt-4 w-full">
                  <Download className="mr-2 h-4 w-4" />
                  下载音乐
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
