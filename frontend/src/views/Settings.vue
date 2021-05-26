<template>
<div>
    <div class="list">
      <ul>
        <li class="list-item" v-for="stream in streams" :key="stream._id">
          <p>{{ stream.tags }}</p>
        </li>
      </ul>
    </div>
    <button @click="deleteMe">Shit they're on to mee</button>
</div>
    
</template>

<script>
import axios from "axios";
export default {
  name: "Settings",
  async created() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("auth")}`;
    const res = await axios.get("http://localhost:5000/api/flow");
    this.streams = res.data;
    console.log(res.data);
  },
  data() {
    return {
      userID: null,
      streams: [],
    };
  },
  methods:{
      deleteMe(){
        return axios
        .delete("/api/user", {
          headers: {
            "Content-type": "application/json",
          },
        })
        .then(() => {
          sessionStorage.removeItem("auth");
          this.$router.push({ name: "Login" });
        });
    },
  },
}
</script>

<style scoped>

</style>