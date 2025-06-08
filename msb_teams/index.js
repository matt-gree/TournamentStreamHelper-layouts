LoadEverything().then(() => {
  Start = async () => {};

  Update = async (event) => {
    let data = event.data;
    let oldData = event.oldData;

      //find out if roster1 or roster2 is calling this script so it can pull the correct characters.
      const path = window.location.pathname;
      const page = path.split("/").pop(); // e.g., "rosters1.html"
      console.log(page)
      var roster_num = 1
      if (page == "roster2.html") {roster_num = 2}

      const roster_container = document.getElementById("roster-container")
      roster_container.innerHTML = "" // clear before adding characters, otherwise will add more each time rosters updated

      if ('score' in data) {

        playerData = data.score['1'].team[`${roster_num}`].player['1']

        //captain 
        if ('rio_captainIndex' in playerData) {
          character = playerData.character[`${playerData['rio_captainIndex'] + 1}`]
          
          const img_char = document.createElement("img")
          if ('name' in character && character.name !== "") { 
            img_char.src = `../../assets/rio_characterIcons/${character.name}.png`
          } else {
            img_char.src = `../../assets/rio_characterIcons/Mario.png`
          }

          const div_char = document.createElement("div")
          div_char.className = "captain-container"

          div_char.appendChild(img_char)

          roster_container.appendChild(div_char)
        }

        for (const [c, character] of Object.entries(playerData.character)) {
          if ('rio_captainIndex' in playerData) {
            if (playerData['rio_captainIndex'] + 1 == c) {continue}
          }
          
          const img_char = document.createElement("img")
          if ('name' in character && character.name !== "") { 
            img_char.src = `../../assets/rio_characterIcons/${character.name}.png`
          } else {
            img_char.src = `../../assets/rio_characterIcons/Mario.png`
          }

          const div_char = document.createElement("div")
          if (!('rio_captainIndex' in playerData) && c == 1) {
            div_char.className = "captain-container"
          } else {
            div_char.className = "character-container"
          }
          div_char.appendChild(img_char)

          roster_container.appendChild(div_char)
        }
      }
  };
});