interface ServiceIconProps {
  name: string;
  size?: number;
  radius?: number;
}

const SERVICE_COLORS: Record<string, { from: string; to: string }> = {
  Netflix:     { from: "#E50914", to: "#8C0404" },
  Spotify:     { from: "#1ED760", to: "#0F7A30" },
  YouTube:     { from: "#FF2D2D", to: "#AA0000" },
  "Apple One": { from: "#707075", to: "#1C1C1E" },
  ChatGPT:     { from: "#10A37F", to: "#065C45" },
  Notion:      { from: "#3A3A3A", to: "#0D0D0D" },
};

export function ServiceIcon({ name, size = 46, radius }: ServiceIconProps) {
  const colors = SERVICE_COLORS[name];
  const r = radius ?? Math.round(size * 0.26);
  const fontSize = Math.round(size * 0.38);
  const initial = name.charAt(0).toUpperCase();
  const gradId = `sg-${name.replace(/\s/g, "")}`;

  if (colors) {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        style={{ flexShrink: 0 }}
      >
        <rect width={size} height={size} rx={r} fill={`url(#${gradId})`} />
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2={size} y2={size} gradientUnits="userSpaceOnUse">
            <stop stopColor={colors.from} />
            <stop offset="1" stopColor={colors.to} />
          </linearGradient>
        </defs>
        <text
          x={size / 2}
          y={size / 2 + fontSize * 0.36}
          textAnchor="middle"
          fill="white"
          fontSize={fontSize}
          fontWeight="700"
          fontFamily="Noto Sans KR, sans-serif"
        >
          {initial}
        </text>
      </svg>
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: r,
        flexShrink: 0,
        background: "linear-gradient(135deg, #6C63FF, #8B7FFF)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize,
        fontWeight: 700,
      }}
    >
      {initial}
    </div>
  );
}
