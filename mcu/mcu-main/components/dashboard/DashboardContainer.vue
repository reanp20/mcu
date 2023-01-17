<template>
  <div class="pa-10">
        <div class="text-h5 pb-10" >
           <b> Dashboard</b>
        </div>
         <!-- <div>
              <v-text-field label="Post Something..." append-icon="mdi-post" outlined v-model="post"></v-text-field>
         </div>
         <div align="end">
             Upload Photo <v-icon>mdi-plus</v-icon>
         </div> -->
         <div class="pt-5">
             <v-card class="rounded-xl pa-5" elevation="6">
                 <div>
                  <p>This project is developed by three BSIT students as their thesis about designing a web-based that will help the CAS-IT in communicating with the alumni and will help the CAS-IT as well as the alumni coordinator to easily track and modify the alumni profiles. it is significant in improving data tracking of CAS-IT alumni/graduates, CAS-IT announcements, events, job recommendations, and other related CAS-IT programs in a centralized platform. The system could also provide data needed by the CAS-IT for data information on the alumni, and by which method it would address the recognized problems in the tracking of alumni. There are instances that there are big events like intramurals and sports fests, these will lessen the time consumed by posting all the announcements and sending notifications to the members of the web-based tracking system.</p>
                 </div>
             </v-card>
         </div>
  </div>
</template>

<script>
export default {
    methods:{
        links(item){
            location=`${item}`
        }
    },
    data(){
        return {
            post:''
        }
    }

}
</script>

<style>

</style>