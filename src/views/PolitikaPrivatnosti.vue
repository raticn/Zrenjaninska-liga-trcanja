<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { RouterLink, RouterView } from 'vue-router';
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data() {
        return{
            menu: false,
        }
    },
    components: {
        FontAwesomeIcon
    },
    methods: {
        ...mapActions(useLigaStore, ['fetchText']),
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    mounted() {
        window.scrollTo(0, 0)
        this.fetchText()
    },
    created() {
        library.add(faBars)
    }
}
</script>

<template>
    <div class="politikaPrivatnosti">
        <RouterLink aria-label="Link do stranice: Politika privatnosti" to="/kontakt" class="back">&lt; {{ this.longText.foKontakt }}</RouterLink>
        <h2>{{ this.textObj.ppNaslov1 }}</h2>
        <p>{{ this.textObj.ppP1 }}</p>
        <p>{{ this.longText.ppP2 }}</p>
        <h3>{{ this.textObj.ppNaslov2 }}</h3>
        <p>{{ this.textObj.ppP3 }}</p>
        <ul class="ppList">
            <li>{{ this.textObj.tabelaRekIme }} {{ this.textObj.and }} {{ this.textObj.tabelaRekPrezime }}</li>
            <li>E-mail</li>
            <li>{{ this.textObj.koTel }}</li>
        </ul>
        <h3>{{ this.textObj.ppNaslov3 }}</h3>
        <p>{{ this.longText.ppP4 }}</p>
        <h3>{{ this.textObj.ppNaslov4 }}</h3>
        <p>{{ this.textObj.ppP5 }}</p>
        <h3>{{ this.textObj.ppNaslov5 }}</h3>
        <p>{{ this.longText.ppP6 }}</p>
        <h3>{{ this.textObj.ppNaslov6 }}</h3>
        <p>{{ this.textObj.ppP7 }} <span class="bold">zrligatrcanja@gmail.com</span></p>
        <h3>{{ this.textObj.ppNaslov7 }}</h3>
        <p>{{ this.longText.ppP8 }}</p>
        <p>{{ this.textObj.ppP9 }}</p>
        <p class="bold">{{ this.textObj.ppP10 }}</p>
    </div>
</template>

<style>
.politikaPrivatnosti{
    min-height: 100vh;
    overflow-x: hidden;
}
.back{
    color: #000;
    font-size: 2em;
    position: absolute;
    top: .5em;
    left: .5em;
    font-weight: 900;
}
.politikaPrivatnosti p, .ppList{
    width: 90%;
    margin: 0 auto;
    font-size: 1.5em;
}
.ppList{
    padding-left: 2em;
    overflow: auto;
}
.politikaPrivatnosti h3, .politikaPrivatnosti h2{
    width: 90%;
    margin: 1em auto;
    text-align: center;
}
.politikaPrivatnosti h3{
    font-size: 2em;
}
.politikaPrivatnosti h2{
    padding-top: .5em;
}
.last{
    padding-bottom: 3em;
}

@media (max-width: 600px) {
    .politikaPrivatnosti h2{
        padding-top: 3em;
    }
    .politikaPrivatnosti p, .ppList{
        font-size: 1.2em;
    }
}
</style>