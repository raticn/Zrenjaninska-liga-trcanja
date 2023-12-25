<script>
import axios from "axios"
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data() {
        return {
            userName: "",
            pass: "",
            sidToken: "",
        }
    },
    methods: {
        ...mapActions(useLigaStore, ['adminLogin']),
        async login() {
            await this.adminLogin(this.userName, this.pass)
            if(this.isAdmin == 1) {
                this.$router.push('/admin')
            }
            else{
                alert('Username ili lozinka nisu tačni!')
                return
            }
        }
    },
    computed: {
        ...mapState(useLigaStore, ['isAdmin']),
    },
}
</script>

<template>
    <div class="login">
        <p>Username:</p>
        <input v-model="userName" class="adminLogin" type="text">
        <p>Lozinka:</p>
        <input v-model="pass" class="adminLogin" type="password">
        <button class="loginBtn" @click="login">Log in</button>
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