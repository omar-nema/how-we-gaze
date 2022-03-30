import * as d3 from 'd3';

import { get } from 'svelte/store';
import { screenWidth } from '../stores/pageState';

export async function contourMapBlur(data, containerAll, containerSvg, url) {
  let bbox = d3.select(containerAll).node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;

  console.log(get(screenWidth));
  let svg = d3.select(containerSvg);
  let margin = 30;

  let xPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, width - margin]);
  let yPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, height - margin]);

  let bandwidth, thresholds;
  if (get(screenWidth) <= 800) {
    bandwidth = 30;
    thresholds = 15;
  } else {
    bandwidth = 70;
    thresholds = 30;
  }

  let contours = d3
    .contourDensity()
    .x((d) => xPos(d.xPct))
    .y((d) => yPos(d.yPct))
    .size([width, height])
    .bandwidth(bandwidth)
    .thresholds(thresholds)(data);

  console.log('conts ', contours.length);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);

  let blurScale = d3
    .scaleLog()
    .domain([
      maxCoords,
      maxCoords * 0.75,
      ,
      maxCoords / 2,
      maxCoords / 3,
      maxCoords / 4,
      maxCoords / 10,
      minCoords,
    ])
    .range([0, 0.5, 0.75, 1, 1.5, 2, 10]);

  blurScale = d3
    .scaleLinear()
    .domain([maxCoords, maxCoords * 0.75, minCoords])
    .range([0, 0.25, 5]);

  // blurScale = d3.scaleLinear().domain([maxCoords, minCoords]).range([0, 5]);

  //the update isn't happening properly

  // let blurScale = d3.scaleLinear().domain([maxCoords, minCoords]).range([0, 0]);

  let opacityScale = d3
    .scaleLinear()
    .domain([maxCoords, minCoords])
    .range([1, 1]);

  let clipPathG = svg
    .selectAll('.clipPathGroup')
    .data(contours, (d) => d.coordinates[0])
    .join((enter) => {
      let clipPath = enter.append('g').attr('class', 'clipPathGroup');

      clipPath
        .append('clipPath')
        .attr('id', (d, i) => 'path-' + i)
        .append('path')
        .attr('stroke-linejoin', 'round')
        // .attr('fill', (d) => fillScale(d.value))
        .attr('d', d3.geoPath());

      clipPath
        .append('image')
        .attr('clip-path', (d, i) => `url(#path-${i})`)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('xlink:href', url)
        //.style('filter', (d) => `opacity(${opacityScale(d.value)}`);
        .style(
          'filter',
          (d) =>
            `opacity(${opacityScale(d.value)}) blur(${blurScale(d.value)}px)`
        );
    });
}
