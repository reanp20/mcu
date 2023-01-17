<template>
    <v-card
      width="100vw"
      color="#e2cbfe"
      height="100"
      class="d-flex justify-center align-center"
    >
      <v-row>
        <v-col
          class="black--text"
          align-self="center"
          align="center"
          @click="route('contacts')"
        >
            <div>
                Stay In Touch
            </div>
            <div>
                https://www.mcu.edu.ph
            </div>
            <div>
                student.support@mcu.edu.ph
            </div>
        </v-col>
        <v-col class="white--text" align-self="center" align="center">
         <v-img src="/footerlogo.jpeg" height="100" width="100"></v-img>
        </v-col>
        <v-col @click="privacy=true" style="cursor:pointer" class="white--text" align-self="center" align="center">
            <v-row>
                <v-col>
                    <v-icon @click="links('https://www.facebook.com/MCU1904')">
                        mdi-facebook
                    </v-icon>
                </v-col>
                 <v-col>
                    <v-icon @click="links('https://twitter.com/MCU1904')">
                        mdi-twitter
                    </v-icon>
                </v-col>
                 <v-col>
                    <v-icon @click="links('https://www.instagram.com/mcu1904/')">
                        mdi-instagram
                    </v-icon>
                </v-col>
            </v-row>
        </v-col>
      
      </v-row>
    </v-card>
</template>

<script>
export default{
    methods:{
        links(item){
            location=`${item}`
        }
    }
}
   
</script>

<style>
</style>