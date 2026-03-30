/* eslint-disable linebreak-style */
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

    // Đoạn mã TỰ ĐỘNG load file JS bằng FETCH
    useEffect(() => {
        // --- THÊM LOG ĐỂ KIỂM TRA TÌNH TRẠNG THỰC TẾ ---
        console.log("👉 Đang kiểm tra điều kiện chạy JS:", { 
            id: id, 
            isLoading: loading, 
            hasContent: Boolean(content) 
        });

        // Chỉ cần hết loading và có dữ liệu content là chạy, không phụ thuộc vào contentRef nữa
        if (!loading && content) {
            const scriptId = `event-script-${id}`;
            
            const fetchAndRunScript = async () => {
                try {
                    console.log(`🔄 Bắt đầu tải script từ server cho sự kiện ${id}...`);
                    
                    // Thêm process.env.PUBLIC_URL để chắc chắn đường dẫn đúng trên mọi cấu hình React
                    const fetchUrl = `${process.env.PUBLIC_URL || ''}/json/events/eventScripts/event_${id}.js`;
                    const response = await fetch(fetchUrl);
                    const scriptText = await response.text();
                    
                    // Nếu dữ liệu trả về bị sai (chứa thẻ HTML hoặc <noscript>) do sai đường dẫn
                    if (scriptText.includes('<noscript>') || scriptText.trim().startsWith('<')) {
                        console.log(`⚠️ Trình duyệt trả về HTML thay vì JS. Không tìm thấy file tại: ${fetchUrl}`);
                        return;
                    }

                    // Xóa script cũ đi (nếu có) để đảm bảo code JS được chạy lại từ đầu
                    const existingScript = document.getElementById(scriptId);
                    if (existingScript) {
                        existingScript.remove();
                    }

                    // Tạo thẻ script mới để trình duyệt thực thi ngay
                    const script = document.createElement('script');
                    script.id = scriptId;
                    script.text = scriptText; 
                    document.body.appendChild(script);
                    
                    console.log(`✅ Đã load và CHẠY thành công script cho sự kiện ${id}`);
                } catch (error) {
                    console.log('❌ Lỗi khi fetch script sự kiện:', error);
                }
            };

            fetchAndRunScript();

            // Dọn dẹp: Xóa thẻ script khi người dùng rời khỏi trang
            return () => {
                const existingScript = document.getElementById(scriptId);
                if (existingScript) {
                    existingScript.remove();
                }
            };
        } else {
            console.log("⏳ Chưa đủ điều kiện chạy JS. Đang chờ dữ liệu content tải xong...");
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
