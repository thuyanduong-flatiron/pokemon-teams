# Pokemon Teams!

Here you're going to help us keep track of Pokemon trainers at Flatiron School and all of their Pokemon!

![Showing how the application runs from loading, adding Pokemon to a team and also releasing one](https://gfycat.com/goldendearboto)

## Deliverables
- When a user loads the page, they should see all trainers, with their current team of Pokemon.
- Whenever a user hits `Add Pokemon`, they should get a new Pokemon.
- Whenever a user hits `Release Pokemon` on a specific Pokemon team, that specific Pokemon should be released from the team.

## Set Up Instructions
- Fork this repository, then clone it down to your local computer
- Navigate to the backend folder by running ```cd pokemon-teams/pokemon-teams-backend```
- Run ```rake db:migrate``` ```rake db:seed``` ```rails s```
- Confirm the server is running on ```http://localhost:3000/```
- In a different terminal tab, navigate to the base project folder by running ```cd ..```
- Open the single page application running ```open index.html```
- Code your solution in src/index.js

## Step 1 - Get the list of Trainers and their Pokemon
When the page loads, you will need to make a request to the server to get the data about your trainers. Then, render the trainer's information onto the page.

#### API Docs
To get information about all trainers and their Pokemon, no special headers and no body are needed.

```
#=> Example Request
GET http://localhost:3000/trainers

#=> Example Response
[
  {
    "id":1,
    "name":"Ann",
    "pokemons":[
      {
        "id":140,
        "nickname":"Jacey",
        "species":"Kakuna",
        "trainer_id":1
      },
      {
        "id":141,
        "nickname":"Zachariah",
        "species":"Ditto",
        "trainer_id":1
      },
      // ...
    ]
  }
  // ...
]
```

For each trainer, a Trainer Card `<div>` should be placed within the `<main>` tags. See the example below. Each trainer cards needs to show the trainer's name as well as the name and species of each of their Pokemon. Additionally, be sure to create an 'Add Pokemon' button for each trainer and a 'Release Pokemon' button for each Pokemon.

### Suggested HTML
```
<div class="card"><p>Ann</p>
  <button>Add Pokemon</button>
  <ul>
    <li>Jacey (Kakuna) <button class="release">Release</button></li>
    <li>Zachariah (Ditto) <button class="release">Release</button></li>
  </ul>
</div>
```

## Step 2 - Adding a Pokemon (Backend)

When the 'Add Pokemon' button inside a trainer card is clicked, your job is to make a POST request to persist a new Pokemon in the backend database.

#### API Docs
When posting a new Pokemon, the server that will generate the new Pokemon at random. The client does not need to provide any information about the new Pokemon being generated. Instead, just send a string containing a JSON object as the request's body. In the JSON, make sure the trainer_id key has the value of the trainer you want to give a new Pokemon to. This will tell your newly-created Pokemon which trainer it belongs to (remember database associations?😱).

```
#=> Example Request
POST http://localhost:3000/pokemons

Required Headers:
{
  'Content-Type': 'application/json'
}

Required Body:
{
  trainer_id: 1
}

#=> Example Response
{
  "id":147,
  "nickname":"Gunnar",
  "species":"Weepinbell",
  "trainer_id":1
}
```

## Step 3 - Adding a Pokemon (FrontEnd)

Once you receive information from the server about the newly created Pokemon, it's time to render it onto the DOM. There are many ways to do this. Remember, the new Pokemon should appear inside the correct trainer card.

## Step 4 - Releasing a Pokemon (FrontEnd)

For releasing Pokemon, this app will use what is called optimistic rendering. This means the DOM will be updated before the changes are added to the database. When a user clicks the 'Release Pokemon' button, immediately update the DOM by removing that specific Pokemon.

## Step 5 - Releasing a Pokemon (BackEnd)
Next, your job is to make a DELETE request to persist the deletion of that Pokemon in the backend database. How does this differ from how we rendered with 'Add Pokemon'? When can you and when can't you use optimistic render?

#### API Docs
When making a DELETE request, the server will respond with the Pokemon that was deleted.
```
#=> Example Request
DELETE http://localhost:3000/pokemons/:pokemon_id

#=> Example Response
{
  "id":147,
  "nickname":"Gunnar",
  "species":"Weepinbell",
  "trainer_id":1
}
```

### Bonus
Only work on this part if you are done with all other deliverables. Throughout their journey, **a Pokemon trainer should only have 6 Pokemon on their team**. Assuming you have your 'Release Pokemon' button working, delete as many Pokemon as needed such that each trainer has six or less Pokemon. Then, implement a feature that prevents trainers from adding a Pokemon if they already have six (maybe use window.alert to let the user know they cannot add a Pokemon). Therefore, if they want to add another Pokemon, they must release one of their Pokemon first.

#### Once you are done, git add, commit, and push your code to your forked repository, Then slack you lead instructor and TCFs the url to your forked repository.
