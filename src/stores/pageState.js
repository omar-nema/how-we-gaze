import { readable, writable } from 'svelte/store';

export let pageState = writable('gallery');
export let modalState = writable('intro');
export let selectedImage = writable(null);

//to get the right size of images
export let screenWidth = writable(null);
export let screenHeight = writable(null);
export let screenModality = writable('desktop');

//for scrolling and naviating between cards
export let cardInView = writable(null);
export let cardInViewNext = writable(null);
export let jumpCard = writable(null);
export let scrollThresh = writable(false);

export let tooltipText = writable(null);
export let tooltipX = writable(null);
export let tooltipY = writable(null);
export let tooltipShow = writable(false);
export let infoTipIndex = writable(-1); //for the explanatory pop-ups in gallery card

export let offlineMode = writable(false);
export let offlineData = writable({});

export let activeAccordionIndex = writable(null);

export let imagesLoaded = writable({});
