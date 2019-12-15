<template>
    <section class="nav">
        <ul>
            <li>
                <nuxt-link to="/">Top</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/about">About</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/contact">Contact</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/random">404</nuxt-link>
            </li>
        </ul>
    </section>
</template>
<script>

export default {
  name: 'artwork',
  data () {
    return {
        current: "sphere"
    }
  },
  mounted () {
  },
  destroyed(){

  },
  methods: {
  }
};
</script>
<style lang="scss">
.nav{
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 30px;

    h1{
        // font-weight: normal;
        font-size: 20px;
        margin-bottom: 40px;
    }

    ul{
        padding: 0;
        li{
            list-style: none;
            font-size: 18px;
            letter-spacing: 0.01em;
            margin-bottom: 20px;
            
            a{
                color: #000;
                text-decoration: none;
                opacity: 0.5;
                &.nuxt-link-exact-active{
                    opacity: 1;
                }

                &:hover{
                    opacity: 1;
                }
            }

            
        }
    }
}
</style>