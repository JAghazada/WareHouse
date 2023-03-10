const choose_file = document.querySelector("#ChooseImage");
const imgArea = document.querySelector("#preview-img");
const deleteImg = document.querySelector(".delete-img");
let reader;
deleteImg.addEventListener("click", () => {
  imgArea.innerHTML = "";
  const ChooseImage = document.querySelector("#ChooseImage");
  ChooseImage.value = "";
  reader = new FileReader();
  reader.abort();
});
choose_file.addEventListener("change", function () {
  const MimeType = ["jpg", "jpeg", "gif", "png"];

  const image = this.files[0];
  try {
    const splitImage = image.name.split(".");
    const extension = splitImage[splitImage.length - 1];
    if (MimeType.indexOf(extension) !== -1) {
      reader = new FileReader();
      imgArea.innerHTML = ``;
      reader.onload = () => {
        // const allImg = imgArea.querySelectorAll('img');
        // allImg.forEach(item=> item.remove());
        const imgUrl = reader.result;
        const img = document.createElement("img");
        img.classList.add("image-properties");
        img.src = imgUrl;
        imgArea.appendChild(img);
      };
      reader.readAsDataURL(image);
    } else alert("jpg,jpeg,gif veya png formtainda sekil elave edin");
  } catch (error) {
    alert("Xeta bas verdi");
  }
});
