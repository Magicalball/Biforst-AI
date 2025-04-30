"use client";

import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card";

const conabout = [
  {
    avatat: "A",
    title: "SaaS平台",
    description: "是一个SaaS平台，提供AI工具和服务，帮助用户提升工作效率和创造力。",
  },
  {
    avatat: "A",
    title: "SaaS平台",
    description: "是一个SaaS平台，提供AI工具和服务，帮助用户提升工作效率和创造力。",
  },
  {
    avatat: "A",
    title: "SaaS平台",
    description: "是一个SaaS平台，提供AI工具和服务，帮助用户提升工作效率和创造力。",
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
            </CardHeader>
            <CardContent className="px-2 pt-4">
              <div>{item.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
