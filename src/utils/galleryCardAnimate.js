export async function createClips(url, sessionData) {
  let clips = [];
  let numClips = 18;
  let clipMaxSize = 33;
  let clipMinR = 19;
  let clipInc = (clipMaxSize - clipMinR) / numClips;
  let blurMax = 10;
  let blurInc = blurMax / numClips;
  let opacityInc = 1 / numClips;

  for (let i = numClips; i > 0; i--) {
    let r = clipInc * i + clipMinR;
    let blur = blurInc * i;
    let opacity = opacityInc * (numClips - i);
    clips.push({
      class: 'clip',
      r: r,
      ctrx: sessionData[0].xPct,
      ctry: sessionData[0].yPct,
      blur: blur,
      opacity: opacity,
      src: url,
    });
  }
  return clips;
}

export function moveClips(domClips, centerx, centery) {
  domClips.forEach((d) => {
    let currClipPath = d.style['clip-path'];
    let split = currClipPath.split('at ');
    let prefix = split[0];
    let newCtr = `at ${centerx}% ${centery}%)`;
    d.style['clip-path'] = prefix + newCtr;
  });
}
