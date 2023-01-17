<template>
  <v-card elevation="5">
    <v-row>
      <v-col align="start" class="pa-10 text-h5" cols="auto">
        <b>Request Management</b>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="requestList"
      :loading="isLoading"
    >
      <template v-slot:[`item.status`]="{ item }">
        <div>
          <v-chip align="center" :style="getColorStatus(item.status)"
            ><span>{{ item.status }} </span></v-chip
          >
        </div>
      </template>
      <template #[`item.price`]="{ item }">
        <div>
          {{ formatPrice(item.price) }}
        </div>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader
          v-for="n in 5"
          :key="n"
          type="list-item-avatar-two-line"
          class="my-2"
        ></v-skeleton-loader>
      </template>
      <template #[`item.image`]="{ item }">
        <v-img :src="item.image" height="150" width="150"></v-img>
      </template>
      <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="status(item, true)">
              <v-list-item-content>
                <v-list-item-title>Approve</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item @click.stop="status(item, false)">
              <v-list-item-content>
                <v-list-item-title>Decline</v-list-item-title>
              </v-list-item-content>
            </v-list-item> -->
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("users", ["users"]),
    requestList() {
      return this.users.filter((data) => !data.is_active);
    },
  },
  created() {
    this.$store.dispatch("users/view");
  },
  data() {
    return {
      headers: [
        { text: "Student Number", value: "student_number" },
        { text: "Firstname", value: "firstname" },
        { text: "Middlename", value: "middlename" },
        { text: "Lastname", value: "lastname" },
        { text: "Student Number", value: "student_number" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "opt" },
        ,
      ],
      events: [
        {
          id: "1",
          Firstname: "Juan Delacruz",
          student_number: "201510994",
          email: "juandelacruz@email.com",
        },
        {
          id: "2",
          fullname: "Pedro Delacruz",
          student_number: "201510994",
          email: "pedrodelacruz@email.com",
        },
      ],
    };
  },
  methods: {
    generateString(length) {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = " ";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      return result;
    },
    status(item, status) {
      let otpValue = this.generateString(8)
      this.$store
        .dispatch("users/edit", {
          id: item.id,
          is_active: status,
          // password: otpValue,
        })
        .then((res) => {
          this.$store
            .dispatch("users/approval_otp", { email: item.email, code: otpValue })
            .then((res) => {
              alert("Successfully Updated!");
              location.reload();
            });
        });
    },
  },
};
</script>

<style>
</style>