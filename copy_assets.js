import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcAvatar = "C:\\Users\\abn\\.gemini\\antigravity\\brain\\7dbe0731-9587-438a-9fee-e91163b974ea\\media__1791225836892.jpg";
const destAvatar = path.join(__dirname, 'src', 'assets', 'yash_photo.png');

const srcResume = "C:\\Users\\abn\\.gemini\\antigravity\\brain\\7dbe0731-9587-438a-9fee-e91163b974ea\\.user_uploaded\\media_1791614918252.pdf";
const destResume = path.join(__dirname, 'public', 'resume.pdf');

try {
  fs.copyFileSync(srcAvatar, destAvatar);
  console.log("Photo copied successfully to " + destAvatar);
} catch (e) {
  console.error("Failed to copy photo:", e.message);
}

try {
  fs.copyFileSync(srcResume, destResume);
  console.log("Resume copied successfully to " + destResume);
} catch (e) {
  console.error("Failed to copy resume:", e.message);
}
