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
  new Product("bag", "bag.jpg"),
  new Product("banana", "banana.jpg"),
  new Product("bathroom", "bathroom.jpg"),
  new Product("boots", "boots.jpg"),
  new Product("breakfast", "breakfast.jpg"),
  new Product("bubblegum", "bubblegum.jpg"),
  new Product("chair", "chair.jpg"),
  new Product("cthulhu", "cthulhu.jpg"),
  new Product("dog-duck", "dog-duck.jpg"),
  new Product("dragon", "dragon.jpg"),
  new Product("pen", "pen.jpg"),
  new Product("pet-sweep", "pet-sweep.jpg"),
  new Product("scissors", "scissors.jpg"),
  new Product("shark", "shark.jpg"),
  new Product("sweep", "sweep.png"),
  new Product("tauntaun", "tauntaun.jpg"),
  new Product("unicorn", "unicorn.jpg"),
  new Product("water-can", "water-can.jpg"),
  new Product("wine-glass", "wine-glass.jpg"),
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
  // Create a modal container
  const modal = document.createElement("div");
  modal.className = "modal";

  // Create a modal content div
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // Create a close button for the modal
  const closeButton = document.createElement("span");
  closeButton.className = "close-button";
  closeButton.textContent = "X";
  closeButton.addEventListener("click", closeResultsModal);

  // Create a results heading
  const resultsHeading = document.createElement("h2");
  resultsHeading.textContent = "Voting Results";

  // Create a list to display results
  const resultsList = document.createElement("ul");

  // Loop through allProducts and create list items for each product
  allProducts.forEach((product) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${product.name}: ${product.votes} votes (Viewed ${product.views} times)`;
    resultsList.appendChild(listItem);
  });

  // Append elements to the modal content
  modalContent.appendChild(closeButton);
  modalContent.appendChild(resultsHeading);
  modalContent.appendChild(resultsList);

  // Append modal content to the modal container
  modal.appendChild(modalContent);

  // Append the modal to the body
  document.body.appendChild(modal);
}

// Function to close the results modal
function closeResultsModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
}

// Add event listeners
productContainer.addEventListener("click", handleProductVote);
viewResultsButton.addEventListener("click", displayResults);

// Render initial products
renderProducts();
