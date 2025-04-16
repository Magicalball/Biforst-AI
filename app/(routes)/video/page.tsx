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

const VideoPage = () => {
  const router = useRouter();
  const [video, setVideo] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video",values);

      setVideo(response.data[0]);
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
        title="欢迎使用AI生成视频"
        description="视频生成无限可能！"
        icon={Music}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
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
                        placeholder="两个宇航员在月球表面漫步，背景是宇宙"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 w-full lg:col-span-2"
                disabled={isLoading}>
                立即生成
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
          {video && !isLoading && <EmptyPage label="哇！被发现了^-^" />}
          {video && (
            <video className="w-full aspect-video mt-8 rounded-lg border bg-black" controls>
              <source src={video}/>
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
