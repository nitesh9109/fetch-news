const API_KEY = "0cd854caf5754bcf9e5303709218e70f";
let url = `https://gnews.io/api/v4/search?`;

// api handeling
let container = document.querySelector(".container");

async function fetchNews(searchTerm = "india") {
  showLoadingIndicator();
  let res = await fetch(`${url}q=${searchTerm}&lang=en&apikey=${API_KEY}`);
  let data = await res.json();

  container.innerHTML = "";
  bindData(data.articles);
  hideLoadingIndicator()
}

// binding data

function bindData(articles) {
  articles.forEach((article) => {
    let articleBox = articleElement(article);
    container.appendChild(articleBox);
  });
}

function articleElement(article) {
  let imgEle = document.createElement("img");
  let titleEle = document.createElement("h1");
  let sourceEle = document.createElement("h5");
  let summaryEle = document.createElement("p");
  let contentContainer = document.createElement("div");
  let articleEle = document.createElement("div");

  articleEle.classList.add("article");
  contentContainer.classList.add("content");
  titleEle.classList.add("title");
  sourceEle.classList.add("source");
  summaryEle.classList.add("summary");

  imgEle.src = article["image"];
  titleEle.innerHTML = article["title"];
  sourceEle.innerHTML = `${article["source"]["name"]} -${getIndianTime(
    article["publishedAt"]
  )}`;
  summaryEle.innerHTML = article["description"];

  contentContainer.append(titleEle, sourceEle, summaryEle);

  articleEle.append(imgEle, contentContainer);

  titleEle.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });

  return articleEle;
}

function getIndianTime(time) {
  let date = new Date(time);

  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleString("en-US", options);
}

let inputEle = document.getElementById("inputEle");

inputEle.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    fetchNews(inputEle.value);
  }
});

let loader = document.getElementById("loader");

function showLoadingIndicator() {
  loader.style.display = 'block';
}

function hideLoadingIndicator() {
  loader.style.display = 'none';

}

fetchNews();
