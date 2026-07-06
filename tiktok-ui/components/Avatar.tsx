interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  online?: boolean;
}

  const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-base",
  xl: "w-20 h-20 text-xl",
};

function scallopClipPath() {
  const petals = 10; // number of wavy bumps around the circle
  const points = 60; // smoothness
  const amplitude = 6; // how deep the waves are
  const baseRadius = 80; // base radius of the circle

  const path: string[] = [];
  for (let i = 0; i <= points; i++) {
    const angle = (i / points) * 2 * Math.PI;
    const r = baseRadius + amplitude * Math.sin(petals * angle);
    const x = 50 + r * Math.cos(angle) * 0.5;
    const y = 50 + r * Math.sin(angle) * 0.5;
    path.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  }
  return `polygon(${path.join(", ")})`;
}
function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Avatar({ src, name, size = "md", online }: AvatarProps) {
  return (
    <div className="relative inline-block">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
  src={src}
  alt={name}
  className={`${sizeMap[size]} object-cover border-2 border-primary-200 dark:border-primary-800`}
  style={{ clipPath: scallopClipPath() }}
/>
      ) : (
        <div
  className={`${sizeMap[size]} flex items-center justify-center font-semibold text-white bg-gradient-to-br from-primary-500 to-accent-500`}
  style={{ clipPath: scallopClipPath() }}
>
  {getInitials(name)}
</div>
      )}
      {online && (
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />
      )}
    </div>
  );
}