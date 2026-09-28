import fs from "fs/promises";

export async function saveHtml(html) {
  // Save the complete rendered HTML
  await fs.writeFile("page.html", html, "utf8");
  console.log("HTML saved to page.html");
}
