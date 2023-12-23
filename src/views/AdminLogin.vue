<script>
import axios from "axios"

export default {
    data() {
        return {
            userName: "",
            pass: "",
            sidToken: "",
        }
    },
    methods: {
        async adminLogin() {
            try {
                let login = await axios.get('http://238p123.mars2.mars-hosting.com/API/login', {
                params: {
                    username: this.userName,
                    password: this.pass
                }
                })
                this.sidToken = login.data.sid
                document.cookie = `sid=${this.sid};expires=1200000;`
                this.$router.push('/admin')
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>

<template>
    <div class="login">
        <p>Username:</p>
        <input v-model="userName" class="adminLogin" type="text">
        <p>Lozinka:</p>
        <input v-model="pass" class="adminLogin" type="password">
        <button class="loginBtn" @click="adminLogin">Log in</button>
    </div>
    </template>
    
    <style>
    .login{
        display: flex;
        flex-direction: column;
        width: 40%;
        margin: 10% auto 0;
    }
    .login p {
        font-size: 1.3em;
        font-family: Quicksand;
    }
    .adminLogin{
        font-size: 2em;
        font-family: Quicksand;
    }
    .loginBtn{
        width: 5em;
        border: 2px solid #000;
        background-color: transparent;
        padding: 10px;
        font-size: 1.4em;
        margin: 1em auto;
        cursor: pointer;
    }
    .login input{
        color: #000;
        border: 2px solid #000;
        margin-bottom: 1em;
    }
    
    @media (max-width: 800px) {
        .adminLogin{
            font-size: 1.3em;
        }
    }
    </style>