import { Link } from "wouter";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-montserrat font-bold text-xl">MP</span>
      </div>
      <div className="flex flex-col">
        <span className="font-montserrat font-bold text-xl text-primary leading-tight">
          ModelProof
        </span>
        <span className="font-montserrat text-xs font-medium leading-tight" style={{ color: '#00D4FF' }}>
          – AI Automation & Intelligent Agents
        </span>
      </div>
    </div>
  );
}
