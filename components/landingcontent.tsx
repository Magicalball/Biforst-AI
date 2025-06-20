"use client";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const conabout = [
  {
    avatat: "A",
    title: "SaaS平台",
    description: "是一个SaaS平台，提供AI工具和服务，帮助用户提升工作效率和创造力。",
  },
  {
    avatat: "B",
    title: "AI赋能",
    description:
      "通过AI技术，赋能企业提升工作效率和创造力，实现业务增长和创新。",
  },
  {
    avatat: "C",
    title: "便捷高效",
    description: "低门槛，便捷高效，让用户轻松上手，提升工作效率。",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-center text-4xl font-extrabold text-black">关于</h2>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {conabout.map((item) => (
          <Card
            key={item.description}
            className="border-gray-300 bg-white text-black">
            <CardHeader className="">
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="p-0 text-lg">{item.title}</p>
                </div>
              </CardTitle>
              <CardDescription>
                <div>{item.description}</div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
