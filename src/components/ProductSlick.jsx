import React, { useContext } from "react";
import Slider from "react-slick";
import "./style.css";
import { AppContext } from "../context/AppContext";
import ProductGrid from "./ProductGrid";
import Loading from "./Loading";

function ProductSlick() {
  const { product ,loadingScreen} = useContext(AppContext);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      {loadingScreen && <Loading/>}
      <div className="slick">
        <Slider {...settings}>
          {product?.map((item, index) => {
            return (
              <div className="slick-div" key={index}>
                <img
                  src={item.image}
                  alt=""
                  width={"150px"}
                  style={{ margin: "auto" }}
                />
                <h4>{item.title}</h4>
                <p>{item.price} TL</p>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="grid">
        <ProductGrid />
      </div>
    </div>
  );
}

export default ProductSlick;
