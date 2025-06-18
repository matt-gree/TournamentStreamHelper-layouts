LoadEverything().then(() => {
  Start = async () => {};

  Update = async (event) => {
    let data = event.data;

    const path = window.location.pathname;
    const page = path.split("/").pop();
    
    var teamNum = 1
    if (page == "team2logo.html") {teamNum = 2}
    
    const logoContainer = document.getElementById("team-logo-container");
    logoContainer.innerHTML = "";  // Clear previous logo

    if ('score' in data) {
      const playerData = data.score['1'].team[`${teamNum}`].player['1'];
      if (playerData && playerData.msb_team) {
        const teamIcon = document.createElement("img");
        teamIcon.src = `../../assets/rio_teamLogos/${playerData.msb_team}.png`;
        teamIcon.className = "team-logo";
        logoContainer.appendChild(teamIcon);
      }
    }
  };
});