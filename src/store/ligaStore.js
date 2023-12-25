import { defineStore } from 'pinia'
import axios from 'axios'

export const useLigaStore = defineStore('liga', {
    state: () => {
    return{
        lang: "",
        textObj: [],
        longText: [],
        text: [],
        isAdmin:0,
        sidToken: "",
    }
    },
    actions: {
        async fetchText() {
            if(localStorage.getItem('lang') == '' || localStorage.getItem('lang') == null) {
                localStorage.setItem('lang', 'sr')
            }
            this.lang = localStorage.getItem('lang');
            try {
                let res = await axios.get('https://238p123.mars2.mars-hosting.com/API/text', {
                    params: {
                        language: this.lang
                    }
                })
                this.text = res.data.trazeniTekst
                for (let item of this.text) {
                    this.textObj[item.tex_name] = item.tex_text
                    this.longText[item.tex_name] = item.tex_long
                }
            } catch (error) {
                console.log(error);
            }
        },
        async adminLogin(user, pass) {
            try {
                let login = await axios.get('https://238p123.mars2.mars-hosting.com/API/login', {
                params: {
                    username: user,
                    password: pass
                }
                })
                this.sidToken = login.data.sid
                document.cookie = `sid=${this.sid};expires=1200000;`
                this.isAdmin = login.data.sessionUser.isAdmin
                this.$router.push('/admin')
            } catch (error) {
                console.log(error);
            }
        }
    }
})
