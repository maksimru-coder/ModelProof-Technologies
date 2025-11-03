import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code2, BarChart2, ShieldAlert, Settings2 } from "lucide-react";

const dimensions = [
  {
    name: "Technical Quality",
    score: 92,
    icon: Code2,
    description: "Core technical performance metrics",
    metrics: [
      "Model Accuracy",
      "Performance Efficiency",
      "Resource Utilization",
      "Response Time",
    ],
  },
  {
    name: "Business Impact",
    score: 88,
    icon: BarChart2,
    description: "Business objectives and value delivery",
    metrics: [
      "ROI Metrics",
      "Business Alignment",
      "Value Delivery",
      "Cost Efficiency",
    ],
  },
  {
    name: "Risk & Safety",
    score: 95,
    icon: ShieldAlert,
    description: "Safety, compliance, and risk evaluation",
    metrics: [
      "Bias Score",
      "Safety Rating",
      "Compliance Level",
      "Risk Assessment",
    ],
  },
  {
    name: "Operational Excellence",
    score: 90,
    icon: Settings2,
    description: "Process and support effectiveness",
    metrics: [
      "Process Efficiency",
      "Documentation Quality",
      "Monitoring Effectiveness",
      "Support Response",
    ],
  },
];

export function QualityScore() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {dimensions.map((dimension) => {
        const Icon = dimension.icon;
        return (
          <Card key={dimension.name} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>{dimension.name}</CardTitle>
                <CardDescription>{dimension.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold">{dimension.score}</span>
                    <span className="text-sm text-muted-foreground">/100</span>
                  </div>
                  <Progress value={dimension.score} className="h-2" />
                </div>
                <div className="space-y-2">
                  {dimension.metrics.map((metric) => (
                    <div
                      key={metric}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}