import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const dimensions = [
  {
    name: "Technical Quality",
    score: 92,
    description: "Model accuracy, performance efficiency, and resource utilization",
  },
  {
    name: "Business Impact",
    score: 88,
    description: "ROI metrics, business alignment, and value delivery",
  },
  {
    name: "Risk & Safety",
    score: 95,
    description: "Bias assessment, safety rating, and compliance level",
  },
  {
    name: "Operational Excellence",
    score: 90,
    description: "Process efficiency, documentation quality, and monitoring",
  },
];

export function QualityScore() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {dimensions.map((dimension) => (
        <Card key={dimension.name}>
          <CardHeader>
            <CardTitle>{dimension.name}</CardTitle>
            <CardDescription>{dimension.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{dimension.score}</span>
                <span className="text-sm text-muted-foreground">/100</span>
              </div>
              <Progress value={dimension.score} className="h-2" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
