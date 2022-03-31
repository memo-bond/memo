import React from "react";
import "./styles.css";
import { Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/lazy"
import "swiper/css/navigation"

// import Swiper core and required modules
import SwiperCore, {
    Pagination, Navigation
  } from 'swiper';
  
const CustomSwiper = ({data}) => { 
        // install Swiper modules
        SwiperCore.use([Pagination, Navigation]);
        const pagination = {
          "clickable": true,
        }
      
    
      return (
        <Grid container direction="row">
            <Swiper className="custom-swiper-container"
                breakpoints={{
                "640": {
                  slidesPerView: 1,
                },
                "2048": {
                  slidesPerView: 1,
                }
              }}
              navigation={true} slidesPerView={1} centeredSlides={true} pagination={pagination}>
                {data.map((item, index) => (
                  <SwiperSlide className="custom-swiper">
                    <Grid container direction="row" style={{ marginTop: 24 }}>
                        <div className="swiper-header" style={{marginBottom: 5, width: "100%"}}>{item.header}</div>
                        <div className="swiper-description" style={{color: "#727272", fontSize: "14px", lineHeight: "15px", width: "433px", margin: "auto"}}>{item.description}</div>
                        <img src={item.image} />
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
        </Grid>
    )
};

export default CustomSwiper;