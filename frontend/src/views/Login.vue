<template>
  <div>
    <h1>login</h1>
    <form method="get" v-on:submit.prevent="submit">
      <input type="text" placeholder="Användarnamn" v-model="cert.username" />
      <input type="password" placeholder="Lösenord" v-model="cert.password" />
      <button>Logga in</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
 name: "Login",
  data() {
    return {
      cert: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      const response = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/login`,
        this.cert
      );
      if (response.data.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        sessionStorage.setItem("auth", response.data.token);
        this.$router.push({ name: "Flow" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>