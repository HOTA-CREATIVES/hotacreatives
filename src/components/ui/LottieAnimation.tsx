import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
}

export default function LottieAnimation({
  src,
  className = "",
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  return (
    <div className={className}>
      <DotLottieReact
        src={src}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
