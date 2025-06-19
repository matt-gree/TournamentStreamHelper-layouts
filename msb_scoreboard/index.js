function readText(path) {
  return fetch(path).then(r => r.text()).catch(() => "");
}

async function updateScoreboard() {
  let base = "../../out/score/1/";

  let homePlayer = await readText(`${base}team/1/player/1/rioName.txt`);
  let awayPlayer = await readText(`${base}team/2/player/1/rioName.txt`);

  let homeScore = await readText(`${base}team/1/score.txt`);
  let awayScore = await readText(`${base}team/2/score.txt`);

  let inning = await readText(`${base}inning.txt`);
  let halfInning = await readText(`${base}half_inning.txt`);

  let homeMsb = await readText(`${base}team/1/player/1/msb_team.txt`);
  let awayMsb = await readText(`${base}team/2/player/1/msb_team.txt`);

  let runner1 = (await readText(`${base}cbRioRunnerOn1.txt`)).trim().toLowerCase() === "true";
  let runner2 = (await readText(`${base}cbRioRunnerOn2.txt`)).trim().toLowerCase() === "true";
  let runner3 = (await readText(`${base}cbRioRunnerOn3.txt`)).trim().toLowerCase() === "true";

  let batter = (await readText(`${base}batter.txt`));
  let pitcher = (await readText(`${base}pitcher.txt`));

  let outs = parseInt((await readText(`${base}outs.txt`)).trim()) || 0;

  // Update DOM
  document.getElementById("home-player").innerText = homePlayer;
  document.getElementById("away-player").innerText = awayPlayer;

  document.getElementById("home-score").innerText = homeScore;
  document.getElementById("away-score").innerText = awayScore;

  document.getElementById("inning").innerText = `${halfInning} ${inning}`;

  document.getElementById("home-logo").src = `../../assets/rio_teamLogos/${homeMsb}.png`;
  document.getElementById("away-logo").src = `../../assets/rio_teamLogos/${awayMsb}.png`;

  document.getElementById("bases").src = `../../assets/rio_scoreboard/R${(runner1 ? "1" : "")}${(runner2 ? "2" : "")}${(runner3 ? "3" : "")}.png`;

  document.getElementById("outs").innerText = outs === 0 ? "○○○" : outs === 1 ? "●○○" : "●●○";

  let offImg = "../../assets/rio_scoreboard/baseball.png";
  let defImg = "../../assets/rio_scoreboard/Baseball_bat.png";

  if (halfInning.toLowerCase().includes("top")) {
    document.getElementById("left-offdef").src = defImg;
    document.getElementById("right-offdef").src = offImg;
    document.getElementById("left-character").src = `../../assets/rio_characterIcons/${batter}.png`;
    document.getElementById("right-character").src = `../../assets/rio_characterIcons/${pitcher}.png`;
  } else {
    document.getElementById("left-offdef").src = offImg;
    document.getElementById("right-offdef").src = defImg;
    document.getElementById("left-character").src = `../../assets/rio_characterIcons/${pitcher}.png`;
    document.getElementById("right-character").src = `../../assets/rio_characterIcons/${batter}.png`;
  }
}

// Update every second
setInterval(updateScoreboard, 1000);