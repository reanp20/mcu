<template>
  <div>
      <dashboard-container />
      <div>
        <footer-all />
      </div>
  </div>
</template>

<script>
import FooterAll from '../../../components/general/FooterAll.vue'
import DashboardContainer from '../../../components/students/dashboard/DashboardContainer.vue'
export default {
  components: { DashboardContainer, FooterAll },

}
</script>

<style>

</style>