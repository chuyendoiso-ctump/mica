const fs = require("fs");
const path = require("path");

const matter = require("gray-matter");

const blogDir = path.join(__dirname, "../public/content/blog");
const outputFile = path.join(blogDir, "index.json");

try {
  const files = fs.readdirSync(blogDir);

  const posts = files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);
      return {
        slug: file.replace(".md", ""),
        date: data.date ? new Date(data.date).getTime() : 0,
      };
    })
    .sort((a, b) => b.date - a.date)
    .map((post) => post.slug);

  fs.writeFileSync(outputFile, JSON.stringify(posts, null, 2));

  console.log("✅ Blog index created:", posts.length, "posts");
} catch (err) {
  console.error("❌ Error building blog index:", err);
}