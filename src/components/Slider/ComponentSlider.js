import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, EffectCoverflow, Scrollbar, A11y } from 'swiper/modules';

const ComponentSlider = ({ components, ...otherProps }) => {
  return (
    <div style={{ marginTop: 30, overflow: 'hidden' }} {...otherProps}>
      <Swiper
        modules={[EffectCoverflow, Pagination, Navigation, A11y, Scrollbar]}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 0, // Adjust the rotate value
          stretch: 0, // Adjust the stretch value
          depth: 100, // Adjust the depth value
          modifier: 1, // Adjust the modifier value
        }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        onInit={(swiper) => {
          swiper.params.navigation.nextEl = '.swiper-button-next';
          swiper.params.navigation.prevEl = '.swiper-button-prev';
        }}
      >
        {components.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{ width: '300px', height: '500px', background: '#edf3fc' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.5)',
                borderRadius: '10px', // Add border-radius to soften corners
              }}
            >
              {item}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ComponentSlider;
