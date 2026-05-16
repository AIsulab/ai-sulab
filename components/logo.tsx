import Image from "next/image";

export function Logo({ light = false, size = 28 }: { light?: boolean; size?: number }) {
  const height = size;
  const width = Math.round(size * (1323 / 176));
  return (
    <Image
      src="/sulab-logo-wide.png"
      alt="로고"
      width={width}
      height={height}
      style={{ height, width: "auto" }}
      priority
    />
  );
}
