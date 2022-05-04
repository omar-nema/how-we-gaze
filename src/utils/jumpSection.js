import * as animateScroll from 'svelte-scrollto';

animateScroll.setGlobalOptions({
  offset: -5,
});

export default (section) => {
  let el = document.querySelector('#' + section);
  animateScroll.scrollTo({ element: el });
};
