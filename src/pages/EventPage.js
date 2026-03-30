import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Section from 'components/Section';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

const EventPage = () => {
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);

    let params = useParams();
    const id = params.id;

    const {
        title = '',
        date = '',
        location = '',
        shortDescription = '',
        content = '',
    } = event || {};

    const dateObj = new Date(date);

    useEffect(() => {
        const fetchNews = async () => {
            const jsonData = await fetch(`/json/events/${id}.json`);
            const event = await jsonData.json();
            setEvent(event);
        };

        fetchNews();
    }, [id]);

    useEffect(() => {
        if (event) {
            setLoading(false);
        }
    }, [event]);

    return (
        <>
            <Header />
            <Section scheme="white">
                <Container>
                    {loading && 'Đang tải sự kiện'}
                    {!loading && (
                        <>
                            <div
                                style={{
                                    backgroundImage: `url(/event/${id}.webp)`,
                                    backgroundSize: '100%',
                                    width: '100%',
                                    aspectRatio: '800/300',
                                }}
                            />
                            <div className="page-title mt-4">{title}</div>
                            <div className="page-content">
                                <div className="sub-heading-2">
                                    {shortDescription}
                                </div>
                                <div>
                                    <b>Thời gian:</b>{' '}
                                    {dateObj.toLocaleDateString('vi-VN')}
                                </div>
                                {location && (
                                    <div>
                                        <b>Địa điểm:</b> {location}
                                    </div>
                                )}
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                ></div>
                            </div>
                        </>
                    )}
                    <hr className="mt-5 footer-divider" />
                </Container>
            </Section>
            <Footer />
        </>
    );
};

export default EventPage;
