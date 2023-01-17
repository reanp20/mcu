<template>
  <div class="pa-10">
    <div class="text-h5 pb-10">
      <b> Announcement</b>
    </div>
    <!-- <div>
      <v-text-field
        label="Post Something..."
        append-icon="mdi-post"
        outlined
        v-model="register.content"
      ></v-text-field>
    </div>
    <v-row>
      <v-col>
        <div>
          <div>
            Upload Photo
            <input
              type="file"
              id="fileInput1"
              ref="file1"
              @change="onFileUpload"
            />
          </div>
        </div>
      </v-col>
      <v-col>
        <div align="end">
          <v-btn outlined @click="submitHandlerRegister" color="secondary"
            >Post</v-btn
          >
        </div>
      </v-col>
    </v-row> -->
    <div class="pt-5 py-5">
      <div v-for="x in announcement_data" :key="x" class="py-5">
        <v-card class="rounded-xl pa-5" elevation="6">
          <div>
            Date Posted : {{formatDate(x.date_created)}}
          </div>
          <!-- <div align="end">
            <v-icon @click="editItem(x)">mdi-pencil</v-icon>
          </div> -->
          <v-row>
            <v-col cols="12">
              <div class="text-h5">
                <b> {{ x.content }} </b>
                <!-- <div>
                  <i>{{x.date_created}}</i>
                </div> -->
              </div>
            </v-col>
            <v-col align="start" cols="6">
              <v-img :src="x.image" max-height="600" max-width="400"></v-img>
            </v-col>
           <v-col cols="6">
              <div align="start">
                {{ x.description }}
              </div>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("announcement", ["announcement_data"]),
  },
  created() {
    this.loadData();
    this.$store.dispatch("report/announcement_view", {});
    this.$store.dispatch("report/view", {});
  },
  methods: {
     formatDate(item) {
      return moment(item).format("LL");
    },
    async submitHandlerRegister() {
      let form_data = new FormData();
      if (this.file != "" && this.file != undefined) {
        form_data.append("image", this.file);
      }
      form_data.append("content", this.register.content);
      await this.$store.dispatch("announcement/add", form_data);
      alert("Successfully Posted!");
      this.loadData();
    },
    async loadData() {
      await this.$store.dispatch("announcement/view");
    },
    onFileUpload(e) {
      this.file = e;
      e = e.target.files[0];
      if (e["name"].length > 100) {
        alert("255 characters exceeded filename.");
        return;
      }
      try {
        if (e.size > 16000000) {
          alert("Only 15mb file can be accepted.");
          return;
        }
      } catch (error) {
        alert(error);
        return;
      }
      this.file = e;
    },
  },
  data() {
    return {
      register: {},
      file: "",
      post: "",
    };
  },
};
</script>

<style>
</style>