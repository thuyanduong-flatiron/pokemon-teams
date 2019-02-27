//solution goes here
document.addEventListener("DOMContentLoaded", init)

function init() {
  getAllTrainers()
}

function getTrainerContainer() {
  return document.querySelector('main')
}

function getAllTrainers() {
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(allTrainersData => {
    allTrainersData.forEach(renderTrainer)
  })
}

function renderTrainer(trainerObj) {
  let trainerContainer = getTrainerContainer()

  let div = document.createElement('div')
  trainerContainer.appendChild(div)
  div.classList.add('card')

  let p = document.createElement('p')
  div.appendChild(p)
  p.innerText = trainerObj["name"]

  let addPokemonButton = document.createElement('button')
  div.appendChild(addPokemonButton)
  addPokemonButton.innerText = "Add Pokemon"
  addPokemonButton.dataset.id = trainerObj.id
  addPokemonButton.addEventListener("click", handleClickOfAddPokemonButton)

  let ul = document.createElement('ul')
  ul.id = 'trainer-' + trainerObj.id
  div.appendChild(ul)

  trainerObj["pokemons"].forEach(renderPokemon)
}

function renderPokemon(pokemonObj) {
  let li = document.createElement('li')
  li.id = 'pokemon-' + pokemonObj.id
  document.querySelector(`#trainer-${pokemonObj.trainer_id}`).appendChild(li)
  li.innerText = `${pokemonObj["nickname"]} (${pokemonObj["species"]})`

  let releaseButton = document.createElement('button')
  releaseButton.classList.add("release")
  releaseButton.innerText = "Release"
  li.appendChild(releaseButton)
  releaseButton.dataset.id = pokemonObj.id
  releaseButton.addEventListener('click', handleClickOfReleaseButton)
}

function handleClickOfAddPokemonButton(event) {
  let trainerId = event.currentTarget.dataset.id
  postNewPokemon(trainerId)
}

function postNewPokemon(trainerId) {
  if (document.querySelector(`#trainer-${trainerId}`).children.length < 6) {
    let postData = {
      trainer_id: trainerId
    }
    fetch("http://localhost:3000/pokemons", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(pokemon => renderPokemon(pokemon))
  } else {
    alert("Your team is full! If you want to add a new Pokemon, you must release an old one.")
  }
}

function handleClickOfReleaseButton(event) {
  let pokemonId = event.currentTarget.dataset.id
  document.querySelector(`#pokemon-${pokemonId}`).remove()
  releasePokemon(pokemonId)
}

function releasePokemon(pokemonId) {
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE"
  })
}
