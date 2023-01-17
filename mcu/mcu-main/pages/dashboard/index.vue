<template>
  <div>
      <dashboard-container />
      <div>
        <footer-all />
      </div>
  </div>
</template>

<script>
import DashboardContainer from '../../components/dashboard/DashboardContainer.vue'
import FooterAll from '../../components/general/FooterAll.vue'
export default {
  components: { DashboardContainer, FooterAll },

}
</script>

<style>

</style>