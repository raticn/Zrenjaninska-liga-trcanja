import { defineStore } from 'pinia'
import axios from 'axios'

export const useLigaStore = defineStore('liga', {
    state: () => {
    return{
        lang: "",
        textObj: [],
        longText: [],
        text: [],
    }
    },
    actions: {
        async fetchText() {
            if(localStorage.getItem('lang') == '') {
                localStorage.setItem('lang') = 'sr'
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
    }
})
