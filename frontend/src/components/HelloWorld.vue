<template>
  <div>
    <button @click="handleClickGetAuthCode">get authCode</button>
    <div class="left">
      <ul v-if="credentials">
        <li v-for="credential of credentials" :key="credential.id">
          {{ credential.id  }} {{ credential.access_token }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { inject } from "vue";
import gql from 'graphql-tag'

  

export default {
  apollo: {
    // Simple query that will update the 'hello' vue property
    credentials: gql`query {
      credentials {
        id
        access_token
      }
    }`,
  },

  name: "HelloWorld",

  props: {
    msg: String,
  },

  data(){
    return {
      user: '',
      credentials: 'abc'
    }
  },

  methods: {
    async handleClickGetAuthCode(){
      try {
        const authCode = await this.$gAuth.getAuthCode();
        console.log("authCode", authCode);
      } catch(error) {
        //on fail do something
        console.error(error);
        return null;
      }
    },

    handleClickDisconnect() {
      window.location.href = `https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=${window.location.href}`;
    },
  },
  setup(props) {
    const Vue3GoogleOauth = inject("Vue3GoogleOauth");

    return {
      Vue3GoogleOauth,
    };
  },
};
</script>

<style>
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-right: 1em;
};
</style>