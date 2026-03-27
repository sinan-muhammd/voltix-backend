require("dotenv").config();
console.log("-----------------------------------------");
console.log("BACKEND ENV DIAGNOSTIC");
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("-----------------------------------------");
if (process.env.FRONTEND_URL === "https://voltixev.vercel.app") {
    console.log("✅ FRONTEND_URL is correct.");
} else {
    console.log("❌ FRONTEND_URL is WRONG or MISSING.");
}
