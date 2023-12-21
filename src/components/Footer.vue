<script>
import { RouterLink, RouterView } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default{
    components: {
        FontAwesomeIcon,
    },
    created() {
        library.add(faLocationDot, faPhone, faEnvelope)
    }
}
</script>

<template>
    <div class="footer">
        <div class="footer_wrapper">
            <div class="footer_info">
                <p><FontAwesomeIcon class="footerIcons" icon="fa-solid fa-phone"></FontAwesomeIcon>+381 </p>
                <p><FontAwesomeIcon class="footerIcons" icon="fa-solid fa-envelope"></FontAwesomeIcon></p>
            </div>
            <div class="footer_links">
                <p>Mapa sajta</p>
                <ul class="quicklinks">
                    <RouterLink to="/"> <li>Početna</li> </RouterLink>
                    <RouterLink to="/liga"> <li>Liga</li> </RouterLink>
                    <RouterLink to="/bazenskaOprema"><li>Rekordi</li></RouterLink> 
                    <RouterLink to="/hemijskaSredstva"><li>O nama</li></RouterLink>
                    <RouterLink to="/kontakt"> <li>Kontakt</li> </RouterLink>
                    <RouterLink to="/adminLogin"><li>Login</li></RouterLink>
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
    background-color:rgb(63, 63, 63);
    background: linear-gradient(to right, rgb(74, 144, 226), rgb(23, 45, 89));
}
.footer_wrapper{
    color:#fff;
    font-family: Comfortaa;
    display: flex;
    justify-content: flex-start ;
    align-items: center;
    
}
.footer_info{
    font-size: 1.2em;
    color:#fff;
    width: 40%;
    margin: 2em;
    flex-basis: 33%;
    font-weight: bold;
}
.footer_info p{
    margin: 1em 0;
    line-height: 1.5em;
}
.footer_logo{
    width: 7em;
}
.footer_links{
    color:#fff;
    display: flex;
    flex-basis: 60%;
    flex-direction: column;
    flex-wrap:wrap;
    justify-content: space-between;
}
.footer_links p{
    font-weight: bold;
    font-size: 1.2em;
    margin: 1em 0;
}
.quicklinks{
    display: flex;
    height: 15em;
    flex-direction: column;
    flex-wrap:wrap;
    justify-content: flex-start;
    
}
.quicklinks li{
    margin: 1em 0;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
}
.copyright {
    font-size: 2em;
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