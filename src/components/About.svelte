<script>
  import AboutAccordion from '../components/AboutAccordion.svelte';
  import Modal from '../components/Modal.svelte';
  import { modalState } from '../stores/pageState';
</script>

<Modal>
  <div class="inner">
    <div class="cont-header">
      <h1>Methods & Process</h1>
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
          Broadly, my work as both a practioner and educator focuses on using
          data and technology to augment communication and perception.
        </p>
        <p>
          For this project in particular, I was tasked with visualizing data
          from the Smithsonian Museum Open Access Collection (as part of my
          coursework at Parsons). Browsing through the collection, I found that
          the context accompanying a piece of artwork was not always enough to
          help me understand and connect with it. Viewing art is a visceral
          experience - it is difficult to put into words. I wondered - could I
          create a tool that enables me to see how others are looking at
          artwork? A series of explorations related to this anchor question led
          me to develop the concept of using eye-tracking to visualize gazes.
        </p>
        <p />
      </AboutAccordion>

      <AboutAccordion
        questionText={'How did you come up with the visual form used to represent gazes?'}
        chipText="Process"
      >
        <p>
          Each gaze session is recorded as a series of points, so a series of x
          and y coordinates was my starting point for the visualization.
        </p>
        <p>
          I first experimented with abstract visualizations of these points -
          like dots, heatmaps or contours overlayed onto the original image. The
          result was unsatisfying. In seeing quantitative data, I found that
          viewers would draw clear-cut conclusions about a given gaze, rather
          than imagine how someone else would study it.
        </p>
        <div class="img-holder">
          <img
            style="width: 45%"
            src="./assets/img/process/pointmaphiresNocont.png"
          />
          <img style="width: 45%" src="./assets/img/process/contourmap.png" />
        </div>
        <p>
          The goal of this project is to have the viewer empathize and imagine
          how someone else might look at a given artwork. In order to so, I
          needed to tie the gaze to the original artwork, and make it feel like
          a cohesive work that can be examined. I experimented with a number of
          different forms that blend in with the original artwork. The
          'aggregate blur' was most effective to me - it retained the integrity
          of the artwork, but also clearly delineated the viewer's gaze.
        </p>
        <div class="img-holder">
          <img src="./assets/img/process/blurmap.png" />
        </div>
      </AboutAccordion>

      <AboutAccordion
        questionText={'How did you create the blurry visuals for this project?'}
        chipText="Process"
      >
        <p>
          In order to create the 'aggregate' blur visual used to represent each
          gaze, I mapped each gaze to a set of density contours, and translated
          the contours to a blurred out portion of the image. Let's break this
          down step by step. Each gaze recording session is recorded as a series
          of points, so that was my starting point.
        </p>

        <div class="img-holder small" style="flex-direction: column">
          <img style="width: 100%" src="./assets/img/process/visExplain1.svg" />
        </div>

        <p>
          Using the marching squares algorithm (built into <a
            href="https://github.com/d3/d3-contour">d3 contour</a
          >), all recorded points are grouped into contours. Note that points on
          the bottom right are not dense enough to be grouped into a contour (so
          anomalies are accounted for).
        </p>

        <div class="img-holder small" style="flex-direction: column">
          <img style="width: 100%" src="./assets/img/process/visExplain2.svg" />
        </div>

        <p>
          Next, I overlay the corresponding piece of the image onto the contour
          using SVG clip-path. I then add a blur effect based on the number of
          points in the contour: contours with higher point density have lower
          point density, and vice-versa. Note that the images in the gallery
          appear 'smoother' because there are more contours and points to draw
          from (typically 4000 points, and 30 contours).
        </p>

        <div class="img-holder small" style="flex-direction: column">
          <img style="width: 100%" src="./assets/img/process/visExplain3.svg" />
        </div>
      </AboutAccordion>

      <AboutAccordion
        questionText={'Can I add artwork to the gallery?'}
        chipText="Curation"
      >
        <p>
          I would love to take suggestions on what to include in the gallery!
          Please fill out this <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSd8ALICBzpHRIgFI8BHoQekxhPbEPxabOzPr3H_DS8y_VT56Q/viewform"
            >form</a
          > if you're interested in suggesting a work!
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'Why did you select these particular images for the gallery?'}
        chipText="Curation"
      >
        <p>
          I sought to include a variety of artwork - both in style and time
          period - in the gallery. Because I wanted to include high resolution
          digital images, the works included are fairly modern (1400s or so).
          Shoutout to my friend Rayyan Mikati for helping me select the works in
          this gallery!
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'How accurate are the gaze representations in your gallery?'}
        chipText="Technical"
      >
        <p>
          Gazes can submitted to the gallery only after a webcam is calibrated
          with an accuracy rate of 75% or higher. Generally, accuracy for
          submitted gazes ranges from 75% to 85%. This means that the margin of
          error ranges from 12.5% to 7.5% of the container width used to
          calibrate the eye tracker (pictured below).
        </p>
        <p>
          Given the substantial margin of error, a single point is not very
          accurate. However, each 20 second viewing session includes roughly
          4000 points. A combination all of these points will shows clear
          trends.
        </p>
        <p>
          Screen size, lighting, and webcam quality affect accuracy. Generally,
          eye-tracking experiments in psychology research are done using
          accurate, high-cost eye-tracking devices that resemble bulky goggles.
          I prioritized accessibility rather than accuracy for this project, and
          thus decided used the webcam.
        </p>
        <div class="img-holder">
          <img style="width: 100%" src="./assets/img/process/accuracy.png" />
        </div>
      </AboutAccordion>

      <AboutAccordion
        questionText={'How does the whole eye tracking thing work?'}
        chipText="Technical"
      >
        <p>
          I used an existing open-source library - webgazer.js - for
          eye-tracking. Webgazer.js uses the webcam to detect the location of a
          viewer's eyes as coordinates on a screen. In order to use incorporate
          webgazer into my project, I built out a calibration 'wizard' (shown
          below).
        </p>

        <div class="img-holder small">
          <img
            style="width: 100%"
            src="./assets/img/process/calibrateProcess.png"
            class="noStyle"
          />
        </div>
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
          visualizations, and Figma to design the interface.
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
    margin: auto;
    padding: 13px 0;
  }
  .img-holder.small img {
    max-width: 500px;
  }
  img {
    margin: auto;
    box-shadow: 0 1px 2px 0.5px rgb(0 0 0 / 10%);
    max-width: 95%;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  img.noStyle {
    box-shadow: none;
    border: none;
    border-radius: 0px;
  }
  .cont-body {
    margin-top: 20px;
  }
</style>
