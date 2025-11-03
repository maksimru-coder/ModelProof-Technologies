import { Link } from "wouter";

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-white font-montserrat font-bold text-xl">MP</span>
      </div>
      <span className="font-montserrat font-bold text-xl text-primary">
        ModelProof
      </span>
    </div>
  );
}
