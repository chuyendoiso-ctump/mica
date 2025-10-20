import React, { useEffect, useState } from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Section from 'components/Section';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router';

const PostPage = () => {
    const [news, setNews] = useState({});
    const [loading, setLoading] = useState(true);

    let params = useParams();
    const id = params.id;

    const { title = '', date = '', tags = [], content = '' } = news || {};

    useEffect(() => {
        const fetchNews = async () => {
            const jsonData = await fetch(`/json/posts/${id}.json`);
            const news = await jsonData.json();
            setNews(news);
        };

        fetchNews();
    }, [id]);

    useEffect(() => {
        if (news) {
            setLoading(false);
        }
    }, [news]);

    return (
        <>
            <Header />
            <Section scheme="white">
                <Container>
                    {loading && 'Đang tải bài viết'}
                    {!loading && (
                        <>
                            <div
                                style={{
                                    backgroundImage: `url(/post/${id == '4' ? 'conference_main' : id}.webp)`,
                                    backgroundSize: 'cover',
                                    backgroundPositionY: '25%',
                                    width: '100%',
                                    aspectRatio: '3',
                                }}
                            />
                            <div className="page-title mt-4">{title}</div>
                            <div className="d-flex justify-content-between">
                                <div
                                    className="tags"
                                    style={{
                                        lineHeight: '100%',
                                    }}
                                >
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="tag"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div
                                    style={{
                                        color: '#999',
                                        fontStyle: 'italic',
                                        fontWeight: 600,
                                    }}
                                >
                                    Ngày đăng: {date}
                                </div>
                            </div>
                            <div className="mt-4 page-content">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: content,
                                    }}
                                ></div>
                                <div
                                    className="tags text-end"
                                    style={{
                                        lineHeight: '100%',
                                    }}
                                >
                                    Từ khóa:
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="tag"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
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

export default PostPage;
