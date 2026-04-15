import React from 'react';
import { Carousel } from 'react-bootstrap';
import './style.css';

const Slider = () => {
    return (
        <Carousel interval={5000}>
            <Carousel.Item>
                <a href="/event/8">
                    <img
                        // ratio 488∶195
                        style={{
                            aspectRatio: '488 / 195',
                        }}
                        src="/slide/8.webp"
                        className="slide-img"
                    /></a>
            </Carousel.Item>
            {/* <Carousel.Item>
                <img
                    src="/slide/6.webp"
                    className="slide-img"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/slide/5.webp"
                    className="slide-img"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/slide/1.webp"
                    className="slide-img"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/slide/2.webp"
                    className="slide-img"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/slide/3.webp"
                    className="slide-img"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    src="/slide/4.webp"
                    className="slide-img"
                />
            </Carousel.Item> */}
        </Carousel>
    );
};

export default Slider;
