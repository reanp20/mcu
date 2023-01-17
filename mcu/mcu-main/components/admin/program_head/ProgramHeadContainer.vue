<template>
  <v-card elevation="5">
    <v-dialog v-model="isDelete" width="500">
      <v-card class="pa-10">
        <div align="center" class="py-10">
          Are you sure you want to delete this item?
        </div>
        <div>
          <v-row>
            <v-col align="end">
              <v-btn @click="isDelete=false" outlined>Cancel</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="submitHandlerDelete" color="error" outlined>Delete</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
     <v-dialog v-model="isEdit" width="500">
      <v-card class="pa-10">
        <div align="center" class="py-10">
          <div>
            <v-text-field dense v-model="register.email" outlined placeholder="Email"></v-text-field>
          </div>
          <!-- <div>
            <v-text-field dense v-model="register.lastname" outlined placeholder="Lastname"></v-text-field>
          </div> -->
        </div>
        <div>
          <v-row>
            <v-col align="end">
              <v-btn @click="isEdit=false" outlined>Cancel</v-btn>
            </v-col>
            <v-col>
              <v-btn @click="submitHandlerEdit" color="success" outlined>Edit</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="isAdd" width="500">
      <v-card class="pa-10">
        <div>Email</div>
        <div class="pb-4">
          <v-text-field outlined v-model="register.email" dense></v-text-field>
        </div>
        <div>Password</div>
        <div class="pb-4">
          <v-text-field
            type="password"
            outlined
            v-model="register.password"
            dense
          ></v-text-field>
        </div>
        <div align="center">
          <v-row>
            <v-col>
              <v-btn rounded @click="isAdd = false" color="secondary"
                >Cancel</v-btn
              >
            </v-col>
            <v-col>
              <v-btn rounded @click="submitHandler" dark color="green"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-dialog>
    <v-row>
      <v-col align="start" class="pa-10 text-h5">
        <b>Program Head Accounts</b>
      </v-col>
      <v-col align-self="center" align="end" class="pr-10">
        <v-btn rounded @click="isAdd = true" color="secondary"
          >Add Program Head</v-btn
        >
      </v-col>
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="program"
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
            <v-list-item @click.stop="editItem(item)">
              <v-list-item-content>
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="deleteItem(item)">
              <v-list-item-content>
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
var cloneDeep = require("lodash.clonedeep");
export default {
  computed: {
    ...mapState("users", ["users"]),
    program() {
      return this.users.filter((data) => data.account_type == "Head");
    },
  },
  created() {
    this.$store.dispatch("users/view");
  },
  data() {
    return {
      selectedItem:{},
      isDelete:false,
      register: {
        email: "",
        password: "",
      },
      isAdd: false,
      isEdit:false,
      headers: [
        { text: "Firstname", value: "firstname" },
        { text: "Lastname", value: "lastname" },
        // { text: "Student Number", value: "student_number" },
        { text: "Email", value: "email" },
         { text: "Actions", value: "opt" },
        ,
      ],
      events: [
        {
          id: "1",
          fullname: "Juan Delacruz",
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
    editItem(item){
      this.register = cloneDeep(item);
      this.isEdit = true;
    },
    submitHandlerEdit(){
      this.$store.dispatch('users/edit',{email:this.register.email,id:this.register.id}).then((res)=>{
        alert("Successfully Updated!")
        location.reload()
      })
     
    },
    submitHandlerDelete(){
      this.$store.dispatch('users/delete',{"id":this.selectedItem.id})
      alert("Successfully Deleted!")
      location.reload()
    },
    deleteItem(item){
      this.selectedItem = item
      this.isDelete = true;
    },
    submitHandler(){
        this.register.account_type='Head'
        this.register.is_active=true
        this.$store.dispatch('users/addUser',this.register)
        alert("Successfully Added!")
        this.isAdd=false;
        location.reload()
    }
  },
};
</script>

<style>
</style>