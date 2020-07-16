import Vue from "vue";
import Vuex from "vuex";
import Server from '@/service/request';
import Path from '@/service/Path';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    status: -1,
    headimg: 0,
    istipbox: 0,
    isFastShow: false,
    isleadModal1: false,
    isleadModal2: false,
    isleadModal3: false,
    organlogo: '',
    organname: '',
    permissList: ""
  },
  mutations: {
    setPermissList(state, permissList) {
      state.permissList = permissList;
    },
    setStatus(state, status) {
      state.status = status;
    },
    setTip(state, t) {
      state.istipbox = t;
    },
    uploadHeadimg(state, d) {
      state.headimg = d;
    },
    setFastShow(state, f) {
      state.isFastShow = f;
    },
    leadModal1(state, m) {
      state.isleadModal1 = m;
    },
    leadModal2(state, m) {
      state.isleadModal2 = m;
    },
    leadModal3(state, m) {
      state.isleadModal3 = m;
    },
    uploadLogo(state, d) {
      state.organlogo = d;
    },
    changeOrganName(state, d) {
      state.organname = d;
    },
  },
  getters: {
    permissList: state => state.permissList
  },
  actions: {
    getStatus({
      commit,
      dispatch
    }, obj) {},
    isBuyOrder({
      commit,
      dispatch
    }, obj) {
      Server.post(Path.checkOrganValidTime, {
        organid: obj.id
      }, res => {
        let {
          code,
          data
        } = res;
        if (code === 0) {
          if (obj.newtype == '-1') {
            commit('setStatus', 3); //已续费  成功
            setTimeout(e => {
              commit('setStatus', -1);
            }, 1000);
          } else {
            dispatch('checkClass', obj.newtype);
          }
        } else {
          commit('setStatus', 4); //没续费
        }
      })
    },
    checkClass({
      commit
    }, newtype) { // 1 添加课程检查分类 2 开课检查课程"
      Server.post(Path.checkClass, {
        type: newtype
      }, (res) => {
        if (res.code === 0) {
          commit('setStatus', 3); //已续费  成功
          setTimeout(e => {
            commit('setStatus', -1);
          }, 1000);
        } else {
          commit('setTip', 1);
        }
      });
    },
  }
});

export default {
  store
};
