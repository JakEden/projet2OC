const reponse = await fetch("http://localhost:5678/api/works");
const data = await reponse.json();
const filterObjet = data.filter((obj) => obj.categoryId === 1);
const filterAppartements = data.filter((obj) => obj.categoryId === 2);
const filterHotelsrestau = data.filter((obj) => obj.categoryId === 3);

const buttonAll = document.getElementById("btn-all");
const buttonObjet = document.getElementById("btn-objet");
const buttonAppartements = document.getElementById("btn-appartments");
const buttonHotelsrestau = document.getElementById("btn-hotelrestaurant");

const loginLink = document.getElementById("btnLogin");

buttonAll.addEventListener("click", functionAll);
buttonObjet.addEventListener("click", functionObjet);
buttonAppartements.addEventListener("click", functionAppartements);
buttonHotelsrestau.addEventListener("click", functionHotelsrestau);

loginLink.addEventListener("click", function () {
  window.location.href = "connexion.html";
});
const sectionGallery = document.querySelector(".gallery");
document.body.onload = functionAll;
// call functionALL to display all the image when loading the page
functionAll();

function functionAll() {
  
  buttonAll.focus();
  sectionGallery.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(imageElement);
  }
}

function functionObjet() {
  sectionGallery.innerHTML = "";
  for (let i = 0; i < filterObjet.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = filterObjet[i].imageUrl;
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(imageElement);
  }
}

function functionAppartements() {
  sectionGallery.innerHTML = "";
  for (let i = 0; i < filterAppartements.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = filterAppartements[i].imageUrl;
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(imageElement);
  }
}
function functionHotelsrestau() {

  sectionGallery.innerHTML = "";
  for (let i = 0; i < filterHotelsrestau.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = filterHotelsrestau[i].imageUrl;
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.appendChild(imageElement);
  }
}
const storageData = localStorage.getItem("idToken");
const tokenObj = JSON.parse(storageData);
const token = tokenObj.token;

if (localStorage.getItem("idToken") !== null) {
  const blackTopBar = document.querySelector(".blackTopBar");
  const modification = document.querySelector(".modification");
  const myProjectTxtIcon = document.querySelector(".myProjectTxtIcon");
  blackTopBar.style.display = "flex";
  modification.style.display = "flex";
  myProjectTxtIcon.style.display = "flex";
}

// Modal part

function modalGallery() {
  const modalGallery = document.querySelector(".modalBody");
  modalGallery.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const imageModal = document.createElement("div");
    imageModal.className = "imageContainer";
    const image = document.createElement("img");
    image.src = data[i].imageUrl;
    const icon = document.createElement("i"); 
    icon.className = "fas fa-trash-alt";
    icon.addEventListener("click", (event) => {
    event.preventDefault();
    deleteImage(data[i].id); // Call the deleteImage function with the image ID
    });
    imageModal.appendChild(image);
    imageModal.appendChild(icon);
    modalGallery.appendChild(imageModal);
  }
}

async function deleteImage(imageId) {
  const accessToken = token;

 await fetch(`http://localhost:5678/api/works/${imageId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}` // Include the access token in the Authorization header
    }
  })
    .then((response) => {
      if (response.ok) {
        console.log(response.status);
        // Image deleted successfully
        console.log("Image deleted");
      } else {
        // Handle error response
        console.log("Failed to delete image");
      }
    })
    .catch((error) => {
      // Handle fetch error
      console.log("Error occurred while deleting image", error);
    });
}

const modal = document.getElementById("myModal");
const modalBtn = document.getElementById("modalBtn");
const span = document.getElementsByClassName("close")[0];
const secondSpan = document.getElementsByClassName("close")[1];

const addPictureBtn = document.getElementById("btnAddPicture");
const secondModal = document.getElementById("mySecondModal");

modalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  modalGallery();
});

// When the user clicks on <span> (x), close the modal
span.addEventListener ("click", () => {
  modal.style.display = "none";
});
// When the user clicks on <span> (x), close the second modal
secondSpan.addEventListener("click", () => {
  secondModal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  } else if (event.target === secondModal) {
    secondModal.style.display = "none";
  }
});

addPictureBtn.addEventListener("click", () => {
  modal.style.display = "none";
  secondModal.style.display = "block";
});

let previewFile; // Variable to store the file from the preview

function handleFileInputChange(event) {
  const fileInput = event.target;
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    // Define the function to run when the FileReader has finished reading the file
    reader.onload = function (e) {
      const previewImage = document.createElement("img");
      previewImage.src = e.target.result;

      const previewContainer = document.querySelector(".addingFile");
      previewContainer.innerHTML = ""; // Clear any previous preview
      previewContainer.appendChild(previewImage);

      // Apply CSS styles to restrict the size of the preview image within the container
      previewImage.style.maxWidth = "100%";
      previewImage.style.maxHeight = "100%";

      // Store the file in the previewFile variable
      previewFile = file;
    };

    // Read the file as a data URL, which represents the file content as a base64-encoded string
    reader.readAsDataURL(file);
  }
}

// Attach the handleFileInputChange function to the change event of a parent element
document.body.addEventListener("change", function (event) {
  const fileInput = event.target;
  if (fileInput && fileInput.id === "myFile") {
    handleFileInputChange(event);
}
});

const validateButton = document.getElementById("validate");
const validate = document.getElementById("validate");
validateButton.setAttribute("type", "button");

let fileInput = document.getElementById("myFile");
let textInput = document.getElementById("title");
let selectOption = document.getElementById("categorySelect");

fileInput.addEventListener("change", checkFormCompletion);
textInput.addEventListener("input", checkFormCompletion);
selectOption.addEventListener("change", checkFormCompletion);
function checkFormCompletion() {
  // Check if the input file, input text, and select option are chosen
  if (fileInput.value !== "" && textInput.value !== "" && selectOption.value !== "") {
    validate.style.backgroundColor = "#1D6154";
    validate.style.borderColor = "#1D6154";
  }
}

validateButton.addEventListener("click", async function (event) {
  event.preventDefault();
  const inputElement = document.getElementById("title");
  const inputValue = inputElement.value;

  const selectElement = document.getElementById("categorySelect");
  const selectedValue = selectElement.value;
  const categoryId = +selectedValue;

  // Use the previewFile variable instead of fileInput.files[0]
  const file = previewFile;

  if (!file || !categoryId || inputValue == 0) {
    const errorMessageModal = document.createElement('p');
    const secondModalFooter = document.getElementById ('secondModalFooter')
    errorMessageModal.textContent = 'le formulaire doit etre complété';
    secondModalFooter.appendChild(errorMessageModal);
  } else {
  validate.style.backgroundColor = "#1D6154";
  const formData = new FormData();
  formData.append("image", file);
  formData.append("title", inputValue);
  formData.append("category", categoryId);

  const accessToken = token;
 
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    redirect: "manual", // Désactive les redirections automatiques
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        console.log("Image postée avec succès");
        console.log(response.status);
      } else if (response.status >= 300 && response.status < 400) {
        console.log("La requête a été redirigée, mais les redirections automatiques sont désactivées.");
        // Gérez manuellement les réponses de redirection si nécessaire
      } else {
        console.log("Échec de la publication de l'image");
        // Gérez les autres erreurs de requête
      }
    })
    .catch((error) => {
      console.log("Une erreur s'est produite lors de la publication de l'image", error);
    });
  }
});
