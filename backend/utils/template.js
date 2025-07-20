import fs from "fs";
import path from "path";

export function getTemplate(templateName, data) {
  const templatePath = path.resolve("templates", `${templateName}.html`);
  let template = fs.readFileSync(templatePath, "utf-8");

  return template.replace(/{{(.*?)}}/g, (_, key) => data[key.trim()] || "");
}
