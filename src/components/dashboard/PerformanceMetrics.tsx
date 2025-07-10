
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PerformanceMetricsProps {
  performanceData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function PerformanceMetrics({ performanceData }: PerformanceMetricsProps) {
  return (
    <Card className="glass-effect border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <span>Rendimiento del Sistema</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {performanceData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{item.name}</span>
              <span className="font-medium">{item.value}%</span>
            </div>
            <Progress value={item.value} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
