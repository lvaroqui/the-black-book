<template>
  <div>
    <button @click="login">Login</button>
    <p v-if="user">Username: {{ user.username }}</p>
    <p v-else>Not connected</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import sdk from "./sdk";
import { useAuthStore } from "./store/auth";

export default defineComponent({
  name: "App",
  setup() {
    const authStore = useAuthStore();

    const login = () => {
      sdk
        .login({
          email: "luc@varoqui.org",
          password: "azerty",
        })
        .then((data) => {
          if (data.login) {
            authStore.user = data.login;
          }
        });
    };

    return {
      user: computed(() => authStore.user),
      login,
    };
  },
});
</script>

<style></style>
