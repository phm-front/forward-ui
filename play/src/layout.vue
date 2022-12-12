<template>
  <f-row :gutter="20">
    <f-col :span="8">123</f-col>
    <f-col :span="4" :offset="4" :pull="4">456</f-col>
    <f-col :span="4" :push="4">789</f-col>
  </f-row>
  <f-row :gutter="20">
    <f-col :xs="{ span: 8, push: 2, pull: 2, offset: 2 }" :sm="6" :md="4" :lg="3" :xl="1">1</f-col>
    <f-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">2</f-col>
    <f-col :xs="4" :sm="6" :md="8" :lg="9" :xl="11">3</f-col>
    <f-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">4</f-col>
  </f-row>
</template>

<script setup lang="ts"></script>
