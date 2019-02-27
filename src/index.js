//solution goes here
let trainerContainer

document.addEventListener("DOMContentLoaded", init)

function init() {
  trainerContainer = document.querySelector('main')
  getAllTrainers()
}

function getAllTrainers() {
  fetch('http://localhost:3000/trainers')
  .then(res => res.json())
  .then(allTrainersData => {
    allTrainersData.forEach(renderTrainer)
  })
}

function renderTrainer(trainerObj) {
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
  addPokemonButton.addEventListener("click", function() {handleClickOfAddPokemonButton(event, trainerObj)})

  let ul = document.createElement('ul')
  ul.id = 'trainer-' + trainerObj.id
  div.appendChild(ul)

  trainerObj["pokemons"].forEach(function (pokemon) {
    let li = document.createElement("li")
    li.id = 'pokemon-' + pokemon.id
    ul.appendChild(li)
    let releaseButton = document.createElement('button')
    releaseButton.classList.add("release")
    releaseButton.innerText = "Release"
    li.innerText = `${pokemon["nickname"]} (${pokemon["species"]})`
    li.appendChild(releaseButton)
    releaseButton.dataset.id = pokemon.id
    releaseButton.addEventListener('click', handleClickOfReleaseButton)
  })
}

function handleClickOfAddPokemonButton(event, trainerObj) {
  let trainerId = event.currentTarget.dataset.id
  if (trainerObj["pokemons"].length < 6) {
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
      .then(pokemonObj => {
        let li = document.createElement('li')
        li.id = 'pokemon-' + pokemonObj.id
        document.querySelector(`#trainer-${trainerId}`).appendChild(li)
        let releaseButton = document.createElement('button')
        releaseButton.classList.add("release")
        releaseButton.innerText = "Release"
        li.innerText = `${pokemonObj["nickname"]} (${pokemonObj["species"]})`
        li.appendChild(releaseButton)
        releaseButton.dataset.id = pokemonObj.id
        releaseButton.addEventListener('click', handleClickOfReleaseButton)
        trainerContainer.innerHTML = ''
        getAllTrainers()
      })
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
  }).then(res => res.json())
    .then(a => {
      trainerContainer.innerHTML = ''
      getAllTrainers()
    })
}
