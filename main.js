const searchInput = document.getElementById('searchField');
const searchBtn = document.getElementById('searchBtn');
const resultContainer = document.getElementById('imageGallery');
const formEl = document.querySelector('form');
const showMore = document.getElementById("show-more-button");

let inputData = ''
let page = 1;

const accessKey = '_lnQ1W62uVl0QmV4pjbGSZEbEy9tjhRHN5UNbmTKqek';

async function searchImages(){
  inputData = searchInput.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}=${inputData}&client_id=${accessKey}`

  const response = await fetch(url)
  const data = await response.json()

  const results = data.results

  if(page===1){
    resultContainer.innerHTML = ""
  }
  results.map((result) =>{
    const imgArea = document.createElement('div')
    imgArea.classList.add("search-result")
    const image = document.createElement('img')
    image.src = result.urls.small
    image.alt = result.alt_description
    const imageLink = document.createElement('a')
    imageLink.href = result.links.html
    imageLink.target = "_blank"
    imageLink.textContent = result.alt_description

    imgArea.appendChild(image)
    imgArea.appendChild(imageLink)
    imgArea.appendChild(imageWrapper)  
  })

  page++
  if(page > 1){
    showMore.style.display = "block"
  }
}

formEl.addEventListener("submit", (event) =>{
  event.preventDefault()
  page = 1
  searchImages()
})

showMore.addEventListener("click", () => {
  searchImages()
})

