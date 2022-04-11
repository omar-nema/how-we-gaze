import { readable, writable } from 'svelte/store';

export let calibrationState = writable(null);
export let gazerRecordingTraining = writable([]);
export let gazerRecordingArt = writable([]);
export let gazeReactions = writable([]);

//just the library loaded
export let gazerReady = writable(false);
//gazer initialized but video feed not set
export let gazerInitDone = writable(false);
//video feed fully loaded
export let gazerInitVideoDone = writable(false);

export let stateIndex = writable(0);

export let calibrationPct = writable(null);
export let calibrationCutoff = writable(70);
export let loadingInd = writable(true);
export let sessionID = writable(null);
export let sessionName = writable(null);

//set to 0 for normal, 1 to prevent writing to db
export let testMode = readable(0);
