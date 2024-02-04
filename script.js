import Dot from "./dot.js";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const img = document.querySelector("img");

canvas.width = innerWidth;
canvas.height = innerHeight;

//only start the function if the image if the image is fully loaded
addEventListener("load", () => {
  //this will make a new version of our image

  c.drawImage(img, 0, 0);

  //this will take all the pixel related data of the image

  const imageData = c.getImageData(
    0,
    0,
    img.naturalWidth,
    img.naturalHeight
  ).data;

  const dots = [];
  const pixels = [];

  //Looping over imageData
  //every 4 values of data represent RGBA a - alpha

  for (let i = 0; i < imageData.length; i += 4) {
    if (imageData[i] === 0) continue;

    const x = (i / 4) % img.naturalWidth;
    const y = Math.floor(Math.floor(i / img.naturalWidth) / 4);

    if (x % 5 === 0 && y % 5 === 0) {
      pixels.push({
        x,
        y,
        r: imageData[i],
        g: imageData[i + 1],
        b: imageData[i + 2],
      });
    }
  }

  pixels.forEach((pixel) => {
    dots.push(new Dot(pixel.x, pixel.y, pixel.r, pixel.g, pixel.b, 0, 0));
  });

  c.clearRect(0, 0, innerWidth, innerHeight);

  function animate() {
    requestAnimationFrame(animate);
    dots.forEach((dot) => {
      dot.draw(c);
      dot.x++;
    });
  }

  animate();
});
