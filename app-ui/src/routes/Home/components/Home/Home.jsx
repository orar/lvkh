// @flow
import React from 'react';
import PromoCodeContainer from '../../../User/containers/PromoCodeContainer';
import Slider from 'react-slick';
import { Icon } from 'antd';
import isEmpty from 'lodash/isEmpty';
import type { Slide } from "../../modules/Slide/SlideModule";
import FixtureContainer from '../../containers/Fixture/FixtureContainer';
import './Home.scss';

type Props = {
  slides: Array<Slide>,
  onFetchSlides: () => any,
}



export class HomeComponent extends React.Component<Props> {
  props: Props;


  componentDidMount(){
    if(isEmpty(this.props.slides)) {
      this.props.onFetchSlides();
    }
  }

  render(){

    const { slides = [] } = this.props;

    const settings = {
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 7000,
      adaptiveHeight: true,
      speed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      pauseOnHover: false,
      nextArrow: null,
      prevArrow: null,
    };


    return (
      <div className="homePageContainer">
        {slides.length &&
        <Slider {...settings}>
          {slides.map(s =>
            <div key={s.id} className="slide" style={{backgroundImage: 'url('+s.cover+')'}}>
              <div className="slideText">
                <div className="slideTextContent">
                  <h1 className="slideTextHeader">{s.header}</h1>
                  <h3 className="slideTextBody">{s.message}</h3>
                </div>
              </div>
            </div>
          )}
        </Slider>
        }
        <div className="homePromoCardBoard">
          <div className="homePromoCard">
            <PromoCodeContainer referrer="homepage" referred />
          </div>
        </div>
        <div>
          <FixtureContainer />
        </div>
      </div>
    )
  }
}


export default HomeComponent;