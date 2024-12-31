<script>

// Props
export default {
  props:{
    username: {
      type: String,
      required: true,
      default: "Steven"
    }
  }
}

// State Variables
const Name = ref("");
const content = ref("Click on any picture to learn more.");
const links = ref([]);
const image = ref("");
const Description = ref("");
const techstack = ref({});
const tiurl = `https://media.404founders.com/${username}/techIcons.json`;

// Fetch Tech Stack Data
// const fetchTechStack = async () => {
//   const { data, error } = await useFetch(tiurl).get().json();

//   if (error.value) {
//     console.error("Error fetching tech stack data:", error.value);
//     return;
//   }

//   const fetchedData = data.value || {};
//   Name.value = fetchedData.Name || "";
//   content.value = fetchedData.content || "Click on any picture to learn more.";
//   image.value = fetchedData.image || "";
//   Description.value = fetchedData.Description || "";
//   techstack.value = fetchedData.techstack || {};
// };

// // Change Content Method
// const changeContent = (key) => {
//   content.value = techstack.value[key]?.desc || "Description not available.";
//   links.value = techstack.value[key]?.links || [];
// };

// // Lifecycle Hook
// onMounted(() => {
//   fetchTechStack();
// });
const response  = await useFetch(tiurl)
</script>
<template>
  <div>
    <p>TechIcons</p>
    <!-- <p>{{ tiurl }}</p>
    <h1>{{ Name }}</h1>
    <p>{{ Description }}</p>
    <img :src="image" alt="Profile Image" />
    <div>
      <button
        v-for="(tech, key) in techstack"
        :key="tech.id"
        class="btn"
        type="button"
        @click="changeContent(key)"
      >
        <img class="tsbtn lang" :src="tech.bgimg" :alt="tech.title" />
      </button>
    </div>
    <div v-html="content"></div>
    <div v-for="link in links" :key="link.target">
      <a :href="link.target" target="_blank">{{ link.name }}</a>
    </div> -->
  </div>
</template>
