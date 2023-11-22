"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

type CarouselImagesProps = {
  images: Array<string>;
};

const fallbackImage =
  "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

const CarouselImages: React.FC<CarouselImagesProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId: any;
    if (images && images.length > 1) {
      intervalId = setInterval(() => {
        setCurrentIndex((state) => {
          if (state + 1 > images.length - 1) {
            return 0;
          }

          return state + 1;
        });
      }, 10000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [images]);

  return (
    <div className="relative w-full h-96" key={crypto.randomUUID()}>
      <Image
        src={images[currentIndex] ?? fallbackImage}
        alt="recipe image"
        className="rounded-md"
        objectFit="cover"
        fill
      />
    </div>
  );
};

export default CarouselImages;
