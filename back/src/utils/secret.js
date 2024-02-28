const crypto = require("crypto");

const secret = "Best Team Ever";
const secret2 = "Pikachu";

const hash = crypto.createHmac("sha256", secret).update(secret2).digest("hex");

const secretRefresh = "Top Secret";
const secretRefresh2 = "Notebook";

const hashRefresh = crypto
    .createHmac("sha256", secretRefresh)
    .update(secretRefresh2)
    .digest("hex");

console.log(hash)
console.log(hashRefresh); 