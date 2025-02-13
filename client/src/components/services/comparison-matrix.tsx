import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Minus } from "lucide-react";

const features = [
  {
    name: "System Architecture Review",
    essential: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Quality Baseline Establishment",
    essential: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Model Performance Testing",
    essential: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Bias Detection",
    essential: true,
    professional: true,
    enterprise: true,
  },
  {
    name: "Custom Testing Framework",
    essential: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "Continuous Monitoring",
    essential: false,
    professional: false,
    enterprise: true,
  },
];

export function ComparisonMatrix() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">Feature</TableHead>
          <TableHead className="text-center">Essential</TableHead>
          <TableHead className="text-center">Professional</TableHead>
          <TableHead className="text-center">Enterprise</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {features.map((feature) => (
          <TableRow key={feature.name}>
            <TableCell className="font-medium">{feature.name}</TableCell>
            <TableCell className="text-center">
              {feature.essential ? (
                <Check className="h-4 w-4 mx-auto text-primary" />
              ) : (
                <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
              )}
            </TableCell>
            <TableCell className="text-center">
              {feature.professional ? (
                <Check className="h-4 w-4 mx-auto text-primary" />
              ) : (
                <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
              )}
            </TableCell>
            <TableCell className="text-center">
              {feature.enterprise ? (
                <Check className="h-4 w-4 mx-auto text-primary" />
              ) : (
                <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
