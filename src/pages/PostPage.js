import React, { useEffect, useState } from "react";
import Header from "components/Header";
import Footer from "components/Footer";
import Section from "components/Section";
import { Container } from "react-bootstrap";
import { useParams } from "react-router";

const PostPage = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const parseMarkdown = (text) => {
    const parts = text.split("---");

    if (parts.length < 3) {
      return { data: {}, content: text };
    }

    const frontmatter = parts[1];
    const content = parts.slice(2).join("---");

    const data = {};
    const lines = frontmatter.split("\n");

    let currentKey = null;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("-") && currentKey) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        data[currentKey].push(trimmed.replace("-", "").trim());
        return;
      }

      const [key, ...rest] = trimmed.split(":");
      if (!key) return;

      const value = rest.join(":").trim();

      if (value === "") {
        currentKey = key.trim();
        data[currentKey] = [];
      } else {
        data[key.trim()] = value;
        currentKey = key.trim();
      }
    });

    return { data, content };
  };

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await fetch(`/content/blog/${id}.md`);
        const text = await res.text();

        const { data, content } = parseMarkdown(text);

        setNews({
          title: data.title || "",
          date: data.date || "",
          tag: data.tag || [],
          image: data.image || "",
          content: content,
        });

        setLoading(false);
      } catch (err) {
        console.error("Load post error:", err);
      }
    };

    if (id) loadPost();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <Section scheme="white">
          <Container>Đang tải bài viết...</Container>
        </Section>
        <Footer />
      </>
    );
  }

  const { title, date, tag, content, image } = news;

  return (
    <>
      <Header />

      <Section scheme="white">
        <Container>
          {image && (
            <div
              style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                aspectRatio: "3",
              }}
            />
          )}

          <div className="page-title mt-4">{title}</div>

          <div className="d-flex justify-content-between">
            <div className="tags">
              {tag.map((t, index) => (
                <span key={index} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <div
              style={{
                color: "#999",
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              Ngày đăng: {date ? new Date(date).toLocaleDateString("vi-VN") : ""}
            </div>
          </div>

          <div className="mt-4 page-content">
            <div dangerouslySetInnerHTML={{ __html: content }} />

            <div className="tags text-end">
              Từ khóa:
              {tag.map((t, index) => (
                <span key={index} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <hr className="mt-5 footer-divider" />
        </Container>
      </Section>

      <Footer />
    </>
  );
};

export default PostPage;