import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";

function toPascal(name: string) {
  return name.replace(/(^|-)(\w)/g, (_, __, c: string) => c.toUpperCase());
}

export function Icon({
  name,
  className = "w-5 h-5",
  strokeWidth = 1.75,
}: {
  name: string;
  className?: string;
  strokeWidth?: number;
}) {
  const key = toPascal(name);
  const icons = Lucide as unknown as Record<string, ComponentType<LucideProps>>;
  const Comp = icons[key] ?? Lucide.Circle;
  return <Comp className={className} strokeWidth={strokeWidth} />;
}
