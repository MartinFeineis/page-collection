<template>
  <div v-for="job in jobs" :key="job.id">
    <p>
      <button
        class="btn btn-primary"
        type="button"
        data-bs-toggle="collapse"
        :data-bs-target="'#' + job.selectStr"
        aria-expanded="false"
        :aria-controls="job.Company"
      >
        {{ job.Company }}
      </button>
    </p>
    <div class="collapse" :id="job.selectStr">
      <div v-for="position in job.Positions" :key="position.id" class="jobtext">
        <div class="card card-body">
          <h5>{{ position.Title }}</h5>
          <p><small>Started: {{ position.StartDate }} Finished: {{ position.EndDate }}</small></p>
          <p>{{ position.Responsibilities }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    jobs: {
      type: Array,
      required: false
    }
  }
}
</script>
<style>
.jobtext {
  padding: 0.15em 1em;
  white-space: pre-wrap; 
  word-wrap: break-word;
  font-family: inherit;
}
</style>