<template>
  <div class="home">
    <navi ></navi>
    <router-view/>
  </div>
</template>

<script>
import Navi from '@/components/nav';



export default {
  components: {
    Navi
  }
}
</script>
