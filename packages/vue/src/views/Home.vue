<template lang="pug">
  .section
    .container
      .content
        h1 Users
        p user : {{auth.user}}
      b-field: b-input(v-model='username' placeholder='username')
      b-field: b-input(v-model='password' placeholder='password')
      b-field(grouped)
        .control: b-button(@click='auth.register({username, password})') register
        .control: b-button(@click='auth.login({username, password})') login
        .control: b-button(@click='auth.logout()') logout
        .control: b-button(@click='auth.profile()') profile
      hr
    .container
      .content
        h1 Cars 
        //- p cars : {{cars.values}}
      br

      table.table
        thead
          tr
            th car id
            th: b-button(type='is-info' @click='cars.find()') refresh
        tbody
          tr(v-for='o in cars.values' :key='o._id')
            td {{o._id}}
            td
              b-button(v-if='!auth.user' disabled) no auth
              b-button(
                v-else-if='o.ownerId == auth.user._id' 
                @click='cars.remove(o._id)'
                type='is-danger' 
              ) remove
              b-button(
                v-else 
                type='is-success'
                @click='rents.create(o._id)'
              ) rent


      br
      .box
        b-field(:label='o.field' v-for='o in CAR_INTERFACE' :key='o.field')
          b-input(:type='o.type' v-model='car[o.field]')
        b-field
          b-button(type='is-primary' @click='cars.create(car)') create
      hr
    .container
      .content
        h1 Rents
        //- p rents : {{rents.values}}
        b-field(grouped)
          .control: b-button(type='is-info' @click='rents.find()') refresh
          .control: b-button(type='is-danger' @click='rents._clear()') clear all
        br
        br
        div: table.table
          thead
            tr
              th rent id
              th renterId
              th lessorId
          tbody
            tr(v-for='o in rents.values')
              td {{o._id}}
              td {{o.renterId}}
              td {{o.lessorId}}

        
        
        
</template>

<script lang="ts">
import { auth } from '../store/auth';
import { cars, CAR_INTERFACE } from '../store/cars';
import { rents } from '../store/rents';
import { onMounted } from '@vue/composition-api';
export default {
  setup() {
    onMounted(async () => {
      await auth.profile();
      await cars.find();
      await rents.find();
    });
    return {
      username: '',
      password: '',
      auth,
      cars,
      car: {},
      CAR_INTERFACE,
      rents
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 500px !important;
}
</style>
