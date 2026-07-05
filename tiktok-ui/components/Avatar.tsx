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
          className={`${sizeMap[size]} rounded-full object-cover border-2 border-primary-200 dark:border-primary-800`}
        />
      ) : (
        <div
          className={`${sizeMap[size]} rounded-full flex items-center justify-center font-semibold text-white bg-gradient-to-br from-primary-500 to-accent-500`}
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