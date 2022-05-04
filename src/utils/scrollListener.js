import { cardInView, cardInViewNext, scrollThresh } from '../stores/pageState';

export function initScroll() {
  window.addEventListener('scroll', (e) => {
    if (window.scrollY > 200) {
      scrollThresh.set(true);
    } else {
      scrollThresh.set(false);
    }

    let ctrPt = window.innerHeight / 2;
    let cards = document.querySelectorAll('.card-outer');
    cards.forEach((d, i) => {
      let boundingRect = d.getBoundingClientRect();
      if (
        ctrPt >= boundingRect.top &&
        ctrPt < boundingRect.height + boundingRect.top
      ) {
        if (i < cards.length - 1) {
          cardInViewNext.set(cards[i + 1].id);
        }
        cardInView.set(d.id);
      }
    });
  });
}

//if within 50
