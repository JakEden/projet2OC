const reponse = await fetch ('http://localhost:5678/api/works');
const data = await reponse.json();
const filterObjet = data.filter(obj => obj.categoryId === 1);
const filterAppartements = data.filter(obj => obj.categoryId === 2);
const filterHotelsrestau = data.filter(obj => obj.categoryId === 3);

const buttonAll = document.getElementById("btn-all");
const buttonObjet = document.getElementById("btn-objet");
const buttonAppartements = document.getElementById("btn-appartments")
const buttonHotelsrestau = document.getElementById("btn-hotelrestaurant")

const loginLink = document.getElementById("btnlogin")

buttonAll.addEventListener("click", functionAll);
buttonObjet.addEventListener("click", functionObjet);
buttonAppartements.addEventListener("click",functionAppartements)
buttonHotelsrestau.addEventListener("click",functionHotelsrestau)

loginLink.addEventListener("click", function() {
  window.location.href = "connexion.html";
});

// call functionALL to display all the image when loading the page
functionAll()



function functionAll() {

  // setting the focus on buttonAll
buttonAll.focus();

  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const imageElement = document.createElement("img");
    imageElement.src = data[i].imageUrl;
    const sectionGallery = document.querySelector(".gallery")
    sectionGallery.appendChild(imageElement);
  }
  }

  function functionObjet() {
    const sectionGallery = document.querySelector(".gallery");
    sectionGallery.innerHTML = "";
    for (let i = 0; i < filterObjet.length; i++) {
      const imageElement = document.createElement("img");
      imageElement.src = filterObjet[i].imageUrl;
      const sectionGallery = document.querySelector(".gallery")
      sectionGallery.appendChild(imageElement);
    }
    }

    function functionAppartements() {
      const sectionGallery = document.querySelector(".gallery");
      sectionGallery.innerHTML = "";
      for (let i = 0; i < filterAppartements.length; i++) {
        const imageElement = document.createElement("img");
        imageElement.src = filterAppartements[i].imageUrl;
        const sectionGallery = document.querySelector(".gallery")
        sectionGallery.appendChild(imageElement);
      }
      }
      function functionHotelsrestau() {
        const sectionGallery = document.querySelector(".gallery");
        sectionGallery.innerHTML = "";
        for (let i = 0; i < filterHotelsrestau.length; i++) {
          const imageElement = document.createElement("img");
          imageElement.src = filterHotelsrestau[i].imageUrl;
          const sectionGallery = document.querySelector(".gallery")
          sectionGallery.appendChild(imageElement);
        }
        }
  





// for (let i = 0; i < data.length; i++) {
// const imageElement = document.createElement("img");
// imageElement.src = data[i].imageUrl;
// const sectionGallery = document.querySelector(".gallery")
// sectionGallery.appendChild(imageElement);
// }



// async function generateImages() {
//   const response = await fetch('http:localhost:5678/api/works');
//   const data = await response.json();
//   console.log(data)
//   const gallery = document.getElementById('gallery');
//   for (let i = 0; i < data.length; i++) {
//     const imageElement = document.createElement('img');
//     console.log(imageElement)
//     imageElement.src = data[i].imageUrl;
//     gallery.appendChild(imageElement);
//   }
// }



