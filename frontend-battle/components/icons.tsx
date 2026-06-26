import React from "react";

interface IconProps {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

function parseDims(className: string): { width: number; height: number } {
  // Pull w-X and h-X from className to set explicit attributes
  const wMatch = className.match(/w-(\d+(?:\.\d+)?)/);
  const hMatch = className.match(/h-(\d+(?:\.\d+)?)/);
  const scale = 4; // Tailwind: 1 unit = 4px
  const w = wMatch ? parseFloat(wMatch[1]) * scale : 20;
  const h = hMatch ? parseFloat(hMatch[1]) * scale : 20;
  return { width: w, height: h };
}

function StrokeIcon({
  path,
  viewBox = "0 0 24 24",
  className = "w-5 h-5",
  "aria-hidden": ah = true,
  children,
}: {
  path?: string;
  viewBox?: string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
  children?: React.ReactNode;
}) {
  const { width, height } = parseDims(className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={width}
      height={height}
      aria-hidden={ah}
      style={{ minWidth: width, minHeight: height }}
    >
      {path ? <path d={path} /> : children}
    </svg>
  );
}

export const ChevronDown = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon className={className} {...p} path="M19.5 8.25l-7.5 7.5-7.5-7.5" />
);

export const ChevronUp = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon className={className} {...p} path="M4.5 15.75l7.5-7.5 7.5 7.5" />
);

export const ChevronRight = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon className={className} {...p} path="M8.25 4.5l7.5 7.5-7.5 7.5" />
);

export const ChevronLeft = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon className={className} {...p} path="M15.75 19.5L8.25 12l7.5-7.5" />
);

export const ChevronUpDown = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon
    className={className}
    {...p}
    path="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
  />
);

export const Search = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon
    className={className}
    {...p}
    path="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
  />
);

export const XMark = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon className={className} {...p} path="M6 18L18 6M6 6l12 12" />
);

export const ArrowPath = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon
    className={className}
    {...p}
    path="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
  />
);

export const ArrowTrendingUp = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon
    className={className}
    {...p}
    path="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
  />
);

export const ChartPie = ({ className = "w-5 h-5", ...p }: IconProps) => {
  const { width, height } = parseDims(className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={width}
      height={height}
      aria-hidden={p["aria-hidden"] ?? true}
      style={{ minWidth: width, minHeight: height }}
    >
      <path d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
      <path d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
    </svg>
  );
};

export const Cog8Tooth = ({ className = "w-5 h-5", ...p }: IconProps) => {
  const { width, height } = parseDims(className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      width={width}
      height={height}
      aria-hidden={p["aria-hidden"] ?? true}
      style={{ minWidth: width, minHeight: height }}
    >
      <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
};

export const Cube = ({ className = "w-5 h-5", ...p }: IconProps) => {
  const { width, height } = parseDims(className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width={width}
      height={height}
      aria-hidden={p["aria-hidden"] ?? true}
      style={{ minWidth: width, minHeight: height }}
    >
      <path d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" />
      <path d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" />
      <path d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" />
    </svg>
  );
};

export const Link = ({ className = "w-5 h-5", ...p }: IconProps) => (
  <StrokeIcon
    className={className}
    {...p}
    path="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
  />
);

export const LinkSolid = ({ className = "w-5 h-5", ...p }: IconProps) => {
  const { width, height } = parseDims(className);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      width={width}
      height={height}
      aria-hidden={p["aria-hidden"] ?? true}
      style={{ minWidth: width, minHeight: height }}
    >
      <path
        fillRule="evenodd"
        d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.353-1z"
        clipRule="evenodd"
      />
    </svg>
  );
};