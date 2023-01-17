<template>
  <v-app dark>
    <v-dialog v-model="isEdit" width="500">
      <v-card class="pa-5">
        <div>Year and Semester</div>
        <div>
          <v-text-field
            outlined
            dense
            v-model="register.semester"
          ></v-text-field>
        </div>
        <div align="center">
          <v-row>
            <v-col>
              <v-btn @click="isEdit = false"> Cancel </v-btn>
            </v-col>
            <v-col>
              <v-btn @click="submitHandler" color="">Save Changes</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isOpenLogout" width="500" persistent>
      <v-card class="pa-10 rounded-xl">
        <div align="center" class="text-h6">Logout User</div>
        <div align="center" class="pa-10">Would you like to logout?</div>
        <v-card-actions>
          <v-row align="center">
            <v-col align="end">
              <v-btn color="red" text @click="isOpenLogout = false">
                Cancel
              </v-btn>
            </v-col>
            <v-col>
              <v-btn color="success" text @click="confirm"> Logout </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- v-model="drawer" -->
    <v-navigation-drawer
      v-if="$route.name != 'login' && $auth.loggedIn"
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      fixed
      app
      dark
      color="primary"
    >
      <v-list v-if="this.$auth.loggedIn">
        <!--eslint-disable-->
        <v-list-item
          v-for="(item, i) in $auth.user.account_type == 'Admin'
            ? items_admin
            : $auth.user.account_type == 'Head'
            ? items
            : items_student"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
            <!-- <div v-if="item.title =='Announcement' ? $auth.user.notification_announcement!=0 : item.title =='Job Posting' ? $auth.user.notification_job!=0 : $auth.user.notification_event!=0   ">
              <v-badge  :content="item.title =='Announcement' ? $auth.user.notification_announcement : item.title == 'Events' ? $auth.user.notification_event : $auth.user.notification_job" color="red" overlap v-if="item.to=='/student/announcement' || item.to=='/student/events' || item.to=='/student/job_posting'">
              {{item.title}}
            </v-badge>
            </div>
            <div v-else>
              {{item.title}}
            </div> -->
            <div>
              {{item.title}}
            </div>
        </v-list-item>
        <v-list-item
          color="white"
          style="cursor: pointer"
          @click="isOpenLogout = true"
        >
          <v-icon class="pr-2" color="white">mdi-logout</v-icon>
          <v-list-item-title style="color: white">Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      color="primary"
      v-if="$route.name != 'login' && $auth.loggedIn"
      :clipped-left="clipped"
      fixed
      app
    >
      <!-- <v-img src="/mcu_sealed.png" contain height="50" width="50" alignb></v-img> -->
      <div></div>
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer" />
      <v-spacer></v-spacer>
      <div class="pr-4 white--text">
        {{today}}
      </div>
      <div v-if="settings_data.length > 0" class="white--text">
        {{ settings_data[0].semester }}
      </div>
      <div class="white--text mr-5" v-if="$auth.loggedIn">
        <v-icon
          class="pl-5"
          color="white"
          v-if="$auth.user.account_type == 'Admin'"
          @click="isEdit = true"
          >mdi-pencil</v-icon
        >
      </div>
      <div class="">
        <v-avatar>
          <img :src="$auth.user.image" alt="No Image" />
        </v-avatar>
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-0">
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("settings", ["settings_data"]),
    today(){
      const current = new Date();
        const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
        return date;
    }
  },
  name: "DefaultLayout",
  created() {
    this.$store.dispatch("settings/view");
    this.account_type = localStorage.getItem("account_type");
  },
  data() {
    return {
      drawer:true,
      isEdit: false,
      register: {},
      account_type: "",
      isOpenLogout: false,
      clipped: false,
      fixed: false,
      items_student: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/student/dashboard",
        },
        {
          icon: "mdi-bullhorn",
          title: "Announcement",
          to: "/student/announcement",
        },
        {
          icon: "mdi-calendar",
          title: "Events",
          to: "/student/events",
        },
        {
          icon: "mdi-account-tie",
          title: "Job Posting",
          to: "/student/job_posting",
        },
        {
          icon: "mdi-account",
          title: "Alumni Profiling",
          to: "/student/information",
        },
        {
          icon: "mdi-magnify",
          title: "Search",
          to: "/student/search",
        },
        //  {
        //   icon: 'mdi-school',
        //   title: 'PME result',
        //   to: '/student/result'
        // },
        // {
        //   icon: 'mdi-school',
        //   title: 'Account',
        //   to: '/student/account'
        // },
        // {
        //   icon: 'mdi-school',
        //   title: 'Academics',
        //   to: '/student/account'
        // },
      ],
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/dashboard",
        },
        {
          icon: "mdi-bullhorn",
          title: "Announcement",
          to: "/head/announcement",
        },
        {
          icon: "mdi-calendar",
          title: "Events",
          to: "/head/events",
        },
        {
          icon: "mdi-account-tie",
          title: "Job Posting",
          to: "/head/job_posting",
        },
        {
          icon: "mdi-account",
          title: "Program Head",
          to: "/head/information",
        },
        {
          icon: "mdi-account-question",
          title: "Request",
          to: "/head/request",
        },
        {
          icon: "mdi-poll",
          title: "Analytical Report",
          to: "/head/report",
        },
      ],
      items_admin: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/admin/dashboard",
        },
        {
          icon: "mdi-account",
          title: "Program Head",
          to: "/admin/program_head",
        },
        // {
        //   icon: "mdi-account",
        //   title: "Request Reset Password",
        //   to: "/admin/reset",
        // },
        {
          icon: "mdi-account",
          title: "Admin Information",
          to: "/admin/information",
        },
         {
          icon: 'mdi-school',
          title: 'Send OTP',
          to: '/admin/otp'
        },
        //   {
        //   icon: 'mdi-school',
        //   title: 'Alumni Accounts',
        //   to: '/admin/alumni'
        // },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    submitHandler() {
      if (this.settings_data.length > 0) {
        this.$store.dispatch("settings/edit", {
          id: this.settings_data[0].id,
          semester: this.register.semester,
        });
      } else {
        this.$store.dispatch("settings/add", this.register);
      }
      location.reload();
    },
    confirm() {
      localStorage.clear();
      this.$auth.logout();
      this.isOpenLogout = false;
    },
  },
};
</script>
