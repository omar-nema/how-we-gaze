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
        questionText={'How did you come up with this idea?'}
        chipText="Process"
      >
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
        </p>
      </AboutAccordion>

      <AboutAccordion
        questionText={'Can I add my artwork to the gallery?'}
        chipText="Curation"
      >
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt.
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
</style>
