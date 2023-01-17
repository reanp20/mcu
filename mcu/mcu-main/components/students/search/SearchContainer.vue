<template>
  <div class="px-15 pt-5">
    <v-dialog v-model="isView" width="" max-width="500">
      <v-card class="pa-10">
        <!-- <div>
          {{selectedItem}}
        </div> -->
        <div>
          <div align="center">
            <v-img :src="selectedItem.image" height="200" width="200"></v-img>
          </div>
          <div>
            <v-row>
              <v-col cols="auto"> Firstname : </v-col>
              <v-col>
                {{ selectedItem.firstname }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="auto"> Lastname : </v-col>
              <v-col>
                {{ selectedItem.lastname }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="auto"> Year Graduated : </v-col>
              <v-col>
                {{ selectedItem.last_attended }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="auto"> Student Number : </v-col>
              <v-col>
                {{ selectedItem.student_number }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="auto"> Birthday : </v-col>
              <v-col>
                {{ selectedItem.birthdate }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="auto"> Address : </v-col>
              <v-col>
                {{ selectedItem.address }}
              </v-col>
            </v-row>
            <div>
               <div v-for="x in work_data.filter(data=>data.user_id==selectedItem.id)" :key="x">
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12">
                    <!-- <div align="end">
                      <v-icon @click="editWork(x)"> mdi-pencil </v-icon>
                      <v-icon @click="deleteWork(x)"> mdi-delete </v-icon>
                    </div> -->
                    <div>Company Name : {{ x.company_name }}</div>
                    <div>Field : {{ x.field }}</div>
                    <div>Position : {{ x.position }}</div>
                    <div>Date Hired : {{ formatDate(x.date_joined) }}</div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-text-field
      outlined
      v-model="search"
      dense
      placeholder="Search"
    ></v-text-field>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :search="search"
      :items="users.filter((data) => data.account_type == 'Student')"
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
      <template #[`item.date_joined`]="{ item }">
        <div>
          {{ formatDate(item.date_joined) }}
        </div>
      </template>
      <template #[`item.opt`]="{ item }">
        <v-menu offset-y z-index="1">
          <template v-slot:activator="{ attrs, on }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click.stop="view(item)">
              <v-list-item-content>
                <v-list-item-title>View Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  computed: {
    ...mapState("users", ["users"]),
    ...mapState("report", ["report_data"]),
    ...mapState("work", ["work_data"]),
  },
  created() {
    this.$store.dispatch("report/view", {});
    this.$store.dispatch("users/view");
    this.$store.dispatch("work/view");
  },
  data() {
    return {
      selectedItem: {},
      search: "",
      isView: false,
      headers: [
        { text: "Student Number", value: "student_number" },
        { text: "Date Registered", value: "date_joined" },
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Email", value: "email" },
        { text: "Actions", value: "opt" },

        ,
      ],
    };
  },
  methods: {
    view(item) {
      this.selectedItem = item;
      this.isView = true;
    },
    formatDate(item) {
      return moment(item).format("LL");
    },
  },
};
</script>

<style>
</style>