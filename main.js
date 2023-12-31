const accessKey = "_lnQ1W62uVl0QmV4pjbGSZEbEy9tjhRHN5UNbmTKqek";
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("searchField");
const searchResultsEl = document.getElementById("search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let page = 1;

formEl.addEventListener("submit", async (event) => {
  event.preventDefault();
  page = 1;
  await searchImages();
});

showMoreButtonEl.addEventListener("click", async () => {
  await searchImages();
});

async function searchImages() {
  const inputData = searchInputEl.value.trim();
  if (inputData) {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }

    // for looping through each image result and creating html elements to display them
    data.results.forEach((result) => {
      const imageArea = document.createElement("div");
      imageArea.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      const imageLink = document.createElement("a");
      imageLink.href = result.links.html;
      imageLink.target = "_blank"; //to open link (when clicked) in new tab.
      imageLink.textContent = result.alt_description;

      //img and link added as child elements insinde imageArea, and imageArea then appended (a child element) inside searchResultsEl to disply.
      imageArea.appendChild(image);
      imageArea.appendChild(imageLink);
      searchResultsEl.appendChild(imageArea);
    });

    page++;
    showMoreButtonEl.style.display = "block";
  }
}
