
<style>
.space {
  padding: 1%
}
</style>
<template>
<div class="row g-0">
    <div class="col-md-4">
    <div id="carouselExample" class="carousel slide ">
  <div class="carousel-inner">
    <div v-for="(picture, index) in prof.pictures" :key='picture.id' class="carousel-item" :class="{active : picture.isActive}">
      <img :src="picture.src" class="img-thumbnail d-block w-100" :alt="picture.altText">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span> 
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>
</div>
  <div class="col-md-8 space">
    <h1>{{ prof.Name }}</h1>
    <ul>
      <li v-for="(linkObj, index) in prof.userlinks" :key="index">
        <a :href="Object.values(linkObj)[0]" target="_blank" rel="noopener noreferrer">
          {{ Object.keys(linkObj)[0] }}
        </a>
      </li>
    </ul>
    <p>{{ prof.Description }}</p>
  </div>
</div>
</template>
<script>
export default {
  props:{
    prof: {
      type: Object,
      required: false
    },
    uname: {
      type: String,
      required: true,
      default: "Steven"
    }
  }
}
</script>
