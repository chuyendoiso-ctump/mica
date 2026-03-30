import React, { useEffect, useState, useRef } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Section from 'components/Section';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

const EventPage = () => {
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);

    // 1. Thêm useRef để tạo tham chiếu đến thẻ div chứa nội dung
    const contentRef = useRef(null);

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

    // Đoạn mã TỰ ĐỘNG load file JS từ thư mục public dựa trên ID của sự kiện
    useEffect(() => {
        if (!loading && contentRef.current) {
            const scriptId = `event-script-${id}`;
            
            // Nếu chưa có thẻ script này trên trang thì mới tạo mới
            if (!document.getElementById(scriptId)) {
                const script = document.createElement('script');
                script.id = scriptId;
                // Trỏ đúng vào đường dẫn trong thư mục public của bạn
                script.src = `/json/events/eventScripts/event_${id}.js`;
                script.async = true;
                
                // Gắn thẻ script vào body để trình duyệt tải và thực thi
                // Nếu sự kiện không có file JS (ví dụ event 1, 2), trình duyệt sẽ tự động bỏ qua (báo 404 ngầm) mà không gây sập web.
                document.body.appendChild(script);
            }

            // Dọn dẹp: Xóa thẻ script khi người dùng rời khỏi trang sự kiện này
            return () => {
                const existingScript = document.getElementById(scriptId);
                if (existingScript) {
                    document.body.removeChild(existingScript);
                }
            };
        }
    }, [loading, content, id]);

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
                                    backgroundSize: '100% 100%',
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
