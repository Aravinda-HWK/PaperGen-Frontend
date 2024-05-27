import React from 'react';
import HoverCarousel from 'hover-carousel';
import image1 from 'src/assets/images/home/img1.PNG';
import image2 from 'src/assets/images/home/img2.PNG';
import image3 from 'src/assets/images/home/img3.PNG';
import image4 from 'src/assets/images/home/img1.PNG';
import image5 from 'src/assets/images/home/img2.PNG';

const ImageCarousel = () => {
  const images = [`${image1}`, `${image2}`, `${image3}`, `${image4}`, `${image5}`];

  return (
    <div>
      <HoverCarousel style={{ width: '45%' }} images={images} />
    </div>
  );
};

export default ImageCarousel;
