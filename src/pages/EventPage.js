import React, { useEffect, useState } from 'react';
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

    // 2. Thêm useEffect mới này để "đánh thức" các thẻ <script>
    useEffect(() => {
        // Chỉ chạy khi đã tải xong dữ liệu và đã có DOM
        if (!loading && contentRef.current) {
            // Tìm tất cả các thẻ script bên trong nội dung JSON
            const scripts = contentRef.current.getElementsByTagName('script');
            
            // Chuyển đổi thành mảng để duyệt an toàn
            Array.from(scripts).forEach((oldScript) => {
                // Tạo một thẻ script mới tinh
                const newScript = document.createElement('script');
                
                // Sao chép toàn bộ các thuộc tính (như src="https://cdn.tailwindcss.com")
                Array.from(oldScript.attributes).forEach((attr) => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Sao chép nội dung code JavaScript bên trong
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                
                // Thay thế thẻ script cũ "đóng băng" bằng thẻ mới để trình duyệt thực thi
                if (oldScript.parentNode) {
                    oldScript.parentNode.replaceChild(newScript, oldScript);
                }
            });
        }
    }, [loading, content]); // Effect này chạy lại mỗi khi nội dung thay đổi

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
