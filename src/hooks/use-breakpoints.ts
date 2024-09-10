import { useEffect, useState } from "react";

type Breakpoints = "mobile" | "sm" | "md" | "lg";

const useBreakpoints = (
  initialValue: Breakpoints = "lg"
): { viewType: Breakpoints } => {
  const [breakpoints, setBreakpoints] = useState<Breakpoints>(initialValue);

  useEffect(() => {
    const handleResize = (width: number) => {
      if (width < 640) {
        setBreakpoints("mobile");
      } else if (width >= 640 && width < 768) {
        setBreakpoints("sm");
      } else if (width >= 768 && width < 1024) {
        setBreakpoints("md");
      } else if (width >= 1024) {
        setBreakpoints("lg");
      }
    };
    handleResize(window.innerWidth);
    window.addEventListener("resize", () => handleResize(window.innerWidth));

    return () => {
      window.removeEventListener("resize", () =>
        handleResize(window.innerWidth)
      );
    };
  }, []);

  return { viewType: breakpoints };
};

export default useBreakpoints;
