"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

type CarouselImagesProps = {
  images: Array<string>;
};

const fallbackImage =
  "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

const CarouselImages: React.FC<CarouselImagesProps> = ({ images }) => {
  return (
    <div className="relative w-full h-96" key={crypto.randomUUID()}>
      <Image
        src={images[0] ?? fallbackImage}
        alt="recipe image"
        className="rounded-md"
        objectFit="cover"
        fill
      />
    </div>
  );
};

export default CarouselImages;
