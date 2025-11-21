import { login, logout, getInfo, enumsSelect } from "@/api/login/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter } from "@/router";
let wms = JSON.parse(localStorage.getItem("wms"));
let hasToken = null;
if (wms) hasToken = wms.SET_TOKEN;
const state = {
  token: hasToken,
  name: "",
  avatar: "require('@/assets/TX_images/TX.gif",
  introduction: "",
  roles: [],
  menuList: [],
  connectionURL: "",
  receiveMessageCallBack: function (Fn) {
    state.receiveMessage = Fn;
    if (state.connectionURL) {
      state.connectionURL.off("ReceiveMessage");
      state.connectionURL.on("ReceiveMessage", function (data) {
        Fn(data);
      });
    }
  },
};

const mutations = {
  connectionURL(state, val) {
    if (val) {
      state.connectionURL = val;
    }
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  SET_menuList: (state, menuList) => {
    state.menuList = menuList;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password, tenantId, systemName,scret } = userInfo;
    return new Promise((resolve, reject) => {
      login({
        userName: userName.trim(),
        password: password,
        tenantId: tenantId,
        systemName: systemName,
        scret:scret
      })
        .then((response) => {
          // login({ userName: userName.trim(), password: password, tenantId: tenantId, systemName: window.global_config.name }).then(response => {
          const { result } = response;
          let wms = {
            SET_TOKEN: result.result,
            outTime: result.outTime,
            warehouseFlage:
              tenantId == "caf51fa8-9543-888e-df46-3a09f54d593f" ? "CP" : "YC",
          };
          localStorage.setItem("wms", JSON.stringify(wms));
          commit("SET_TOKEN", result.result);
          // localStorage.SET_TOKEN = result
          // setToken(result)
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then((response) => {
          const { result } = response;

          if (!result) {
            reject("验证失败，请重新登录。");
          }
          //公用下拉框接口数据 存储在本地
          enumsSelect().then((res) => {
            res.result.enableStatusEnum = {
              enums: [
                {
                  key: true,
                  value: "启用",
                },
                {
                  key: false,
                  value: "禁用",
                },
              ],
            };
            let wms = JSON.parse(localStorage.getItem("wms"));
            wms.SET_enumsSelect = res.result;
            localStorage.setItem("wms", JSON.stringify(wms));
          });
          const {
            roles,
            name,
            avatar = "require('@/assets/TX_images/TX.gif')",
          } = result.user;
          const introduction = {
            name: name,
            tenant: result.tenant.name,
          };
          // name + '(' + result.tenant.name + ')'

          // roles must be a non-empty array
          if (!roles || roles.length <= 0) {
            reject("getInfo：角色必须是非空数组");
          }

          commit("SET_ROLES", roles);
          commit("SET_NAME", name);
          commit("SET_AVATAR", avatar);
          commit("SET_INTRODUCTION", introduction);
          result.user.tenant = result.tenant;
          resolve(result.user);
        })
        .catch((error) => {
          localStorage.clear();
          reject(error);
        });
    });
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("SET_TOKEN", "");
          commit("SET_ROLES", []);
          removeToken();
          resetRouter();
          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch("tagsView/delAllViews", null, { root: true });
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      commit("SET_TOKEN", "");
      commit("SET_ROLES", []);
      removeToken();
      resolve();
    });
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + "-token";

    commit("SET_TOKEN", token);
    setToken(token);

    const { roles } = await dispatch("getInfo");
    resetRouter();

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch("permission/generateRoutes", roles, {
      root: true,
    });
    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // reset visited views and cached views
    dispatch("tagsView/delAllViews", null, { root: true });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
