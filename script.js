const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loading = document.getElementById("loading");
const error = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to load a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image at ${url}`);
    img.src = url;
  });
}

// Function to download and display all images
function downloadImages() {
  // Reset UI
  output.innerHTML = "";
  error.textContent = "";
  loading.style.display = "block";

  const promises = images.map(image => downloadImage(image.url));

  Promise.all(promises)
    .then(loadedImages => {
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(err => {
      error.textContent = err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}

// Add event listener to button
btn.addEventListener("click", downloadImages);
