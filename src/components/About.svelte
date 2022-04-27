<script>
  import AboutAccordion from '../components/AboutAccordion.svelte';
  import Modal from '../components/Modal.svelte';
  import { modalState } from '../stores/pageState';
</script>

<Modal>
  <div class="inner">
    <div class="cont-header">
      <h1>About the Project</h1>
      <div
        class="clickable btn close"
        on:click={() => {
          modalState.set(null);
        }}
      >
        <span class="material-icons-round"> close </span>
      </div>
    </div>
    <div class="cont-body">
      <AboutAccordion
        questionText={'How did you come up with the idea to visualize gazes?'}
        chipText="Process"
      >
        <p>
          I don't have a background in art history, and often mind myself lost
          in a museum, wondering why certain pieces were selected, or what
          others might see in a work that I don't connect to. This project was
          created with the idea of using visualization to better understand
          subjective visual perception.
        </p>
        <p>
          More generally though, my work as both a practioner and educator
          focuses on using technology to make us feel more human. I'm interested
          in using data and technology to create visceral experiences.
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'How did you come up with the visual form used to represent gazes?'}
        chipText="Process"
      >
        <p>
          Each gaze session is recorded as a series of points. So I needed to
          translate these points to a visualization of some sort.
        </p>
        <p>
          I first experimented with more abstract visualization of these points
          - like points or heatmaps overlayed onto the original image. The
          result was unsatisfying. In seeing quantitative data, I found that
          viewers would simply draw clear-cut conclusions about a given gaze.
        </p>
        <div class="img-holder">
          <img src="./assets/img/process/pointmaphires.png" />
        </div>
        <p>
          The goal of this project is to have the viewer empathize and imagine
          how someone else might look at a given artwork. In order to so, I
          needed to tie the gaze to the original artwork, and make it feel like
          a cohesive work that can be examined. I experimented with a number of
          different forms to create a more visceral experience, and found that
          the 'blur map' worked best.
        </p>
        <div class="img-holder">
          <img src="./assets/img/process/blurmap.png" />
        </div>
      </AboutAccordion>

      <AboutAccordion
        questionText={'Can I add my artwork to the gallery?'}
        chipText="Curation"
      >
        <p>
          Yes! Email me at omar.nema@newschool.edu if you're interested to host
          your own work here :)
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'Why did you select these particular images for the gallery?'}
        chipText="Curation"
      >
        <p>
          I sought to include a variety of different artworks - abstract,
          portrait, graphic, etc - in the gallery.
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'How accurate are the gaze representations in your gallery?'}
        chipText="Technical"
      >
        <p>
          It varies. Gazes can submitted to the gallery with 75% accuracy or
          greater. The accuracy rate here means that
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'How does the whole eye tracking thing work?'}
        chipText="Technical"
      >
        <p>
          Here's how the main visualization works: first, using webgazer.js, I
          record
        </p>
        <p />
      </AboutAccordion>

      <AboutAccordion
        questionText={'Tell me more about the methods you used to create these blurry visuals'}
        chipText="Technical"
      >
        <p>
          Here's how the main visualization works: first, using webgazer.js, I
          record
        </p>
        <p />
      </AboutAccordion>

      <AboutAccordion
        questionText={'What sort of technology and tools did you use to make this?'}
        chipText="Technical"
      >
        <p>
          This project was built using open-source web libraries. I used Svelte
          as framework, d3.js for generating visualizations, Firebase to store
          data in real-time, and webgazer.js for recording webcam viewing
          sessions. I also used Observable to process data and explore
          visualizations, and Figma to design in the interface.
        </p>
      </AboutAccordion>
    </div>
  </div>
</Modal>

<style>
  .inner {
    max-width: 1000px;
    margin: auto;
    padding: 20px 50px;
    font-size: 18px;
  }
  .img-holder {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    margin: auto;
  }
  img {
    margin: auto;
    box-shadow: 0 1px 2px 0.5px rgb(0 0 0 / 10%);
    width: 80%;
    max-width: 500px;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .cont-body {
    margin-top: 20px;
  }
</style>
