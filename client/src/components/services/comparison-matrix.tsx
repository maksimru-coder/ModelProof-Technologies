import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Minus } from "lucide-react";

type FeatureValue = boolean | string;

interface Feature {
  name: string;
  essential: FeatureValue;
  professional: FeatureValue;
  enterprise: FeatureValue;
  retainer: FeatureValue;
  workflow: FeatureValue;
}

const features: Feature[] = [
  {
    name: "System Architecture Review",
    essential: true,
    professional: true,
    enterprise: true,
    retainer: true,
    workflow: "Workflow-specific",
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
    workflow: "Policy-aware",
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
    name: "Tool & API Integrations (CRM, Email, Tickets)",
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

function FeatureCell({ value }: { value: FeatureValue }) {
  if (typeof value === "string") {
    return (
      <span className="text-xs text-primary font-medium">{value}</span>
    );
  }
  return value ? (
    <Check className="h-4 w-4 mx-auto text-primary" />
  ) : (
    <Minus className="h-4 w-4 mx-auto text-muted-foreground" />
  );
}

export function ComparisonMatrix() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Feature</TableHead>
            <TableHead className="text-center">Essential Assessment</TableHead>
            <TableHead className="text-center">Professional Validation</TableHead>
            <TableHead className="text-center">Enterprise Solution</TableHead>
            <TableHead className="text-center">Retainer Services</TableHead>
            <TableHead className="text-center">AI Workflow Automation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {features.map((feature) => (
            <TableRow key={feature.name}>
              <TableCell className="font-medium">{feature.name}</TableCell>
              <TableCell className="text-center">
                <FeatureCell value={feature.essential} />
              </TableCell>
              <TableCell className="text-center">
                <FeatureCell value={feature.professional} />
              </TableCell>
              <TableCell className="text-center">
                <FeatureCell value={feature.enterprise} />
              </TableCell>
              <TableCell className="text-center">
                <FeatureCell value={feature.retainer} />
              </TableCell>
              <TableCell className="text-center">
                <FeatureCell value={feature.workflow} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
