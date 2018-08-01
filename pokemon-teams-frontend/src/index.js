const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
  fetchTrainers()
})

function fetchTrainers(){
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(trainer => renderTrainerCard(trainer))
  })
}

function renderTrainerCard(trainerInfo){
  let card = document.createElement('div')
  let button = document.createElement('button')
  button.dataset.trainerId = trainerInfo.id
  button.innerText = 'Add Pokemon'
  button.addEventListener('click', addPokemon)
  card.innerHTML = `<p>${trainerInfo.name}</p>`
  card.appendChild(button)
  card.appendChild(document.createElement('ul'))
  card.classList.add('card')
  card.id = `trainer-${trainerInfo.id}`
  document.querySelector('main').appendChild(card)
  trainerInfo.pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function addPokemon(event){
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: event.target.dataset.trainerId
    })
  })
  .then(response => response.json())
  .then(jsonData => {
    renderPokemon(jsonData)
  })
}


function renderPokemon(pokemon){
  let ul = document.querySelector(`#trainer-${pokemon.trainer_id}`).querySelector('ul')
  let li = document.createElement('li')
  li.innerHTML = `${pokemon.nickname} (${pokemon.species})`
  li.id = `pokemon-${pokemon.id}`
  let button = document.createElement('button')
  button.classList.add('release')
  button.dataset.pokemonId = pokemon.id
  button.dataset.trainerId = pokemon.trainer_id
  button.innerText = 'Release'
  button.addEventListener('click', releasePokemon)
  li.appendChild(button)
  ul.appendChild(li)
}

function releasePokemon(e){
  let pokemonId = e.target.dataset.pokemonId
  let trainerId = e.target.dataset.trainerId
  fetch(`${POKEMONS_URL}/${pokemonId}`,{
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(jsonData => {
    let trainerUl = document.querySelector(`#trainer-${trainerId}`).querySelector('ul')
    trainerUl.removeChild(document.querySelector(`#pokemon-${pokemonId}`))
  })
}
