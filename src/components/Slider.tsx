import React, { FC, ReactNode, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css";

// import required modules
import { EffectFade, Navigation, Pagination } from "swiper";
import { Card } from "react-bootstrap";

type SlideImages = {
  thumbnail: string;
  additionScreens: string[];
};

type SliderProps = {
  images: SlideImages;
  children?: ReactNode;
};
const Slider: FC<SliderProps> = ({ images }) => {
  const [isHover, setIsHover] = useState(false);
  console.log(isHover);
  return (
    <div onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={isHover}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card.Img variant="top" src={images.thumbnail} height="90%" style={{ objectFit: "cover" }} alt={`product thumbnail`} />
        </SwiperSlide>
        {images.additionScreens.map((image, index) => (
          <SwiperSlide>
            <Card.Img variant="top" src={image} height="90%" style={{ objectFit: "cover" }} alt={`product image-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
