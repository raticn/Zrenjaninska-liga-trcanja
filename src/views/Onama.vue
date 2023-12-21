<script>
import Nav from '../components/Nav.vue'
import axios from 'axios'

export default {
    data(){
        return{
        text:'',
        textObj:{},
        longText:{},
        lang: {},
        }
    },
    components: {
        Nav,
    },
    methods:{
        async fetchText() {
            this.lang = localStorage.getItem('lang');
            try {
                let res = await axios.get('http://238p123.mars2.mars-hosting.com/API/text', {
                    params: {
                        language: this.lang
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
        <section aria-label="Sekcija:O nama tekst">
            <h2>{{this.longText.onNaslov1}}</h2>
            <div class="ciljevi">
                <p>{{ this.longText.onPar01 }}</p>
                <p>{{ this.longText.onPar02 }}</p>
                <p>{{ this.longText.onPar03 }}</p>
                <p>{{ this.longText.onPar04 }}</p>
                <p>{{ this.longText.onPar05 }}</p>
                <p>{{ this.longText.onPar06 }}</p>
                <p>{{ this.longText.onPar07 }}</p>
                <p class="bold">{{ this.longText.onPar08 }}</p>
            </div>
        </section>
        <section aria-label="Sekcija: Pravila igre">
            <h2>{{this.longText.onNaslov2}}</h2>
            <div class="pravila">
                <p>{{ this.longText.onPar09 }}</p>
                <p>{{ this.longText.onPar10 }}</p>
                <p>{{ this.longText.onPar11 }}</p>
                <p>{{ this.longText.onPar12 }}</p>
                <p>{{ this.longText.onPar13 }}</p>
                <p>{{ this.longText.onPar14 }}</p>
                <p>{{ this.longText.onPar15 }}</p>
                <p>{{ this.longText.onPar16 }}</p>
                <p>{{ this.longText.onPar17 }}</p>
                <p class="underline">{{ this.longText.onPar18 }}</p>
                <h3>{{ this.textObj.pravilaNaslov }}</h3>
                <div class="zabranjenoWrapper">
                    <div class="zabranjeno">
                        <img src="../assets/kalendar.svg" alt="Kalendar - slika">
                        <p>{{ this.longText.onPar19 }}</p>
                    </div>
                    <div class="zabranjeno">
                        <img src="../assets/tredmill.svg" alt="Traka za trčanje - slika">
                        <p>{{ this.longText.onPar20 }}</p>
                    </div>
                    <div class="zabranjeno">
                        <img src="../assets/stopwatch.svg" alt="Štoperica - slika">
                        <p>{{ this.longText.onPar21 }}</p>
                    </div>
                </div>
                <p>{{ this.longText.onPar22 }}</p>
                <p>{{ this.longText.onPar23 }}</p>
                <p>{{ this.longText.onPar24 }}</p>
                <p>{{ this.longText.onPar25 }}</p>
                <p>{{ this.longText.onPar26 }}</p>
                <p>{{ this.longText.onPar27 }}</p>
            </div>
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
    margin: 1em 0;
    text-align: center;
}

.onama p{
    font-size: 1.3em;
    line-height: 1.5em;
    padding-top: .5em;    
}
.ciljevi, .pravila{
    width: 90%;
    margin: 0 auto;
}
.pravila{
    padding-bottom: 2em;
}
.zabranjenoWrapper{
    display: flex;
    justify-content: space-between;
    align-items: start;
    width: 80%;
    margin: 0 auto 1em;
} 
h3{
    font-size: 2em;
    color: #ff0c46;
    text-align: center;
    margin: 1em 0;
}
.zabranjeno{
    width: 20%;
    text-align: center;
}
.underline{
    text-decoration: underline;
}
/*----------------------------------------END OF O NAMA TEKST SECTION --------------------------------*/


</style>