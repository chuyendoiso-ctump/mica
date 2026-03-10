/* eslint-disable react/prop-types */
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const NewsTile = ({ slug, landscape = false }) => {
  const [news, setNews] = useState(null);

  const getShortContent = (content, words = 50) => {
    if (!content) return "";

    let cleanText = content
      .replace(/<\/?[^>]+(>|$)/g, "") // remove html tags
      .replace(/\n/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    if (typeof document !== "undefined") {
      const txt = document.createElement("textarea");
      txt.innerHTML = cleanText;
      cleanText = txt.value;
    }

    const wordsArray = cleanText.split(" ");
    if (wordsArray.length <= words) return cleanText;

    return wordsArray.slice(0, words).join(" ") + "...";
  };

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
        const res = await fetch(`/content/blog/${slug}.md`);
        const text = await res.text();

        const { data, content } = parseMarkdown(text);

        setNews({
          title: data.title || "",
          date: data.date || "",
          tag: data.tag || [],
          image: data.image || "",
          shortContent: getShortContent(content, 20),
        });
      } catch (err) {
        console.error("Load markdown error:", err);
      }
    };

    if (slug) loadPost();
  }, [slug]);

  if (!news) return <div>Loading...</div>;

  const { title, date, shortContent, tag, image } = news;

  return (
    <div className={clsx("news-tile p-3 rounded-3 mb-4", landscape && "landscape")}>
      <Row>
        <Col xs={12} lg={landscape ? 3 : 12}>
          <img
            src={image}
            className={clsx("rounded-3 w-100 mb-4", landscape && "mb-lg-0")}
            alt={title}
          />
        </Col>

        <Col
          xs={12}
          lg={landscape ? 9 : 12}
          className="d-flex flex-column justify-content-between"
        >
          <div>
            <a href={`/post/${slug}`} className="link">
              {title.length > 60 ? title.slice(0, 60) + "..." : title}
            </a>

            <div className="publish-date">
              {date ? new Date(date).toLocaleDateString("vi-VN") : ""}
            </div>

            <div className="py-3 preview-content">{shortContent}</div>
          </div>

          <div className="tags">
            {tag.map((t, index) => (
              <span className="tag" key={index}>
                {t}
              </span>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NewsTile;