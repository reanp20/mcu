<template>
  <v-card elevation="5">
    
    <v-row>
      <v-col align="start" class="pa-10 text-h5" cols="auto">
        <b>Alumni Accounts</b>
      </v-col>
      <v-spacer></v-spacer>
 
    </v-row>
    <v-data-table
      class="pa-5"
      :headers="headers"
      :items="events"
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
            <v-list-item @click.stop="status(item,'Accepted')">
              <v-list-item-content>
                <v-list-item-title>Approve</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item @click.stop="status(item,'Declined')">
              <v-list-item-content>
                <v-list-item-title>Decline</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>

export default {
  
  created() {

  },
data(){
    return{
        headers: [
        { text: "Fullname", value: "fullname" },
        { text: "Student Number", value: "student_number" },
        { text: "Email", value: "email" },
         { text: "Actions", value: "opt" },
        ,
      ],
      events:[{
          "id":"1",
          "fullname":"Juan Delacruz",
          "student_number":"201510994",
          "email":"juandelacruz@email.com",
      },
      {
          "id":"2",
          "fullname":"Pedro Delacruz",
          "student_number":"201510994",
          "email":"pedrodelacruz@email.com",
      }
      ],
    }
},
methods:{

}
};
</script>

<style>

</style>