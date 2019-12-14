<template>
  <div>
    <Artwork />
    <nuxt />
    <Nav />
  </div>
</template>

<script>
import Artwork from "~/components/Artwork";
import Nav from "~/components/Nav";

export default {
  components: {
    Artwork,
    Nav
  }
}
</script>

<style>
</style>
