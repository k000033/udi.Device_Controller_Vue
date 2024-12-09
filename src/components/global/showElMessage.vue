<script setup>
import { ElMessage } from "element-plus"; 
const openElMessage = ()=>{
        ElMessage({

            showClose: true,
            message: 'This is a message.',
            type: 'success',
            duration:0,
    
          })
        }


</script>

<template>
    <button @click="openElMessage">kkkk</button>
</template>