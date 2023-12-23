<script>
import { RouterLink, RouterView } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationDot, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { mapActions, mapState } from 'pinia'
import { useLigaStore } from '../store/ligaStore'

export default{
    components: {
        FontAwesomeIcon,
    },
    methods:{
        ...mapActions(useLigaStore, ['fetchText']),
    },
    computed: {
        ...mapState(useLigaStore, ['textObj', 'longText']),
    },
    async mounted(){
        this.fetchText();
    },
    created() {
        library.add(faLocationDot, faEnvelope, faInstagram, faFacebook)
    },
}
</script>

<template>
    <div class="footer">
        <div class="footer_wrapper">
            <div class="footer_info">
            <p><a href="mailto:ligatrcanjazr@gmail.com"><FontAwesomeIcon class="footerIcons" icon="fa-solid fa-envelope"></FontAwesomeIcon>zrligatrcanja@gmail.com</a></p>
            <p><a aria-label="Pogledajte nasu Instagram stranicu" href="https://www.instagram.com/zrenjaninska_ligatrcanja/" target="_blank"><FontAwesomeIcon class="footerIcons" icon="fa-brands fa-instagram"></FontAwesomeIcon>instagram.com/zrenjaninska_ligatrcanja</a></p>
            <p><a aria-label="Pogledajte nasu Facebook stranicu" href="https://www.facebook.com/" target="_blank"><FontAwesomeIcon class="footerIcons" icon="fa-brands fa-facebook"></FontAwesomeIcon>facebook.com/</a></p>
            </div>
            <div class="footer_links">
                <ul class="quicklinks">
                    <RouterLink to="/"> <li>{{ this.longText.foPocetna }}</li> </RouterLink>
                    <RouterLink to="/liga"> <li>{{ this.longText.foLiga }}</li> </RouterLink>
                    <RouterLink to="/rekordi"><li>{{ this.longText.foRekordi }}</li></RouterLink> 
                    <RouterLink to="/onama"><li>{{ this.longText.foOnama }}</li></RouterLink>
                    <RouterLink to="/kontakt"> <li>{{ this.longText.foKontakt }}</li> </RouterLink>
                    <RouterLink to="/adminLogin"><li>{{ this.longText.foLogin }}</li></RouterLink>
                </ul>
            </div>
        </div>
        <div class="copyright">
                &copy;2023  <a href="https://space-coders.com" aria-label="Link do web sajta: Space Coders">space-coders.com</a>
            </div>
    </div>
</template>

<style>
.footer{
    width: 100vw;
    background: linear-gradient(to right, #1f3242, #ff0c46 );
}
.footer_wrapper{
    color:#fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.footer_info{
    font-size: 1.8em;
    color:#fff;
    width: 40%;
    font-weight: 700;
}
.footer_info p{
    margin: 1em 0;
    line-height: 1.5em;
}
.footer_info a{
    display: flex;
    align-items: center;
    text-decoration: none;
}
.footer_logo{
    width: 7em;
}
.footer_links{
    margin: 1em;
    font-size: 1.5em;
    color:#fff;
    display: flex;
    width: 40%;
    flex-direction: column;
    flex-wrap:wrap;
    justify-content: space-between;
}
.footer_links p{
    font-weight: bold;
    font-size: 1.8em;
    margin: 1em 0;
}
.quicklinks{
    display: flex;
    height: 15em;
    flex-direction: column;
    flex-wrap:wrap;
    justify-content: center;
    
}
.quicklinks li{
    margin: 1em 0;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
}
.socials{
    margin: 1em 0;
    flex-basis: 33%;
    font-size: 1.8em;
    text-align: center;
}
.socialsLinks{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.socials p{
    margin: 1em 0;
}
.copyright {
    margin-bottom: 1em;
    font-size: 1.8em;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.copyright a{
    padding-left: .5em;
}
.footerIcons{
    margin-right: 0.5em;
    font-size: 2em;
    cursor: pointer;
}
.footer a:link{
    color:#fff;
}
.footer a:visited{
    color: antiquewhite;
}
.footer a:hover, a:active{
    color: #fff;
}

@media (max-width: 1350px) {
    .footer_info, .footer_links{
        font-size: 1.3em;
    }
    .quicklinks{
        height: 10em;
    }
}

@media (max-width: 1150px) {
    .footer_wrapper{
        flex-direction: column;
    }
    .footer_info{
        width: 90%;
        margin: 2em auto;
    }
    .footer_links{
        width: 90%;
        margin: 0 auto;
    }
}

@media (max-width: 749px) {
    .quicklinks li{
        font-size: 0.8em;
    }
}

@media (max-width: 480px) {
    .footer_info, .footer_links p{
        font-size: 1em;
    }
    .quicklinks{
        height: 25em;
    }
}
</style>