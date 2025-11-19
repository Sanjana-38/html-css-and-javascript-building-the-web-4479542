const photos = JSON.parse(localStorage.getItem("capturedPhotos")) || [];
const canvas = document.getElementById("finalStrip");
const ctx = canvas.getContext("2d");
const stripWidth = 600;
const stripHeight = 2400;
const singleHeight = stripHeight / 4;
canvas.width = stripWidth;
canvas.height = stripHeight;
ctx.fillStyle = "#ffffff";
ctx.fillRect(0, 0, stripWidth, stripHeight);
function buildStrip() {
    let loaded = 0;
    photos.forEach((src, i) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            ctx.drawImage(img, 0, i * singleHeight, stripWidth, singleHeight);
            loaded++;
            if (loaded === photos.length) {
                console.log("Final photobooth strip created!");
            }
        };
    });
}
buildStrip();
document.getElementById("downloadBtn").addEventListener("click", () => {
    const a = document.createElement("a");
    a.download = "photobooth_strip.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
});