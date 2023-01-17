<template>
  <div class="pa-10">
    <v-dialog v-model="isEditPassword" width="300">
      <v-card class="pa-5">
        <div>
          <div>Current Password</div>
          <div>
            <v-text-field
              type="password"
              outlined
              dense
              v-model="register.current_password"
            ></v-text-field>
          </div>
          <div>
            New Password
            <div>
              <v-text-field
                outlined
                type="password"
                dense
                v-model="register.new_password"
              ></v-text-field>
            </div>
          </div>
          <div align="center">
            <v-btn color="secondary" @click="savePassword">Save</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isAdd" width="700">
      <v-card class="pa-10">
        <div>
          <div>Company Name</div>
          <div>
            <v-text-field
              outlined
              dense
              v-model="register.company_name"
            ></v-text-field>
          </div>
          <div>Department</div>
          <div>
            <v-text-field
              outlined
              dense
              v-model="register.field"
            ></v-text-field>
          </div>
          <div>Position</div>
          <div>
            <v-text-field
              outlined
              dense
              v-model="register.position"
            ></v-text-field>
          </div>
          <div>Award Received</div>
          <div>
            <v-text-field
              outlined
              dense
              v-model="register.award_received"
            ></v-text-field>
          </div>
          <div>
            Date Hired
            <div class="text-h5">
              <v-menu
                ref="departMenu"
                v-model="departMenu"
                :close-on-content-click="false"
                :return-value.sync="register.date_joined"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    dense
                    v-model="register.date_joined"
                    outlined
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="register.date_joined"
                  no-title
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="departMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.departMenu.save(register.date_joined)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </div>
          <div align="center">
            <v-btn color="primary" @click="submitHandlerWork">Save</v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isEdit" width="500">
      <v-card class="pa-10">
        <div>
          <div>Firstname</div>
          <v-text-field
            outlined
            dense
            v-model="register.firstname"
          ></v-text-field>
        </div>
        <div>
          <div>Lastname</div>
          <v-text-field
            outlined
            dense
            v-model="register.lastname"
          ></v-text-field>
        </div>
        <div>
          <v-row>
            <v-col cols="auto">
              <div>Mobile Number</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto" class="pr-0">
              <div style="width: 120px">
                <v-select
                  outlined
                  dense
                  hide-details=""
                  v-model="register.coutry_code"
                  :items="['+63','+93', '+355','+213','+1684','+376','+244','+1264','+672','+64','+1268','+54','+374','+297','+247','+61','+43','+994','+1242','+973','+880','+1246','+375','+32','+501','+229','+1441','+975','+591','+387','+267','+55','+1284','+673','+359','+226','+95','+257','+855','+237','+1','+238','+1345','+236','+235','+56','+86','+61','+57','+269','+242','+682']"
                >
                </v-select>
              </div>
            </v-col>
            <v-col>
              <v-text-field
                outlined
                type="number"
                placeholder=""
                dense
                v-model="register.mobile_number"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div>
          <div>Year graduated</div>
          <v-text-field
            outlined
            dense
            v-model="register.last_attended"
          ></v-text-field>
        </div>
        <!-- <div>
          <div>Age</div>
          <v-text-field
            outlined
            dense
            type="number"
            v-model="register.age"
          ></v-text-field>
        </div> -->
        <div>
          <div>
            Birthday
            <div class="text-h5">
              <v-menu
                ref="departMenu"
                v-model="departMenu"
                :close-on-content-click="false"
                :return-value.sync="register.depart"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="register.birthdate"
                    outlined
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="register.birthdate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="departMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.departMenu.save(register.birthdate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
          </div>
        </div>
        <div>
          <div>Address</div>
          <v-text-field
            outlined
            dense
            v-model="register.address"
          ></v-text-field>
        </div>
        <div>
          <div>Working Status</div>
          <v-select
            v-model="register.work_status"
            :items="['Employed', 'Unemployed', 'Self Employed']"
          ></v-select>
        </div>
        <div align="center">
          <v-btn color="primary" @click="submitHandler">Save Changes</v-btn>
        </div>
      </v-card>
    </v-dialog>
    <div class="text-h5 pb-10">
      <b>Alumni Profiling</b>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-card elevation="5" class="rounded-xl pa-10">
            <div align="center">
              <div class="">
                <v-avatar
                  size="100"
                  color="grey"
                  class="white--text pointer"
                  @click="$refs.file.click()"
                >
                  <v-img :src="$auth.user.image"> </v-img>
                </v-avatar>
                <input
                  class="d-none"
                  type="file"
                  id="fileInput"
                  ref="file"
                  accept="image/png, image/jpeg"
                  @change="onFileUpload"
                />
                <div>{{ $auth.user.firstname }} {{ $auth.user.lastname }}</div>
                <div @click="isEditPassword = true" class="pointer">
                  Edit Password
                </div>
                <!-- <div>
                    BSIT 4-1
                </div> -->
                <div align="start" class="pt-5">
                  <v-row>
                    <v-col>
                      <div>Student Number:</div>
                    </v-col>
                    <v-col>
                      <div>
                        {{ $auth.user.student_number }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>Email:</div>
                    </v-col>
                    <v-col>
                      <div>
                        {{ $auth.user.email }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>Firsntame:</div>
                    </v-col>
                    <v-col>
                      <div>
                        {{ $auth.user.firstname }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>Lastname:</div>
                    </v-col>
                    <v-col>
                      <div>
                        {{ $auth.user.lastname }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>Year graduated:</div>
                    </v-col>
                    <v-col>
                      <div>
                        {{ $auth.user.last_attended }}
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <div>Mobile Number:</div>
                    </v-col>
                    <v-col>
                      <div>
                        {{ $auth.user.mobile_number }}
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="5" class="rounded-xl pa-10">
            <v-row>
              <v-col>
                <div>Age:</div>
              </v-col>
              <v-col>
                <div>
                  {{calculateAge}}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>Birthday:</div>
              </v-col>
              <v-col>
                <div>
                  {{ $auth.user.birthdate }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>Address:</div>
              </v-col>
              <v-col>
                <div>
                  {{ $auth.user.address }}
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>Working Experience:</div>
              </v-col>
              <v-col>
                <div>
                  {{ $auth.user.work_status }}
                </div>
              </v-col>
            </v-row>

            <div>Status:</div>
            <div align="end">
              <v-icon @click="editItem"> mdi-pencil </v-icon>
            </div>
            <div>
              <v-row>
                <v-col>
                  <div>Work Experience History</div>
                </v-col>
                <v-col>
                  <v-icon @click="addWork">mdi-plus</v-icon>
                </v-col>
              </v-row>
              <div v-for="x in work_data" :key="x">
                <v-divider></v-divider>
                <v-row>
                  <v-col cols="12">
                    <div align="end">
                      <v-icon @click="editWork(x)"> mdi-pencil </v-icon>
                      <v-icon @click="deleteWork(x)"> mdi-delete </v-icon>
                    </div>
                    <div>Company Name : {{ x.company_name }}</div>
                    <div>Field : {{ x.field }}</div>
                    <div>Position : {{ x.position }}</div>
                    <div>Date Hired : {{ formatDate(x.date_joined) }}</div>
                    <div>Award Received : {{ x.award_received }}</div>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
var cloneDeep = require("lodash.clonedeep");
export default {
  computed: {
    ...mapState("work", ["work_data"]),
    calculateAge: function () {
      let currentDate = new Date();
      let birthDate = new Date(`${this.$auth.user.birthdate}`);
      let difference = currentDate - birthDate;
      let age = Math.floor(difference / 31557600000);
      return age;
    },
  },
  created() {
    this.$store.dispatch("work/work");
  },
  methods: {
    deleteWork(x) {
      this.$store.dispatch("work/delete", x).then((res) => {
        alert("Successfully Deleted");
        location.reload();
      });
    },
    async savePassword() {
      if (localStorage.getItem("password") != this.register.current_password) {
        alert("Wrong Password");
        return;
      }
      try {
        localStorage.setItem("password", this.register.new_password);
        this.$store
          .dispatch("users/edit", {
            id: this.$auth.user.id,
            password: this.register.new_password,
          })
          .then((res) => {
            location.reload();
          });
      } catch (error) {
        alert("Wrong Password");
        // location.reload();
        // this.isLoaded = false;
      }
    },
    addWork() {
      this.register = {};
      this.isAdd = true;
      this.isEditWork = false;
    },
    editWork(item) {
      this.register = cloneDeep(item);
      this.isAdd = true;
      this.isEditWork = true;
    },
    formatDate(item) {
      return moment(item).format("LL");
    },
    submitHandlerWork() {
      if (this.isEditWork) {
        this.$store
          .dispatch("work/edit", {
            user_id: this.$auth.user.id,
            company_name: this.register.company_name,
            field: this.register.field,
            award_received: this.register.award_received,
            position: this.register.position,
            id: this.register.id,
          })
          .then((res) => {
            alert("Successfully Updated!");
            location.reload();
          });
        return;
      }
      this.$store
        .dispatch("work/add", {
          user_id: this.$auth.user.id,
          company_name: this.register.company_name,
          field: this.register.field,
          award_received: this.register.award_received,
          position: this.register.position,
        })
        .then((res) => {
          alert("Successfully Added!");
          location.reload();
        });
    },
    onFileUpload(e) {
      this.file = e;
      e = e.target.files[0];
      this.url = URL.createObjectURL(e);
      if (e["name"].length > 100) {
        alert("255 characters exceeded filename.");
        return;
      }
      try {
        if (e.size > 16000000) {
          alert("Only 15mb file can be accepted.");
          return;
        }
        let users = new FormData();

        users.append("id", this.$auth.user.id);
        users.append("image", e);
        this.$store.dispatch("users/editUserImage", users).then((res) => {
          location.reload();
        });
      } catch (error) {
        alert(error);
        return;
      }
      this.file = e;
    },
    editItem() {
      this.register = cloneDeep(this.$auth.user);
      this.register.birthdate = ''
      delete this.register.image;
      this.isEdit = true;
    },
    submitHandler() {
      this.register.id = this.$auth.user.id;
      this.$store.dispatch("users/edit", this.register).then((res) => {
        alert("Successfully Updated!");
        location.reload();
        this.isEdit = false;
      });
    },
  },
  data() {
    return {
      departMenu: false,
      isEditPassword: false,
      isEditWork: false,
      departMenu: false,
      isAdd: false,
      isEdit: false,
      register: {},
    };
  },
};
</script>

<style>
</style>