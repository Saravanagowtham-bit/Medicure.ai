const upload = document.getElementById("imageUpload");
const preview = document.getElementById("preview");
const original = document.getElementById("original");
const status = document.getElementById("status");

let selectedImage = null;

upload.addEventListener("change", () => {
  const file = upload.files[0];

  selectedImage = null;
  preview.replaceChildren();
  original.textContent = "No image selected";
  status.textContent = "";

  if (!file) return;

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    status.textContent = "Please choose a PNG or JPEG image.";
    upload.value = "";
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    status.textContent = "Image must be smaller than 10 MB.";
    upload.value = "";
    return;
  }

  selectedImage = file;

  const url = URL.createObjectURL(file);

  const image = document.createElement("img");
  image.src = url;
  image.alt = "Selected medical image";

  preview.appendChild(image);

  const resultImage = image.cloneNode();
  original.replaceChildren(resultImage);

  status.textContent = "Image selected successfully.";
});


document.getElementById("analyzeBtn").addEventListener("click", () => {

  if (!selectedImage) {
    status.textContent = "Please upload an image first.";
    return;
  }

  status.textContent =
    "Image ready. Connect the backend and AI model to run real analysis.";

});


document.getElementById("reportBtn").addEventListener("click", () => {

  const patientId =
    document.getElementById("patientId").value || "Not provided";

  const age =
    document.getElementById("age").value || "Not provided";

  const notes =
    document.getElementById("notes").value || "Not provided";


  const report = [
    "MEDICURE AI — DEMO REPORT",
    "",
    `Patient ID: ${patientId}`,
    `Age: ${age}`,
    `Clinical notes: ${notes}`,
    `Image: ${selectedImage ? selectedImage.name : "No image uploaded"}`,
    "",
    "AI finding: Not available",
    "Confidence: Not available",
    "Location and evidence: Not available",
    "",
    "This prototype has not performed medical analysis.",
    "Do not use this report for clinical decisions."
  ].join("\n");


  const blob = new Blob([report], {
    type: "text/plain"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "medicure-demo-report.txt";

  link.click();

  URL.revokeObjectURL(url);

});