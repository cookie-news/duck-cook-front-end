"use client";

import Carousel from "react-material-ui-carousel";

import Image from "next/image";

type CarouselImagesProps = {
  images: Array<string>;
};

const CarouselImages: React.FC<CarouselImagesProps> = ({ images }) => {
  return (
    <div className="relative w-full h-96" key={crypto.randomUUID()}>
      <Image
        src="https://dcqgxwhjxkkignjziqvf.supabase.co/storage/v1/object/public/duck-cook/65540c1cfe1a98737c019377/a1508f3c-8456-4144-badd-20d13308d9b8"
        alt="recipe image"
        className="rounded-md"
        objectFit="cover"
        fill
      />
      ;
    </div>
  );
};

export default CarouselImages;
