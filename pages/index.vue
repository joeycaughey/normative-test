<template>
  <article>
    <form>
      <input type="text" v-model="searchstring" placeholder="Search" />
      <select v-model="sort">
        <option>Name</option>
        <option>Number of Bikes</option>
      </select>
      <select v-model="order">
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
    </form>
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Configuration</td>
          <td>Address</td>
          <td>Number of Bikes</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="station in stations">
          <td>{{station.name}}</td>
          <td>{{station.physical_configuration}}</td>
          <td>{{station.address}}</td>
          <td>{{station.num_bikes_available}}</td>
        </tr>
      </tbody>
    </table>
  </article>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  components: {
    
  },
  data() {
    return {
      searchstring: '',
      sort: 'Name',
      order: 'ASC'
    }
  },
  computed: {
    stations () { 
      var self = this;

      // Filter searches and statuses
      var stations = _.filter(this.$store.getters['stations/list'], function(station) {
        return (self.searchstring === '') ? true
          : (station.name.search(new RegExp(self.searchstring, 'i')) >= 0)
      })

      // Order 
      var order_by = 'name'
      switch(this.sort) {
        case 'Number of Bikes':
          order_by = 'num_bikes_available'
          break;
        default:
          // code block
      }
      stations = _.sortBy(stations, order_by);

      return (this.order=='desc') ? stations.reverse() : stations
    }
  }
}
</script>
