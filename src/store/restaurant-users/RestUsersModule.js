import {api} from "boot/axios";
import {Notify} from "quasar";
import {ErrorHandlePrint} from "src/Utils/ErrorHandlePrint";
const prefixUrl = "restaurant-users"

const state = {
  restUsers : []
}
const mutations = {
  SET_ITEM(state,item) {
    state.restUsers.push(item);
  },
  SET_ITEMS(state,items){
    state.restUsers = items
  },
  SET_REPLACE(state,item){
    state.restUsers.forEach(function (el,i) {
      if(el.id === item.id ){
        state.restUsers[i] = item;
      }
    })

  },
  SET_REMOVE(state,id){
    for (let i=0; i < state.restUsers.length; i++)
    {
      if (state.restUsers[i].id === id)
      {
        state.restUsers.splice(i,1)
        break;
      }
    }
  }
}
const actions = {
  create({commit},payload){
    return  api.post(prefixUrl,payload).then(res => {
      commit('SET_ITEM', res.data);
      Notify.create({
        position:"top-right",
        type: 'positive',
        message: 'Kayıt Başarılı'
      });
      return true
    }).catch( er => {
      ErrorHandlePrint(er)
    })
  },
  update({commit},payload){

    return api.post(prefixUrl+"/"+payload.get('id'),payload).then(res => {
      commit('SET_REPLACE',res.data);
      Notify.create({
        position: 'top-right',
        type: 'positive',
        message:'Kayıt Başarıyla Güncellendi'
      });
      return true
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  get({commit}) {
    api.get(prefixUrl).then(res => {
      commit('SET_ITEMS',res.data)
    }).catch(er => {
      ErrorHandlePrint(er)
    })
  },
  destroy({commit},id){

    api.delete(prefixUrl + "/" + id).then(res => {
      commit('SET_REMOVE',id);
      Notify.create({
        position: 'top-right',
        type:'positive',
        message: 'Kayıt Başarıyla Silindi'
      });
    }).catch(er => {
      ErrorHandlePrint(er)
    });
  }
}
const getters = {
  restUsers: (state) => {
    return state.restUsers
  },
  elById: (state) => (id) => {
    return state.restUsers.filter(el => +el.restaurant_id === +id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
