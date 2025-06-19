"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Heading } from "@/components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import { formSchema } from "./constance";
import { useRouter } from "next/navigation";
import { EmptyPage } from "@/components/empty";

const MusicPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>();
  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      setError(undefined);
      setAudioUrl(undefined);

      const response = await axios.post("/api/music", {
        prompt: values.prompt,
      });

      if (response.data.audioUrl) {
        setAudioUrl(response.data.audioUrl);
        form.reset();
      } else {
        setError("生成音乐失败，请重试");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "生成音乐时出错");
      } else {
        setError("生成音乐时出错");
      }
    } finally {
      setIsLoading(false);
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
              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}>
                {isLoading ? "生成中..." : "开始生成"}
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
          {audioUrl && !isLoading && <EmptyPage label="哇！被发现了^-^" />}
          {error && (
            <div
              className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
              role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          {audioUrl && (
            <audio
              controls
              className="mt-8 w-full"
              src={audioUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
