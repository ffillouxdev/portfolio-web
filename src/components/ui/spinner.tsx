import { cn } from "@/lib/utils";

export const Spinner = ({ className }: { className?: string }) => {
  const blades = Array.from({ length: 12 });

  return (
    <div className={cn("relative w-10 h-10", className)}>
      {blades.map((_, i) => {
        const deg = i * 30;
        const delay = (i * 0.083).toFixed(3);
        return (
          <span
            key={i}
            className="absolute left-[46.29%] bottom-0 w-[7.4%] h-[27.77%] rounded-[5.55%]"
            style={{
              transformOrigin: "center -0.2222em",
              transform: `rotate(${deg}deg)`,
              animation: "spinner-fade 1s linear infinite",
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
      <style jsx>{`
        @keyframes spinner-fade {
          0% {
            background-color: #69717d;
          }
          100% {
            background-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};
