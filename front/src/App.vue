<template>
  <div>
    <button @click="login">Login</button>
    <p>Username: {{ username }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import sdk from "./sdk";

export default defineComponent({
  name: "App",
  setup() {
    const username = ref("");

    const login = () => {
      sdk
        .login({
          email: "luc@varoqui.org",
          password: "azerty",
        })
        .then((data) => {
          if (data.login) {
            username.value = data.login.username;
          }
        });
    };

    return {
      username,
      login,
    };
  },
});
</script>

<style></style>
