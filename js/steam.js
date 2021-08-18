const section = document.getElementById("game-data");
const button = document.getElementById("check-steam");
button.addEventListener("click", () => {
  while (section.firstChild) {
    section.removeChild(section.lastChild);
  }
  checkSteamGames();
});

//wrapper function
async function checkSteamGames() {
  const spinner = document.createElement("div");
  spinner.classList.add("spinner-border", "text-light", "mx-auto", "mt-5");
  section.append(spinner);
  let tmp_array = await getRecentlyPlayedGames();
  //create row to place cards in
  const row = document.createElement("div");
  row.classList.add(
    "row",
    "row-cols-md-3",
    "row-cols-sm-2",
    "row-cols-1",
    "m-2",
    "p-2"
  );
  //create cards containing game data
  tmp_array.forEach((g) => {
    let column = createCard(g);
    row.append(column);
  });
  //remove spinner and add cards to section
  section.removeChild(spinner);
  section.append(row);
}

//create game card
function createCard(game) {
  //create column
  const col = document.createElement("div");
  col.classList.add("col");
  //create card and its children
  const card = document.createElement("div");
  card.classList.add("card", "h-100", "bg-secondary");
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = game.banner_url;
  cardImage.alt = `${game.name} banner image.`;
  const cardBody = document.createElement("div");
  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("card-title", "p-2", "text-light");
  cardTitle.innerText = `${game.name}`;
  const cardText = document.createElement("p");
  cardText.classList.add("card-text", "p-2", "text-light");
  cardText.innerText = `Last 2 weeks: ${game.two_week} hours\nTotal Playtime: ${game.total} hours`;
  //append card children to card
  cardBody.append(cardTitle, cardText);
  card.append(cardImage, cardBody);
  col.append(card);
  return col;
}

//api call
async function getRecentlyPlayedGames() {
  let data = await fetch("https://server.phan5.repl.co/getGames");
  let jsonData = await data.json();
  return parseGames(jsonData.response.games);
}

//pass in array of games and send each element to data parser
function parseGames(games) {
  let array = [];
  games.forEach((g) => {
    let gameData = parseData(g);
    array.push(gameData);
  });
  return array;
}

//parse the game data and return as object
function parseData(game) {
  const appId = game.appid;
  const name = game.name;
  const twoWeekPlaytime = toHours(game.playtime_2weeks);
  const totalPlaytime = toHours(game.playtime_forever);
  const banner = `https://steamcdn-a.akamaihd.net/steam/apps/${appId}/header.jpg`;

  //create a return object
  let obj = {
    appid: appId,
    name: name,
    two_week: twoWeekPlaytime,
    total: totalPlaytime,
    banner_url: banner,
  };
  return obj;
}

//Convert Time to hours with one decimal point
function toHours(time) {
  let hours = time / 60;
  return hours.toFixed(1);
}
