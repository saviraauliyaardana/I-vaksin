<template>
<v-main style="margin-left:20px;">
    <v-row>
    <v-col cols="2">
      <SideBar/>
    </v-col>
    <v-col cols="10" class="" style="margin-top: 0px; margin-left: px;">
        <!-- <v-container> -->
            <router-view></router-view>
        <!-- </v-container> -->
        
    </v-col>
    </v-row>
</v-main>
</template>

<script>
import SideBar from '@/components/stokVaksin/sideBar.vue'
export default {
    name: "indexLayout",
    components: { SideBar }
}
</script>