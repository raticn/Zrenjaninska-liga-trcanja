<script>
import Nav from '../components/Nav.vue'
import axios from 'axios'

export default {
    data(){
        return{
        text:'',
        textObj:{},
        longText:{},


        }
    },
    components: {
        Nav,
    },
    methods:{
        async fetchText() {
            let lang = 'sr';
            try {
                let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/text', {
                    params: {
                        language: lang
                    }
                })
                this.text = res.data.trazeniTekst
                for (let item of this.text) {
                    this.textObj[item.tex_name] = item.tex_text
                    this.longText[item.tex_name] = item.tex_long
                }
                console.log(this.text);
            } catch (error) {
                console.log(error);
            }
        },
    },
    async mounted(){
            this.fetchText();
        },
}
</script>

<template>
    <div class="onama">
        <Nav/>
            <h1>{{this.longText.onNaslov}}</h1>
            <h2>{{this.longText.onNaslov1}}</h2>
            <section aria-label="Sekcija:O nama tekst">
                <p>{{ this.longText.onPar01 }}</p>
                <p>{{ this.longText.onPar02 }}</p>
                <p>{{ this.longText.onPar03 }}</p>
                <p>{{ this.longText.onPar04 }}</p>
                <p>{{ this.longText.onPar05 }}</p>
                <p>{{ this.longText.onPar06 }}</p>
                <p>{{ this.longText.onPar07 }}</p>
                <p>{{ this.longText.onPar08 }}</p>
                <h2>{{this.longText.onNaslov2}}</h2>
                <p>{{ this.longText.onPar09 }}</p>
                <p>{{ this.longText.onPar10 }}</p>
                <p>{{ this.longText.onPar11 }}</p>
                <p>{{ this.longText.onPar12 }}</p>
                <p>{{ this.longText.onPar13 }}</p>
                <p>{{ this.longText.onPar14 }}</p>
                <p>{{ this.longText.onPar15 }}</p>
                <p>{{ this.longText.onPar16 }}</p>
                <p>{{ this.longText.onPar17 }}</p>
                <p>{{ this.longText.onPar18 }}</p>
                <p>{{ this.longText.onPar19 }}</p>
                <p>{{ this.longText.onPar20 }}</p>
                <p>{{ this.longText.onPar21 }}</p>
                <p>{{ this.longText.onPar22 }}</p>
                <p>{{ this.longText.onPar23 }}</p>
                <p>{{ this.longText.onPar24 }}</p>
                <p>{{ this.longText.onPar25 }}</p>
                <p>{{ this.longText.onPar26 }}</p>
                <p>{{ this.longText.onPar27 }}</p>
                
            </section>
    </div>
</template>

<style>

/*----------------------------------------- O NAMA TEKST SECTION --------------------------------------*/

.onama .nav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #0b3c68;
    box-shadow: 0 0 10px #0b3c68;
}
.onama .nav li{
    color: #0b3c68;
}
.onama h1{
    margin-top: 2.5em;
    text-align: center;
    font-size: 4em;
}
.onama h2{
    font-size: 2.5em;
    font-weight: 900;
    margin: 2em;
    text-align: center;
}

.onama p{
    font-size: 1.3em;
    line-height: 1.5em;
    padding-top: .5em;    
}

/*----------------------------------------END OF O NAMA TEKST SECTION --------------------------------*/


</style>