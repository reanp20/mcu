<template>
  <div class="px-5 pt-5">
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
              <div
                v-for="x in work_data.filter(
                  (data) => data.user_id == selectedItem.id
                )"
                :key="x"
              >
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
    <v-row>
      <v-col>
        <v-row>
          <v-col cols="12">
            <v-card
              color="#4747a1"
              height="70"
              class="rounded-xl pa-5"
              elevation="5"
            >
              <v-row>
                <v-col>
                  <div class="pb-5 white--text">Total Members</div>
                </v-col>
                <v-col align="end" class="pt-2">
                  <div class="text-h4 white--text">
                    <b>
                      {{ users.length }}
                    </b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" class="pt-0">
            <v-card
              color="#4747a1"
              height="70"
              class="rounded-xl pa-5"
              elevation="5"
            >
              <v-row>
                <v-col>
                  <div class="pb-5 white--text">Active Members</div>
                </v-col>
                <v-col class="pt-2" align="end">
                  <div class="text-h4 white--text">
                    <b>
                      {{ users.filter((data) => data.is_active).length }}
                    </b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="report_data.length != 0" class="pt-0">
            <v-card
              color="#4747a1"
              height="70"
              class="rounded-xl pa-5"
              elevation="5"
            >
              <v-row>
                <v-col align-self="center">
                  <div class="pb-5 white--text">No. of Event Views</div>
                </v-col>
                <v-col align="end" align-self="center">
                  <div class="text-h4 white--text">
                    <b>
                      {{ report_data[0].event_views }}
                    </b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="report_data.length != 0" class="pt-0">
            <v-card
              color="#4747a1"
              height="70"
              class="rounded-xl pa-5"
              elevation="5"
            >
              <v-row>
                <v-col>
                  <div class="pb-5 white--text">No. Announcement Views</div>
                </v-col>
                <v-col align="end">
                  <div class="text-h4 white--text">
                    <b>
                      {{ report_data[0].announcement_views }}
                    </b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="12" v-if="report_data.length != 0" class="pt-0">
            <v-card
              color="#4747a1"
              height="70"
              class="rounded-xl pa-5"
              elevation="5"
            >
              <v-row>
                <v-col>
                  <div class="pb-5 white--text">No. Job Posting Views</div>
                </v-col>
                <v-col align="end">
                  <div class="text-h4 white--text">
                    <b>
                      {{ report_data[0].posting_views }}
                    </b>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col>
           <v-row>
          <v-col cols="12">
            <v-card
              color="#7978e9"
              height="120"
              class="rounded-xl pa-5"
              elevation="5"
            >
              <div class="pb-5 white--text">Active Users</div>
              <div class="text-h4 white--text">
                <b> </b>
              </div>
            </v-card>
          </v-col>

        </v-row>
        </v-col> -->
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="users"
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
    this.$store.dispatch("work/view");
    this.$store.dispatch("report/view", {});
    this.$store.dispatch("users/view");
  },
  data() {
    return {
      isView: false,
      selectedItem: {},
      headers: [
        { text: "Student Number", value: "student_number" },
        { text: "Date Registered", value: "date_joined" },
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        { text: "Address", value: "address" },
        { text: "Lastname", value: "lastname" },
        { text: "Active?", value: "is_active" },
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