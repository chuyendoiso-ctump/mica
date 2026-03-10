/* eslint-disable indent */
/* eslint-disable react/jsx-one-expression-per-line */
import Footer from 'components/Footer';
import Header from 'components/Header';
import Section from 'components/Section';
import Slider from 'components/Slider';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { events } from '../constants/event';
import clsx from 'clsx';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import NewsTile from 'components/NewsTile';

const monthNames = [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

const HomePage = () => {
    const renderBanner = () => <Slider />;

    const renderIntroduction = () => {
        return (
            <Section
                scheme="white"
                paddingVertical="pt-5"
            >
                <Container>
                    <Row>
                        <Col
                            xs={{
                                span: 12,
                                order: 2,
                            }}
                            xl={{
                                span: 6,
                                order: 1,
                            }}
                            className="d-flex flex-column"
                        >
                            <div className="section-title association-name mt-4 mt-xl-0">
                                Chi Hội Tim Mạch Can Thiệp Mekong (MICA)
                            </div>
                            <div className="mt-4">
                                MEKONG INTERVENTIONAL CARDIOLOGY ASSOCIATION
                                (MICA) là tổ chức y tế chuyên sâu trong lĩnh vực{' '}
                                <b>
                                    đào tạo, nghiên cứu và ứng dụng công nghệ
                                    tiên tiến trong tim mạch can thiệp
                                </b>
                                . Với sứ mệnh nâng cao trình độ chuyên môn của
                                đội ngũ bác sĩ, thúc đẩy nghiên cứu khoa học và
                                phát triển các phương pháp điều trị tiên tiến,
                                MICA không ngừng đóng góp vào sự phát triển của
                                ngành tim mạch, mang lại chất lượng chăm sóc tốt
                                nhất cho bệnh nhân.
                                <br />
                                Chúng tôi hoạt động dựa trên bốn giá trị cốt
                                lõi:
                                <ul>
                                    <li>
                                        <b>Tinh thông dẫn lối</b> – Không ngừng
                                        học hỏi, trau dồi chuyên môn và đổi mới
                                        để nâng cao chất lượng điều trị.
                                    </li>
                                    <li>
                                        <b>Sáng tạo bứt phá</b> – Ứng dụng công
                                        nghệ tiên tiến nhằm nâng cao hiệu quả
                                        chẩn đoán và can thiệp tim mạch.
                                    </li>
                                    <li>
                                        <b>Hợp tác vững mạnh</b> – Kết nối với
                                        các chuyên gia, tổ chức y tế hàng đầu
                                        trong và ngoài nước để phát triển lĩnh
                                        vực tim mạch.
                                    </li>
                                    <li>
                                        <b>Trách nhiệm tiên phong</b> – Cam kết
                                        vì sức khỏe cộng đồng, lan tỏa tri thức
                                        và nâng cao nhận thức về bệnh tim mạch.
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-2">
                                <a
                                    href="/about-us"
                                    className="link cta"
                                >
                                    Tìm hiểu thêm{' '}
                                    <img
                                        src="/icon/right-angle.webp"
                                        className="prefix-icon"
                                    />
                                </a>
                            </div>
                        </Col>
                        <Col
                            xs={{
                                span: 12,
                                order: 1,
                            }}
                            xl={{
                                span: 6,
                                order: 2,
                            }}
                        >
                            <img
                                src="/banner/intro.webp"
                                className="w-100"
                            />
                        </Col>
                    </Row>
                    {/* <hr className="my-5" />
                    <Row>
                        <Col
                            xs={12}
                            lg={4}
                            className="d-flex"
                        >
                            <div className="h-100">
                                <img
                                    src="/article.webp"
                                    className="mw-100"
                                />
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            lg={8}
                        >
                            <div className="video-container">
                                <iframe
                                    width="560"
                                    height="450"
                                    src="https://www.youtube.com/embed/g18W_XQDyn0?si=iN2RuikCEh7q4wi0"
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                    className="h-100"
                                ></iframe>
                            </div>
                        </Col>
                    </Row> */}
                </Container>
            </Section>
        );
    };

    const renderFeatures = () => {
        return (
            <Section
                scheme="violet"
                paddingVertical=""
                className="py-3 px-3 py-md-3 py-lg-4 py-xl-2"
            >
                <Container>
                    {/* <div className="text-center section-title text-white mb-5">
                        Why choose us?
                    </div> */}
                    <Row className="criterias">
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/heart.webp" />
                                <div>
                                    Can Thiệp
                                    <br />
                                    Động Mạch Vành
                                    <br />
                                    Phức Tạp Qua Da
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/vascular.webp" />
                                <div>
                                    Can Thiệp
                                    <br className="d-inline" /> Mạch Máu
                                    <br />
                                    Qua Da
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/vascular-surgery.webp" />
                                <div>
                                    Can Thiệp
                                    <br /> Sang Thương
                                    <br /> Phân Nhánh
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/disease.webp" />
                                <div>
                                    Sang Thương Tắc
                                    <br /> Hoàn Toàn
                                    <br /> Mạn Tính
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/heartbeat.webp" />
                                <div>Suy Tim</div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/valve.webp" />
                                <div>
                                    Bệnh Van
                                    <br /> & Cấu Trúc Tim
                                </div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/education.webp" />
                                <div>Đào tạo</div>
                            </div>
                        </Col>
                        <Col
                            xs={6}
                            md={4}
                            lg={3}
                            className="py-3 py-md-4"
                        >
                            <div className="criteria">
                                <img src="/highlight-icons/innovation.webp" />
                                <div>
                                    Đổi Mới
                                    <br /> & Y Tế Số
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Section>
        );
    };

    const renderUpcomingEvents = () => {
        // only show 4 upcoming events
        // if there is no upcoming event, show 4 latest events

        const eventsCount = 4;
        const upcomingEvents = events.reduce((acc, event, index, eventsArr) => {
            const { date } = event;
            const eventDateObj = new Date(date);
            const today = new Date();

            const remainingEvents = eventsArr.length - index;
            const requiredEvents = eventsCount - acc.length;

            if (
                (eventDateObj >= today && acc.length < eventsCount) ||
                requiredEvents >= remainingEvents
            ) {
                acc.push(event);
            }

            return acc;
        }, []);

        return (
            <Section scheme="blue">
                <Container>
                    <div className="section-title association-name">
                        Sự Kiện Sắp Diễn Ra
                    </div>
                    <Row className="mt-4 mt-md-5">
                        {upcomingEvents.map(
                            ({
                                date,
                                title,
                                description,
                                id,
                                location,
                                time,
                                isSpecial,
                            }) => {
                                const today = new Date();
                                const eventDateObj = new Date(date);
                                const isClosed = eventDateObj < today;
                                const currentYear = today.getFullYear();
                                const eventYear = eventDateObj.getFullYear();
                                const shouldShowYear = eventYear !== currentYear;
                                return (
                                    <Col
                                        xs={12}
                                        md={6}
                                        xl={3}
                                        key={id}
                                        className="pb-3"
                                    >
                                        <div
                                            className={clsx(
                                                'event-tile',
                                                isClosed && 'disabled',
                                                isSpecial && 'special',
                                            )}
                                        >
                                            <div className="event-header p-4 py-3">
                                                <div className="month">
                                                    {monthNames?.[
                                                        eventDateObj.getMonth()
                                                    ]}
                                                    {shouldShowYear && (
                                                        <span> {eventYear}</span>
                                                    )}
                                                </div>
                                                <div className="date">
                                                    <span className="d-inline-block">
                                                        {eventDateObj.getDate()}
                                                    </span>
                                                    <span
                                                        className={clsx(
                                                            'time',
                                                            isClosed &&
                                                            'closed',
                                                        )}
                                                    >
                                                        {isClosed ?
                                                            'CLOSED'
                                                            : time}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="event-body p-4">
                                                <div className="event-title mb-4">
                                                    <a href={`/event/${id}`}>
                                                        {title}
                                                    </a>
                                                </div>
                                                {description && (
                                                    <div className="event-description">
                                                        {description}
                                                    </div>
                                                )}
                                                {location && (
                                                    <div className="location">
                                                        <b>Địa điểm: </b>{' '}
                                                        {location}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Col>
                                );
                            },
                        )}
                    </Row>
                </Container>
            </Section>
        );
    };

    const renderPartners = () => {
        return (
            <Section scheme="white">
                <Container>
                    <div className="mb-5 association-name d-flex justify-content-start justify-content-lg-center">
                        Đối Tác & Hợp Tác
                    </div>
                    <AliceCarousel
                        autoPlay
                        autoPlayInterval={2000}
                        disableButtonsControls
                        infinite
                        paddingLeft={20}
                        paddingRight={20}
                        responsive={{
                            0: { items: 2 },
                            568: { items: 3 },
                            768: { items: 4 },
                            1024: { items: 5 },
                        }}
                        mouseTracking
                        touchTracking
                        // disableDotsControls
                        items={new Array(12).fill(0).map((_, index) => (
                            <img
                                key={index}
                                src={`/partner/${index + 1}.webp`}
                            />
                        ))}
                    />
                </Container>
            </Section>
        );
    };

    const renderHealthCare = () => {
        return (
            <Section scheme="blue">
                <Container>
                    <Row>
                        <Col
                            xs={12}
                            xl={6}
                        >
                            <div className="mb-4 association-name">
                                Chăm Sóc Sức Khoẻ Cộng Đồng
                            </div>
                            <div>
                                Chúng tôi cam kết mang lại dịch vụ y tế chất
                                lượng cao cho cộng đồng:
                                <ul>
                                    <li className="my-3">
                                        <b>
                                            Khám bệnh miễn phí & tư vấn sức khỏe
                                        </b>{' '}
                                        tại các khu vực khó khăn.
                                    </li>
                                    <li className="my-3">
                                        <b>Hỗ trợ chi phí điều trị tim mạch</b>{' '}
                                        cho bệnh nhân có hoàn cảnh khó khăn.
                                    </li>
                                    <li className="my-3">
                                        <b>
                                            Nâng cao nhận thức về bệnh tim mạch
                                        </b>{' '}
                                        qua hội thảo & truyền thông.
                                    </li>
                                </ul>
                            </div>
                            Cùng MICA chung tay giúp đỡ cộng đồng
                            <ul>
                                <li className="my-3">
                                    Thành viên chính thức – Dành cho bác sĩ,
                                    chuyên gia tim mạch mong muốn học tập,
                                    nghiên cứu và phát triển chuyên môn.
                                </li>
                                <li className="my-3">
                                    Cộng tác viên – Cơ hội tham gia vào các dự
                                    án nghiên cứu, sự kiện y khoa và chương
                                    trình đào tạo của MICA.
                                </li>
                                <li className="my-3">
                                    Đối tác hợp tác – Kết nối cùng các tổ chức y
                                    tế, bệnh viện, trường đại học và doanh
                                    nghiệp để mở rộng nghiên cứu và chuyển giao
                                    công nghệ.
                                </li>
                            </ul>
                            <div className="mt-4">
                                <a
                                    href="/contact-us"
                                    className="link cta"
                                >
                                    Đăng ký ngay{' '}
                                    <img
                                        src="/icon/right-angle.webp"
                                        className="prefix-icon"
                                    />
                                </a>
                            </div>
                        </Col>
                        <Col
                            xs={12}
                            xl={6}
                        >
                            <img
                                src="/health-care.webp"
                                className="w-100 mt-4 mt-xl-0"
                            />
                        </Col>
                    </Row>
                </Container>
            </Section>
        );
    };

    const renderTrainers = () => {
        return (
            <Section scheme="blue">
                <Container>
                    <Row>
                        <Col
                            xs={12}
                            xl={6}
                            className="d-flex align-items-center"
                        >
                            <img
                                src="/trainer.webp"
                                className="mw-100"
                            />
                        </Col>
                        <Col
                            xs={12}
                            xl={{
                                span: 6,
                            }}
                        >
                            <div className="association-name section-title mt-5 mt-xl-0">
                                Thành Viên MICA – Đội Ngũ Chuyên Gia Hàng Đầu
                            </div>
                            <div className="mt-4">
                                MICA tự hào được dẫn dắt bởi đội ngũ chuyên gia
                                giàu kinh nghiệm và uy tín trong lĩnh vực tim
                                mạch can thiệp:
                                <ul>
                                    <li className="my-3">
                                        <b>Ban Chấp Hành:</b> Gồm 30 chuyên gia
                                        tim mạch giàu kinh nghiệm, tiên phong
                                        trong nghiên cứu, điều trị và đào tạo.
                                    </li>
                                    <li>
                                        <b>Hội đồng Cố vấn:</b> Quy tụ các bác
                                        sĩ và nhà khoa học hàng đầu trong nước &
                                        quốc tế, đóng góp chuyên môn và định
                                        hướng chiến lược, thúc đẩy sự phát triển
                                        của lĩnh vực tim mạch can thiệp tại Việt
                                        Nam.
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-4">
                                Bạn là bác sĩ, chuyên gia tim mạch hoặc người
                                quan tâm đến lĩnh vực tim mạch can thiệp? Hãy
                                gia nhập{' '}
                                <b>
                                    Mekong International Cardiology Association
                                    (MICA)
                                </b>{' '}
                                và cùng chúng tôi tạo ra những bước tiến đột phá
                                trong nghiên cứu, đào tạo và ứng dụng công nghệ
                                hiện đại trong tim mạch!
                            </div>
                            <div className="mt-4">
                                <a
                                    href="/contact-us"
                                    className="link cta"
                                >
                                    Đăng ký thành viên{' '}
                                    <img
                                        src="/icon/right-angle.webp"
                                        className="prefix-icon"
                                    />
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Section>
        );
    };

    const renderNews = () => {
        return (
            <Section scheme="white">
                <Container>
                    <div className="section-title mb-4 association-name">
                        Tin Tức & Cập Nhật Mới Nhất
                        <a
                            href="/medical-news"
                            className="ms-4 section-title-link"
                        >
                            Xem thêm{' '}
                            <img
                                src="/icon/right-angle.webp"
                                className="prefix-icon"
                            />
                        </a>
                    </div>
                    <Row>
                        <Col
                            xs={12}
                            lg={4}
                        >
                            <NewsTile slug="Post1" />
                        </Col>
                        <Col
                            xs={12}
                            lg={4}
                        >
                            <NewsTile slug="Post2" />
                        </Col>
                        <Col
                            xs={12}
                            lg={4}
                        >
                            <NewsTile slug="Post1" />
                        </Col>
                    </Row>
                </Container>
            </Section>
        );
    };

    return (
        <>
            <Header />
            {renderBanner()}
            {renderFeatures()}
            {renderUpcomingEvents()}
            {renderIntroduction()}
            {renderNews()}
            {renderTrainers()}
            {renderPartners()}
            {renderHealthCare()}
            <Footer />
        </>
    );
};

export default HomePage;
