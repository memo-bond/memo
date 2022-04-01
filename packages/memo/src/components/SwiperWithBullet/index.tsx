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
  
const SwiperWithBullet = ({data}) => { 
        // install Swiper modules
        SwiperCore.use([Pagination, Navigation]);
        const pagination = {
          "clickable": true,
        }
      
    
      return (
        <Grid container direction="row">
            <Swiper className="swiper-with-bullet-container"
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
                  <SwiperSlide className="swiper-with-bullet">
                    <Grid container direction="row" style={{maxWidth: "80%", margin: "auto", minHeight: "135px"}}>
                        <div className="swiper-header">“My team can finish our Project with light speeds. Very flexible and easy to maintain!”</div>
                        <div className="swiper-description-author">Lam Le</div>
                        <div className="swiper-description-title" style={{color: "#8F90A6", fontSize: "14px", lineHeight: "15px", margin: "auto", textAlign: "center", width: "100%", paddingBottom: "20px"}}>Founder</div>
                        {/* <img src={item.image} /> */}
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
        </Grid>
    )
};

export default SwiperWithBullet;