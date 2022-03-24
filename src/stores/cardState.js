import { readable, writable } from 'svelte/store';

export let currFrame = writable(false);

export let sliderMax = writable(false);
export let infoTipIndex = writable(false);

export let viewMode = writable('slice');
export let playStatus = writable('pause');
