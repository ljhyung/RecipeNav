import 'rc-banner-anim/assets/index.css';
import React from 'react';
import QueueAnim from 'rc-queue-anim';
import BannerAnim from 'rc-banner-anim';
import {Button, Col, Row} from 'antd';
import {banner} from './data';
// import './Banner.scss';

const {Element} = BannerAnim;
const {BgElement} = Element;

const Banner = () => {
    const bannerChildren = banner.map((item, i) => {
        const children = item
            .children
            .map((child, ii) => {
                const tag = child.tag === 'button'
                    ? 'div'
                    : child.tag || 'p';
                const childrenToRender = child.tag === 'button'
                    ? <Button>
                            <a href={child.link} target="_blank">{child.children}</a>
                        </Button>
                    : child.children;
                return React.createElement(tag, {
                    key: ii.toString(),
                    className: child.className,
                    style: child.style || {}
                }, childrenToRender);
            });
        return (
            <Element key={i.toString()}>
                <BgElement
                    key="bg"
                    className="banner-bg"
                    style={{
                        backgroundImage: `url(${item.img})`
                    }}/>
                <QueueAnim
                    key="text"
                    className={item.className}
                    ease={['easeOutCubic', 'easeInQuad']}
                    type={item.queueAnim || 'bottom'}>
                    {children}
                </QueueAnim>
            </Element >
        );
    });

    return (
        <div className="banner page-wrapper">
            <div className="page">
                <Row gutter={32}>
                    <Col md={16} xs={24}>
                      <div className="content-wrap">
                        <h1>
                            주요뉴스
                        </h1>
                        <BannerAnim type="across" duration={550} ease="easeInOutQuint">
                            {bannerChildren}
                        </BannerAnim>
                      </div>
                    </Col>
                    <Col md={8} xs={24}>
                    <div className="content-wrap">
                        <h1>
                            주요지표
                        </h1>
                        <BannerAnim type="across" duration={550} ease="easeInOutQuint">
                            {bannerChildren}
                        </BannerAnim>
                        </div>
                    </Col>
                </Row>
            </div>

        </div>
    );
};

export default Banner;
