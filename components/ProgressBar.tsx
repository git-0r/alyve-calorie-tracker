interface Props {
  progress: number;
  size: number;
}
const ProgressBar = ({ progress, size }: Props) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const rotation = `rotate(${-90} ${size / 2} ${size / 2})`;

  return (
    <svg width={size} height={size} className="relative">
      <circle
        className="text-gray-300"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="text-primary"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={rotation}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-2xl font-bold"
      >
        {progress}%
      </text>
      <text
        x="50%"
        y="65%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-xs"
      >
        Daily target achieved
      </text>
    </svg>
  );
};

export default ProgressBar;
