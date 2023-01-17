<template>
  <div class="pa-10">
    <v-dialog v-model="isView" width="500" persistent>
      <v-card class="pa-10">
        <div>
          <div class="pa-5" align="center">New notification!</div>
          <div>
            <div v-if="$auth.user.notification_event != 0">
              Events : {{ $auth.user.notification_event }}
            </div>
            <div v-if="$auth.user.notification_job != 0">
              Job Posting : {{ $auth.user.notification_job }}
            </div>
            <div v-if="$auth.user.notification_announcement != 0">
              Announcement : {{ $auth.user.notification_announcement }}
            </div>
          </div>
          <div align="end">
            <v-btn color="secondary" @click="okay">Okay</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <div class="text-h5 pb-10">
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
          <p>
            This project is developed by three BSIT students as their thesis
            about designing a web-based that will help the CAS-IT in
            communicating with the alumni and will help the CAS-IT as well as
            the alumni coordinator to easily track and modify the alumni
            profiles. it is significant in improving data tracking of CAS-IT
            alumni/graduates, CAS-IT announcements, events, job recommendations,
            and other related CAS-IT programs in a centralized platform. The
            system could also provide data needed by the CAS-IT for data
            information on the alumni, and by which method it would address the
            recognized problems in the tracking of alumni. There are instances
            that there are big events like intramurals and sports fests, these
            will lessen the time consumed by posting all the announcements and
            sending notifications to the members of the web-based tracking
            system.
          </p>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isView: false,
      post: "",
    };
  },
  methods: {
    okay() {
        localStorage.setItem('save',true)
        this.isView = false; 
        this.$store.dispatch('users/edit',{id:this.$auth.user.id,notification_job:0,notification_event:0,notification_announcement:0})   
    },
  },
  created() {
    // if(localStorage.getItem('save')){
    //     return
    // }
    if (
      this.$auth.user.notification_job != 0 || 
      this.$auth.user.notification_event != 0 ||
      this.$auth.user.notification_announcement != 0
    ) {
      this.isView = true;
    }
  },
};
</script>

<style>
</style>