import React, { useState } from "react";

interface RatingProps {
  className?: string;
  count?: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  gap?: string;
  edit?: boolean;
  isHalf?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

interface IconProps {
  size?: number;
  color?: string;
}

const FullStar = ({ color = "#000000" }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.9372 9.20539C23.7792 8.71942 23.3482 8.37536 22.8402 8.3294L15.9121 7.70042L13.1741 1.29016C12.972 0.81921 12.512 0.51525 12 0.51525C11.488 0.51525 11.0279 0.81921 10.827 1.29016L8.089 7.70042L1.15981 8.3294C0.651866 8.37628 0.221745 8.72034 0.0628064 9.20539C-0.0952162 9.69136 0.0507212 10.2244 0.434883 10.5613L5.67197 15.1535L4.12782 21.9545C4.01484 22.4546 4.20893 22.9717 4.62386 23.2716C4.84688 23.4336 5.10891 23.5146 5.37186 23.5146C5.59781 23.5146 5.82395 23.4545 6.02592 23.3337L12 19.7616L17.973 23.3337C18.4112 23.5955 18.9622 23.5715 19.3762 23.2716C19.7911 22.9717 19.9852 22.4546 19.8722 21.9545L18.3281 15.1535L23.5652 10.5613C23.9491 10.2244 24.0953 9.69246 23.9372 9.20539V9.20539Z"
          fill="#FFA000"
        />
      </svg>
    </div>
  );
};

const HalfStar = ({ size = 24, color = "#000000" }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg height={size} viewBox="0 0 24 24">
        <path
          d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"
          fill="currentColor"
        />
        <path d="M0 0h24v24H0z" fill="none" />
      </svg>
    </div>
  );
};

const EmptyStar = ({ color = "#000000" }: IconProps) => {
  return (
    <div style={{ color: color }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1_524)">
          <path
            d="M23.9372 9.20539C23.7792 8.71942 23.3482 8.37536 22.8402 8.3294L15.9121 7.70042L13.1741 1.29016C12.972 0.81921 12.512 0.51525 12 0.51525C11.488 0.51525 11.0279 0.81921 10.827 1.29016L8.089 7.70042L1.15981 8.3294C0.651866 8.37628 0.221744 8.72034 0.0628055 9.20539C-0.0952172 9.69136 0.0507203 10.2244 0.434882 10.5613L5.67197 15.1535L4.12781 21.9545C4.01484 22.4546 4.20893 22.9717 4.62386 23.2716C4.84688 23.4336 5.10891 23.5146 5.37185 23.5146C5.59781 23.5146 5.82395 23.4545 6.02592 23.3337L12 19.7616L17.973 23.3337C18.4112 23.5955 18.9622 23.5715 19.3762 23.2716C19.7911 22.9717 19.9852 22.4546 19.8722 21.9545L18.3281 15.1535L23.5652 10.5613C23.9491 10.2244 24.0952 9.69246 23.9372 9.20539V9.20539Z"
            fill="#919191"
            fillOpacity="0.24"
          />
        </g>
        <defs>
          <clipPath id="clip0_1_524">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

const Rating = ({
  className,
  count = 5,
  value,
  color = "#ffd700",
  hoverColor = "#ffc107",
  activeColor = "#ffc107",
  size = 30,
  edit = false,
  isHalf = false,
  onChange,
  emptyIcon = <EmptyStar />,
  halfIcon = <HalfStar />,
  fullIcon = <FullStar />,
  gap = "gap-2",
}: RatingProps) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseMove = (index: number) => {
    if (!edit) {
      return;
    }
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!edit) {
      return;
    }
    setHoverValue(undefined);
  };

  const handleClick = (index: number) => {
    if (!edit) {
      return;
    }
    if (onChange) {
      onChange(index + 1);
    }
  };

  const stars = [];

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement;
    if (isHalf && value - i > 0 && value - i < 1) {
      star = halfIcon;
    } else if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        star = fullIcon;
      }
    }

    stars.push(
      <div
        key={i}
        style={{ cursor: "pointer" }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {React.cloneElement(star, {
          size: size,
          color:
            i <= Number(hoverValue)
              ? hoverColor
              : i < value
              ? activeColor
              : color,
        })}
      </div>
    );
  }

  return <div className={`flex ${gap} ${className}`}>{stars}</div>;
};

export default Rating;
