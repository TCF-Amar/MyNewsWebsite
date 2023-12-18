const home = document.getElementById("home-option");
const cricket = document.getElementById("cricket-option");
const politics = document.getElementById("politics-option");
const firstOption = document.getElementById("option-box1");
const secondOption = document.getElementById("option-box2");
const thirdOption = document.getElementById("option-box3");

home.addEventListener("click", () => {
  firstOption.classList.add("active");
  secondOption.classList.remove("active");
  thirdOption.classList.remove("active");
  home.classList.add("active-option");
  cricket.classList.remove("active-option");
  politics.classList.remove("active-option");
});

cricket.addEventListener("click", () => {
  firstOption.classList.remove("active");
  secondOption.classList.add("active");
  thirdOption.classList.remove("active");
  home.classList.remove("active-option");
  cricket.classList.add("active-option");
  politics.classList.remove("active-option");
});

politics.addEventListener("click", () => {
  firstOption.classList.remove("active");
  secondOption.classList.remove("active");
  thirdOption.classList.add("active");
  home.classList.remove("active-option");
  cricket.classList.remove("active-option");
  politics.classList.add("active-option");
});

var value;
const inputField = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");

const API_URL = "https://newsapi.org/v2/everything?q=";
const API_Key = "4f089fe17a9443d79f2a63d90d8d4e49";

window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
  const res = await fetch(`${API_URL}${query}&apiKey=${API_Key}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.querySelector(".card-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  cardsContainer.innerHTML = "";
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const titleElement = cardClone.querySelector(".card-title");
  const sourceElement = cardClone.querySelector(".card-source");
  const descriptionElement = cardClone.querySelector(".card-description");
  const imageElement = cardClone.querySelector("#news-img");

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  titleElement.textContent = article.title;
  sourceElement.textContent = `${article.source.name} • ${date}`;
  imageElement.src = article.urlToImage;
  imageElement.alt = "News Image";
  descriptionElement.textContent = article.description;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

function onNavItemClick(id) {
  fetchNews(id);
}
searchButton.addEventListener("click", () => {
  value = inputField.value;
  fetchNews(value);
});

inputField.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    value = inputField.value;
    fetchNews(value);
  }
});
