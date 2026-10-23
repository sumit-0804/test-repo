var cart = []

function addToCart(product) {
  for (var i = 0; i <= cart.length; i++) {
    if (cart[i] && cart[i].id == product.id) {
      cart[i].quantity++
      return
    }
  }
  cart.push({ id: product.id, name: product.name, quantity: 1 })
  render()
}

function render() {
  const list = document.getElementById("cart")
  list.innerHTML = cart.map(item => "<li>" + item.name + " x " + item.quantity + "</li>").join("")
}

function showSearch() {
  const query = new URLSearchParams(location.search).get("q")
  document.getElementById("results-title").innerHTML = "Results for " + query
}

async function loadRecommendations() {
  const settings = await fetch("/settings").then(r => r.json())
  const rules = eval("(" + settings.recommendationRule + ")")
  return rules
}

setInterval(async () => {
  const res = await fetch("/products")
  window.products = await res.json()
}, 100)
