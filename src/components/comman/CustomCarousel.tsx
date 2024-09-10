import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface CustomCarouselProps {
  children: JSX.Element[] | JSX.Element;
  className?: string;
  containerClassName?: string;
  showArrow?: boolean;
  dots?: boolean;
}

const CustomCarousel = ({
  showArrow = false,
  dots = true,
  children,
  className,
  containerClassName,
}: CustomCarouselProps) => {

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      //   opts={{
      //     loop: true,
      //     align: "start",
      //   }}
      setApi={setApi}
      className={containerClassName}
    >
      <CarouselContent>
        {Array.isArray(children) ? (
          children.map((slide, index) => {
            return (
              <CarouselItem key={index} className={className}>
                {slide}
              </CarouselItem>
            );
          })
        ) : (
          <CarouselItem>{children}</CarouselItem>
        )}
      </CarouselContent>
      {showArrow && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
      {dots && <CarouselDots count={count} current={current} />}
    </Carousel>
  );
};

export default CustomCarousel;
