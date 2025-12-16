import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Minus } from "lucide-react";

interface Feature {
  name: string;
  essential: boolean;
  professional: boolean;
  enterprise: boolean;
  retainer: boolean;
  workflow: boolean;
}

const features: Feature[] = [
  {
    name: "System Architecture Review",
    essential: true,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: true,
  },
  {
    name: "Quality Baseline Establishment",
    essential: true,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: true,
  },
  {
    name: "Model Performance Testing",
    essential: false,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: false,
  },
  {
    name: "Bias Detection & Mitigation",
    essential: true,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: true,
  },
  {
    name: "AI Safety & Risk Analysis",
    essential: false,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: false,
  },
  {
    name: "Custom Testing Frameworks",
    essential: false,
    professional: false,
    enterprise: true,
    retainer: true,
    workflow: false,
  },
  {
    name: "Continuous Monitoring",
    essential: false,
    professional: false,
    enterprise: true,
    retainer: true,
    workflow: true,
  },
  {
    name: "Workflow Automation Design",
    essential: false,
    professional: false,
    enterprise: false,
    retainer: false,
    workflow: true,
  },
  {
    name: "Tool & API Integrations",
    essential: false,
    professional: false,
    enterprise: false,
    retainer: false,
    workflow: true,
  },
  {
    name: "Compliance & Audit-Ready Outputs",
    essential: false,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: true,
  },
  {
    name: "Ongoing Optimization & Support",
    essential: false,
    professional: false,
    enterprise: true,
    retainer: true,
    workflow: true,
  },
];

export function ComparisonMatrix() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Feature</TableHead>
            <TableHead className="text-center">Essential</TableHead>
            <TableHead className="text-center">Professional</TableHead>
            <TableHead className="text-center">Enterprise</TableHead>
            <TableHead className="text-center">Retainer</TableHead>
            <TableHead className="text-center">AI Workflow Automation</TableHead>
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
              <TableCell className="text-center">
                {feature.retainer ? (
                  <Check className="h-4 w-4 mx-auto text-primary" />
                ) : (
                  <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
                )}
              </TableCell>
              <TableCell className="text-center">
                {feature.workflow ? (
                  <Check className="h-4 w-4 mx-auto text-primary" />
                ) : (
                  <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
