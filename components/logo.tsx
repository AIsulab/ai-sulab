import Image from "next/image";

export function Logo({ light = false, size = 28 }: { light?: boolean; size?: number }) {
  return (
    <Image
      src="/assets/sulab-logo.png"
      alt="sulab"
      width={Math.round(size * 4)}
      height={size}
      style={{
        height: size,
        width: "auto",
        filter: light ? "brightness(0) invert(1)" : "none",
      }}
      className="block select-none"
      priority
      draggable={false}
    />
  );
}
