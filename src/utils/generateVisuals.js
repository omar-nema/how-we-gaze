import * as d3 from 'd3';

import { get } from 'svelte/store';
import { screenWidth } from '../stores/pageState';

//not actually used - displays points
export async function pointVis(data, containerAll, containerSvg, url) {
  let bbox = d3.select(containerAll).node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;
  let margin = 30;

  let xPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, width - margin]);
  let yPos = d3
    .scaleLinear()
    .domain([0, 100])
    .range([margin, height - margin]);

  let dataSel = d3
    .select(containerSvg)
    .append('g')
    .selectAll('.point')
    .data(data, (d) => d.xPct + d.sessionID);

  console.log(data);

  dataSel
    .join('circle')
    .attr('cx', (d) => xPos(d.xPct))
    .attr('cy', (d) => yPos(d.yPct))
    .attr('r', 2)
    .attr('fill', 'black')
    .attr('class', 'point')
    .style('opacity', '0.5')
    .style('filter', 'blur(1px)');
}

export async function contourMapBlur(data, containerAll, containerSvg, url) {
  let bbox = d3.select(containerAll).node().getBoundingClientRect();
  let width = bbox.width;
  let height = 0.705 * width;
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
  // bandwidth = parseInt(Math.min(width, height) * 0.07);
  // thresholds = parseInt(bandwidth * 1.5);

  bandwidth = parseInt(Math.min(width, height) * 0.15);
  thresholds = parseInt(bandwidth * 0.9);

  let contours = d3
    .contourDensity()
    .x((d) => xPos(d.xPct))
    .y((d) => yPos(d.yPct))
    .size([width, height])
    .bandwidth(bandwidth)
    .thresholds(thresholds)(data);

  let minCoords = d3.min(contours, (d) => d.value);
  let maxCoords = d3.max(contours, (d) => d.value);

  let blurScale = d3
    .scaleLinear()
    .domain([maxCoords, maxCoords * 0.5, minCoords])
    .range([0, 1, 4]);

  let opacityScale = d3
    .scaleLinear()
    .domain([maxCoords, minCoords])
    .range([1, 1]);

  // d3.select(containerSvg).selectAll('.clipPathGroup').remove();

  const svgId = d3.select(containerSvg).attr('id');
  let dataSel = d3
    .select(containerSvg)
    .selectAll('.clipPathGroup')
    .data(contours, (d) => {
      return d.coordinates[0];
    });

  dataSel.join(
    (enter) => {
      let clipPath = enter.append('g').attr('class', 'clipPathGroup');
      clipPath
        .append('clipPath')
        .attr('id', (d, i) => `path-${svgId}-${i}`)
        .append('path')
        .attr('stroke-linejoin', 'round')
        // .attr('fill', (d) => fillScale(d.value))
        .attr('d', d3.geoPath());
      clipPath
        .append('image')
        .attr('clip-path', (d, i) => `url(#path-${svgId}-${i})`)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('xlink:href', url)
        //.style('filter', (d) => `opacity(${opacityScale(d.value)}`);
        .style(
          'filter',
          (d) =>
            `opacity(${opacityScale(d.value)}) blur(${blurScale(d.value)}px)`
        );
    },
    (update) => {
      let clipG = update.selectAll('.clipPathGroup');
      clipG.select('clipPath').attr('d', d3.geoPath());
      clipG
        .select('image')
        .style(
          'filter',
          (d) =>
            `opacity(${opacityScale(d.value)}) blur(${blurScale(d.value)}px)`
        );
    },
    (exit) => {
      exit.remove();
    }
  );

  return;
}
