import { readable, writable } from 'svelte/store';
let artworkData = {
  yusuf: {
    key: 'yusuf',
    artist: 'Behzād',
    title: 'Yusuf and Zulaikha',
    url: './assets/img/yusuf.jpg',
    sessionData: {},
    width: 1046,
    height: 1535,
    origLink: 'https://en.wikipedia.org/wiki/Yusuf_and_Zulaikha',
  },
  hockney: {
    key: 'hockney',
    artist: 'David Hockney',
    title: 'Ordinary Picture',
    url: './assets/img/hockney.png',
    sessionData: {},
    width: 1691,
    height: 1704,
    origLink: 'https://www.si.edu/object/ordinary-picture:hmsg_66.2472',
  },
  mehretuUntitled: {
    artist: 'Julie Mehretu',
    title: 'Local Calm',
    url: './assets/img/mehretuCropped.png',
    sessionData: {},
    key: 'mehretuUntitled',
    width: 1745,
    height: 1228,
    origLink: 'https://americanart.si.edu/artwork/local-calm-76328',
  },
  magi: {
    artist: 'Hieronymus Bosch',
    title: 'The Adoration of the Magi',
    url: './assets/img/magi.jpg',
    sessionData: {},
    key: 'magi',
    width: 3101,
    height: 3875,
    origLink: 'https://www.metmuseum.org/art/collection/search/435724',
  },
  utagawa: {
    key: 'utagawa',
    artist: 'Utagawa Toyokuni',
    title: 'Fair Travellers Fording the River Oi',
    url: './assets/img/utagawa.jpg',
    sessionData: {},
    width: 4000,
    height: 1919,
    origLink:
      'https://www.metmuseum.org/art/collection/search/36679?ft=ukiyo-e&amp;offset=40&amp;rpp=40&amp;pos=60',
  },

  agnes: {
    key: 'agnes',
    artist: 'Agnes Denes',
    title: 'Wheatfield',
    url: './assets/img/agnes.png',
    sessionData: {},
    width: 3331,
    height: 1665,
    origLink: 'http://www.agnesdenesstudio.com/works7.html',
  },
  lewitt: {
    key: 'lewitt',
    artist: 'Sol Lewitt',
    title: 'Lines from Points to Points',
    url: './assets/img/lewitt.png',
    sessionData: {},
    width: 1722,
    height: 1704,
    origLink:
      'https://www.si.edu/object/lines-points-points-portfolio-location-lines:saam_1990.60.2',
  },

  madonna: {
    key: 'madonna',
    artist: 'Carlo Crivelli',
    title: 'Madonna and Child',
    url: './assets/img/madonna.jpg',
    sessionData: {},
    width: 2726,
    height: 4000,
    origLink: 'https://www.metmuseum.org/art/collection/search/436052',
  },

  sakura: {
    key: 'sakura',
    artist: 'Kiyoshi Awazu',
    title: 'A New Spirit',
    url: './assets/img/kiyoshi.jpg',
    sessionData: {},
    width: 736,
    height: 1024,
    origLink:
      'https://www.cooperhewitt.org/2016/04/01/sensing-a-new-spirit-of-japan/',
  },
};

//http://www.agnesdenesstudio.com/works7.html

export let artworkMetadata = writable(artworkData);
export let loadedWorksKeys = writable(null);
export let loadedWorksArray = writable(null);

//removed

// kahlo: {
//   key: 'kahlo',
//   artist: 'Magda Pach',
//   title: 'Frida Kahlo',
//   url: './assets/img/kahlo.jpg',
//   sessionData: {},
//   width: 3212,
//   height: 4000,
//   origLink: 'https://www.si.edu/object/frida-kahlo:npg_NPG.2015.136',
// },

// albers: {
//   key: 'albers',
//   artist: 'Josef Albers',
//   title: 'Homage to the Square',
//   url: './assets/img/albers.png',
//   sessionData: {},
//   width: 1645,
//   height: 1705,
//   origLink:
//     'https://www.si.edu/object/homage-square-white-line-red:saam_1976.108.7',
// },
// riley: {
//   key: 'riley',
//   artist: 'Bridget Riley',
//   title: 'Untitled',
//   url: './assets/img/riley.png',
//   sessionData: {},
//   width: 1080,
//   height: 1315,
//   dimWidthToHt: 1080 / 1315,
//   origLink: 'https://www.si.edu/object/bridget-riley:chndm_1976-25-5',
// },

// ayeti: {
//   key: 'ayeti',
//   artist: 'Fetih Ayeti',
//   title: 'untitled',
//   url: './assets/img/ayeti.jpg',
//   sessionData: {},
//   width: 734,
//   height: 1024,
//   dimWidthToHt: 734 / 1024,
//   origLink: 'https://collection.cooperhewitt.org/objects/18394565/',
// },
// rothko: {
//   key: 'rothko',
//   artist: 'Mark Rothko',
//   title: 'Record Number 24',
//   url: './assets/img/rothko.png',
//   sessionData: {},
//   dimWidthToHt: 0.65,
//   width: 1021,
//   height: 1571,
// },
// nevelson: {
//   key: 'nevelson',
//   artist: 'Louise Nevelson',
//   title: 'Untitled (Self-Portrait)',
//   url: './assets/img/nevelson.jpg',
//   sessionData: {},
//   dimWidthToHt: 0.756,
//   width: 378,
//   height: 500,
//   origLink:
//     'https://www.si.edu/object/untitled-self-portrait:npg_NPG.2002.307',
// },

// dewittHardy: {
//   key: 'dewittHardy',
//   artist: 'DeWitt Hardy',
//   title: 'Nude',
//   url: './assets/img/dewittHardy.png',
//   sessionData: {},
//   width: 1194,
//   height: 1697,
//   dimWidthToHt: 1194 / 1697,
//   origLink: 'https://www.si.edu/object/nude:hmsg_86.2482',
// },
