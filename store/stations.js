
export const state = () => ({
  list: []
})

export const getters = {
  list(state) {
    return state.list
  }
}

export const mutations = {
  POPULATE_STATIONS(state, { stations }) {
    state.list = stations
  },
  POPULATE_STATUSES(state, { statuses }) {
    state.list = _.map(state.list,  (station)=>{
      var status =  _.find(statuses, (o) => { 
        return parseInt(o.station_id) == parseInt(station.station_id) 
      })
      return {...station, ...status}
    })
  }
}

export const actions = {
  async init({ commit, dispatch, rootGetters }, state) {
    await this.$axios.get('/station_information').then((response)=>{
      commit('POPULATE_STATIONS', { stations: response.data.data.stations })
    }).catch((error)=>{
      console.error('Error Getting Stations',  error)
    })
    await this.$axios.get('/station_status').then((response)=>{
      commit('POPULATE_STATUSES', { statuses: response.data.data.stations })
    }).catch((error)=>{
      console.error('Error Getting Statuses',  error)
    })
  }
}