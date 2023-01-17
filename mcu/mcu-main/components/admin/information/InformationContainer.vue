<template>
  <div class="pa-10">
    <v-dialog v-model="isEdit" width="700">
      <v-card class="pa-10">
        <div>Firstname</div>
        <div>
          <v-text-field outlined v-model="register.firstname"></v-text-field>
        </div>
        <div>Lastname</div>
        <div>
          <v-text-field outlined v-model="register.lastname"></v-text-field>
        </div>
        <div>
          <v-row>
            <v-col cols="auto">
              <div>Mobile Number </div>
            </v-col>
          </v-row>
        </div>
        <div>
        <v-row>
            <v-col cols="auto" class="pr-0">
             <div style="width:120px">
               <v-select 
                outlined
                dense
                hide-details=""
                v-model="register.coutry_code"
                :items="['+93', '+355','213','1684','376','244','1264','672','64','1268','54','374','297','247','61','43','994','1242','973','880','1246','375','32','501','229','1441','975','591','387','267','55','1284','673','359','226','95','257','855','237','1','238','1345','236','235','56','86','61','57','269','242','682']"
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
         <!-- <div>Age</div>
        <div>
          <v-text-field
            outlined
            v-model="register.age"
          ></v-text-field>
        </div> -->
         <div>Address</div>
        <div>
          <v-text-field
            outlined
            v-model="register.address"
          ></v-text-field>
        </div>
        <!-- <div>Faculty ID Number</div>
        <div>
          <v-text-field outlined v-model="register.student_number"></v-text-field>
        </div> -->
        <div class="py-10">
          <v-row>
            <v-col align="end">
              <v-btn color="grey" @click="isEdit=false">Cancel</v-btn>
            </v-col>
            <v-col>
              <v-btn color="success" @click="submitHandler">Save Changes</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <div class="text-h5 pb-10">
      <b>Admin Information</b>
    </div>
    <div>
      <v-row>
        <v-col>
          <v-card elevation="5" class="rounded-xl pa-10" height="400">
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
                <div></div>
                <div align="start" class="pt-5">
                  <v-row>
                    <!-- <v-col>
                      <div>Faculty ID Number:</div>
                    </v-col>
                    <v-col>
                      <div>{{$auth.user.student_number}}</div>
                    </v-col> -->
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
                      <div>Firstname:</div>
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
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card elevation="5" class="rounded-xl pa-10">
            <div>Mobile Number</div>
            <div class="pb-10"> 
              {{ $auth.user.mobile_number }}
            </div>
             <div>Age:</div>
              <div class="pb-10"> 
              {{ $auth.user.age }}
            </div>
             <div>Address:</div>
              <div class="pb-10"> 
              {{ $auth.user.address }}
            </div>
            <!-- <div>Status:</div>
            <div>
              <v-radio-group v-model="radioGroup">
                <v-radio label="Working" value="n"></v-radio>
                <v-radio label="Not Working" value="n"></v-radio>
              </v-radio-group>
            </div> -->
            <div>
              <v-icon @click="editItem"> mdi-pencil </v-icon>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
var cloneDeep = require("lodash.clonedeep");
export default {
  data() {
    return {
      isEdit: false,
      register: {
        id: this.$auth.user.id,
      },
    };
  },
  methods: {
    editItem(){
      this.register = cloneDeep(this.$auth.user)
      delete this.register.image
      this.isEdit = true
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
    submitHandler() {
      this.$store.dispatch("users/edit", this.register);
      alert("Successfully Updated!");
      this.isEdit = false;
      location.reload();
    },
  },
};
</script>

<style>
</style>