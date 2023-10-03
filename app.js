// Sort out DOM Nodes
let productContainer = document.querySelector(".product-container");
let image1 = document.querySelector("#left-img");
let image2 = document.querySelector("#middle-img");
let image3 = document.querySelector("#right-img");
let viewResultsButton = document.querySelector("#view-results");

// Constructor to make Products
function Product(name, src) {
  this.name = name;
  this.src = src;
  this.views = 0;
  this.votes = 0;
}

// Function to choose a random Product
function getRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
}

// Make all Products in array
const allProducts = [
  new Product("Unspecified Droid Bag", "./img/bag.jpg"),
  new Product("Fraudulent Banana Slicer", "./img/banana.jpg"),
  new Product("iWiper", "./img/bathroom.jpg"),
  // Add more product entries as needed
];

// Function to render 3 random Products
function renderProducts() {
  let randomProduct1, randomProduct2, randomProduct3;

  // Ensure that we don't show the same product in a row
  do {
    randomProduct1 = getRandomProduct();
    randomProduct2 = getRandomProduct();
    randomProduct3 = getRandomProduct();
  } while (
    randomProduct1 === randomProduct2 ||
    randomProduct1 === randomProduct3 ||
    randomProduct2 === randomProduct3
  );

  // Change details of 3 images
  image1.src = allProducts[randomProduct1].src;
  image2.src = allProducts[randomProduct2].src;
  image3.src = allProducts[randomProduct3].src;

  image1.alt = allProducts[randomProduct1].name;
  image2.alt = allProducts[randomProduct2].name;
  image3.alt = allProducts[randomProduct3].name;

  // Increase views of selected images
  allProducts[randomProduct1].views++;
  allProducts[randomProduct2].views++;
  allProducts[randomProduct3].views++;
}

// Function to collect votes
function handleProductVote(event) {
  // Get the name of the voted product
  let votedProduct = event.target.alt;

  // Check if the click is on a valid image
  if (event.target === productContainer) {
    alert("You must vote for a product or face redundancy.");
  } else {
    renderProducts();
  }

  // Loop through allProducts
  for (let i = 0; i < allProducts.length; i++) {
    // Check if the product name in the array matches
    if (votedProduct === allProducts[i].name) {
      allProducts[i].votes++;
      break;
    }
  }

  // Check if the sum of all votes equals 25 and display results button
  const totalVotes = allProducts.reduce(
    (total, product) => total + product.votes,
    0
  );
  if (totalVotes === 25) {
    viewResultsButton.classList.remove("hidden");
  }
}

// Function to display results
function displayResults() {
  // Calculate and display results (you can use charting libraries for this)
  // Example: Display a chart with the results
}

// Add event listeners
productContainer.addEventListener("click", handleProductVote);
viewResultsButton.addEventListener("click", displayResults);

// Render initial products
renderProducts();
