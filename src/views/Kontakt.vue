<script>
import Nav from '../components/Nav.vue'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default {
    data() {
        return {
            form: {
                name: '',
                email: '',
                telefon: '',
                message: '',
            },
            isNameFocused: false,
            isEmailFocused: false,
            isTelefonFocused: false,
        }
    },
    components: {
        Nav,
        FontAwesomeIcon,
    },
    methods: {
        ...mapActions(useLigaStore, ['fetchText']),
        onFocus(field) {
            this[field] = true;
            },
        onBlur(field, formField) {
            if (this.form[formField] === '') {
                this[field] = false;
            }
        },
        focusInput(inputRef) {
        this.$refs[inputRef].focus();
        },
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    mounted() {
        this.fetchText()
    },
    created() {
        library.add(faInstagram, faEnvelope)
    }
}
</script>

<template>
    <div class="kontakt">
        <Nav />
        <h2>{{ this.textObj.koNaslov }}</h2>
        <div class="clan1Kontakt">
            <p><FontAwesomeIcon class="popupIcon" icon="fa-solid fa-envelope"></FontAwesomeIcon> zrligatrcanja@gmail.com</p>
            <a href="https://www.instagram.com/nemanja_djuric/" class="instagram" target="_blank"><FontAwesomeIcon class="popupIcon" icon="fa-brands fa-instagram"></FontAwesomeIcon>instagram.com/nemanja_djuric</a>
        </div>
        <p class="prijavaHeading">{{ this.textObj.koPrijava }}</p>
        <section aria-label="Sekcija: Kontakt forma">
            <form id="form" action="https://formsubmit.co/@gmail.com" method="POST">
                <div class="formInfo">
                    <div class="formField" :class="{ focused: isNameFocused || form.name !== '' }">
                        <label for="Ime" @click="focusInput('imeInput')">{{ this.textObj.tabelaImePrez }}</label>
                        <input ref="imeInput" name="Ime" type="text" v-model="form.name" required @focus="onFocus('isNameFocused')" @blur="onBlur('isNameFocused', 'name')"/>
                    </div>
                    <div class="formField" :class="{ focused: isEmailFocused || form.email !== '' }">
                        <label for="Email" @click="focusInput('emailInput')">Email</label>
                        <input ref="emailInput" name="Email" type="email" v-model="form.email" required @focus="onFocus('isEmailFocused')" @blur="onBlur('isEmailFocused', 'email')"/>
                    </div>
                    <div class="formField" :class="{ focused: isTelefonFocused || form.telefon !== '' }">
                        <label for="Telefon" @click="focusInput('telefonInput')">{{ this.textObj.koTel }}</label>
                        <input ref="telefonInput" name="Telefon" type="text" v-model="form.telefon" required @focus="onFocus('isTelefonFocused')" @blur="onBlur('isTelefonFocused', 'telefon')"/>
                    </div>
                </div>
                <button class="formBtn" type="submit">{{ this.textObj.koPos }}</button>
            </form>
        </section>
    </div>
</template>

<style>
.kontakt{
    background-color: #1f3242;
    color: #fff;
    min-height: 100vh;
}
.kontakt .nav{
    position: fixed;
    background-color: #fff;
    border-bottom: 2px solid #0b3c68;
    box-shadow: 0 0 10px #0b3c68;
}
.kontakt .nav li{
    color: #0b3c68;
}
.kontakt h2{
    font-size: 3.5em;
    font-weight: 900;
    margin: 3em 0 0;
    text-align: center;
}
.prijavaHeading{
    font-size: 3.5em;
    font-weight: 900;
    text-align: center;
    margin: 0;
}
#form{
    width: 30vw;
    margin: 0 auto;
}
.formField{
    position: relative;
    margin: 2.5em 0;
    height: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.formField label{
    display: block;
    font-size: 1.3em;
    padding: 0 0 .5em .8em;
    align-self: flex-start;
    font-weight: 700;
}
.formField.focused label {
    color: #ff0c46;
}
input{
    padding-left: 10px;
    height: 50px;
    width: 95%;
    border-radius: 20px;
    background-color: transparent;
    font-weight: 700;
    font-size: 1.3em;
    border: 3px solid #ff0c46;
    color: #fff;
}
input:focus{
    outline: 2px solid #ff0c46;
    border: none;
    box-shadow: 0 0 10px #ff0c46;
}
.formBtn{
    border: none;
    width: 100%;
    background-color: #1f3242;
    color: #fff;
    font-weight: 700;
    font-size: 1.5em;
    padding: 10px 0;
    border-radius: 10px;
    cursor: pointer;
}
</style>