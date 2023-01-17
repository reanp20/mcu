<template>
  <v-card elevation="5">
    
    <v-row>
      <v-col align="start" class="pa-10 text-h5" cols="auto">
        <b>OTP Management</b>
      </v-col>
      <v-spacer></v-spacer>
 
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="reset_data"
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
            {{formatPrice(item.price)}}
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
            <v-list-item @click.stop="sendOTP(item)">
              <v-list-item-content>
                <v-list-item-title>Send OTP</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- <v-list-item @click.stop="status(item,'Declined')">
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
import {mapState} from 'vuex';
export default {
    computed:{
      ...mapState('reset',['reset_data']),
      ...mapState('users',['users'])
    },
  created() { 
    this.$store.dispatch('users/view')
    this.$store.dispatch('reset/view')
  },
data(){
    return{
        headers: [
        { text: "ID", value: "id" },
        { text: "Email", value: "email" },
         { text: "Actions", value: "opt" },
        ,
      ],
      events:[
      ],
    }
},
methods:{
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
     sendOTP(item){
        var a =  this.users.filter(data=>data.email==item.email)
        let otpValue = this.generateString(8)
        this.$store.dispatch('users/edit',
        {
            id: a[0].id,
            email:item.email,
            password: otpValue,
        }
        ).then(res=>{
         this.$store
            .dispatch("users/otp", { email: item.email, code: otpValue })
            .then((res) => {
              alert("Successfully Updated!");
              location.reload();
            });
        })
    }

}
};
</script>

<style>

</style>