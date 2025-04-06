'use client';

import { Candidate } from '@/types/election';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  name: {
    label: 'Name',
  },
  voteCount: {
    label: 'Votes',
  },
  party: {
    label: 'Party',
  },
};

export function ElectionChart({ candidates }: { candidates: Candidate[] }) {
  return (
    <Card className="p-2 md:p-3">
      <ChartContainer
        config={chartConfig}
        className={`w-full ${
          // stupid responsiveness
          candidates.length > 10 ? 'min-h-[600px]' : 'min-h-[300px]'
        }`}
      >
        <BarChart
          accessibilityLayer
          data={candidates}
          layout="vertical"
          margin={{
            left: 0,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <XAxis dataKey="voteCount" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar
            dataKey="voteCount"
            layout="vertical"
            radius={5}
            fill="var(--chart-1)"
          />
        </BarChart>
      </ChartContainer>
    </Card>
  );
}
