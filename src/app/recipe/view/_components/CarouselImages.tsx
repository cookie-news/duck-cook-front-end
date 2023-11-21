"use client";

import { useState } from "react";

import Image from "next/image";

type CarouselImagesProps = {
  images: Array<string>;
};

const fallbackImage =
  "https://www.pulsecarshalton.co.uk/wp-content/uploads/2016/08/jk-placeholder-image.jpg";

const CarouselImages: React.FC<CarouselImagesProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(
    images !== null ? images[0] : ""
  );

  return (
    <div className="relative w-full h-96" key={crypto.randomUUID()}>
      <Image
        src={currentImage ?? fallbackImage}
        alt="recipe image"
        className="rounded-md"
        objectFit="cover"
        fill
      />
      <div>
        {images &&
          images.length > 0 &&
          images.map((urlImage) => (
            <div key={crypto.randomUUID()}>
              <Image
                src={urlImage}
                alt="recipe image"
                className="rounded-md"
                objectFit="cover"
                fill
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default CarouselImages;
