"use client";

import React from "react";
import { Overview } from "@/components/overview";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import {
  CreditCardIcon,
  PoundSterlingIcon as PhilippinePesoIcon,
  Package,
} from "lucide-react";
import { GraphData } from "@/actions/get-graph-revenue";
// import { TracingBeam } from "@/components/ui/tracing-beam";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

interface ClientSideProps {
  totalRevenue: number;
  salesCount: number;
  stockCount: number;
  graphRevenue: GraphData[];
}

const ClientSide = ({
  totalRevenue,
  salesCount,
  stockCount,
  graphRevenue,
}: ClientSideProps) => {
  const metrics = [
    {
      title: "Total Revenue",
      value: formatter.format(totalRevenue),
      icon: PhilippinePesoIcon,
      description: "Total revenue from all sales",
    },
    {
      title: "Sales",
      value: `+${salesCount}`,
      icon: CreditCardIcon,
      description: "Total number of sales",
    },
    {
      title: "Products In Stock",
      value: stockCount.toString(),
      icon: Package,
      description: "Current inventory count",
    },
  ];

  return (
    // <TracingBeam className="px-6">
    <div className="space-y-8">
      <div className="relative">
        <Heading title="Dashboard" description="Summary of your store" />
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={100}
          className="w-full  h-full absolute top-0 left-0"
          particleColor="#00bcd4"
        />
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="rounded-[20px] border border-cyan-200 bg-white/90 dark:bg-black/90  backdrop-blur-sm"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium ">
                {metric.title}
              </CardTitle>
              <AnimatedTooltip
                items={{
                  id: index,
                  name: metric.description,
                  image: "/logo.png",
                  designation: metric.value,
                }}
              >
                <div className="rounded-full p-2 bg-red-500/10">
                  <metric.icon className="h-4 w-4 text-red-500" />
                </div>
              </AnimatedTooltip>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <BackgroundGradient className="rounded-[22px]"> */}
      <Card className="col-span-4 rounded-[20px] border border-cyan-200 bg-white/90 dark:bg-black/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="">Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphRevenue} />
        </CardContent>
      </Card>
      {/* </BackgroundGradient> */}
    </div>
    // </TracingBeam>
  );
};

export default ClientSide;
