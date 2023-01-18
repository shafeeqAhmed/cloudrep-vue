// We haven't added icon's computed property because it makes this mixin coupled with UI
import useJwt from "@/auth/jwt/useJwt";
import { isUserLoggedIn } from "@/auth/utils";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import { toastAlert } from "@core/mixins/ui/toast";
import store from "@/store";
export const globalHelper = {
  mixins: [toastAlert],
  data() {
    return {};
  },
  methods: {
    logout() {
      const isLoggedIn = isUserLoggedIn();
      if (isLoggedIn) {
        useJwt
          .logout()
          .then(() => {
            useJwt.logoutFromLocal();
          })
          .catch(() => {
            useJwt.logoutFromLocal();
          });
      } else {
        useJwt.logoutFromLocal();
      }
    },
    loginAs(user_uuid) {
      useJwt
        .loginAs({
          user_uuid,
        })
        .then((response) => {
          const {
            data: { data },
          } = response;
          const { userData, accessToken, refreshToken, isVerified2fa } = data;

          localStorage.clear();

          userData.accessToken = accessToken;
          userData.isVerified2fa = isVerified2fa;

          useJwt.setToken(accessToken);
          useJwt.setRefreshToken(refreshToken);

          // localStorage.removeItem('userData', JSON.stringify(userData))
          // localStorage.removeItem('isVerified2fa', true)
          // localStorage.removeItem('rememberMe', JSON.stringify(this.status))

          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("isVerified2fa", true);
          localStorage.setItem("acountHealth", true);
          localStorage.setItem("rememberMe", JSON.stringify(this.status));

          this.$ability.update(userData.ability);

          store.commit("app/UPDATE_USER", userData);

          // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
          this.$router
            .replace(getHomeRouteForLoggedInUser(userData.role))
            .then(() => {
              this.successToast(
                `Welcome ${userData.name}`,
                `You have successfully logged in as ${userData.role}. Now you can start to explore!`
              );
            })
            .catch(() => {});
        });
      // .catch(error => {
      //   this.isDisabled = false
      //   this.$refs.loginForm.setErrors(error.response.data.errors)
      // })
    },
    nodeRemoveCommonMessage(node) {
      var msg = "";
      if (node.type == -1) {
        msg = "Please confirm that you want to delete this Root node";
      } else {
        let action = "";
        if (Number.isInteger(node.type)) {
          action = `On Press ${node.type}`;
        } else {
          action = `On ${node.type}`;
        }
        return (msg = `Please confirm that you want to delete ${node.data.title} node on ${action}`);
      }
    },
    filterChildRemoveMessage(node) {
      var msg = "";

      return (msg = `Please confirm that you want to delete Route ${node.priority} filters and their child nodes`);
    },
    remove(node) {
      console.log(node);
      let msg = "";
      if (node.node_type == "filter") {
        msg = this.filterChildRemoveMessage(node);
      } else {
        msg = this.nodeRemoveCommonMessage(node);
      }

      this.$bvModal
        .msgBoxConfirm(`${msg}.`, {
          title: "Please Confirm",
          size: "sm",
          okVariant: "primary",
          okTitle: "Yes",
          cancelTitle: "No",
          cancelVariant: "outline-secondary",
          hideHeaderClose: false,
          centered: true,
        })
        .then((value) => {
          if (value) {
            // if (node.node_type == "filter") {
            // } else {
            // get all child node
            const ids = this.generateChild(node.id);
            ids.push(node.id);
            this.getRouterFilterNode(ids);

            this.removeApiCall(node, ids);
            // }
            // return true;
          }
        });
    },
    getRouterFilterNode(ids) {
      // ids.filger(el => {
      // })
    },
    removeApiCall(node, ids) {
      this.$store
        .dispatch("ivrBuilder/removeNodes", {
          uuids: ids,
          parentId: node.parentId,
          ivrUuid: this.$store.state.ivrBuilder.ivrUuid,
        })
        .then(() => {
          this.$store.commit("ivrBuilder/CHECK_NODES_ERRORS");
          this.$store.commit("ivrBuilder/REMOVE_NODE", ids);
          // remove connection of parent node id
          this.$store.commit(
            "ivrBuilder/UPDATE_NODE_MISSING_CONNECTION_ERROR",
            {
              nodeId: node.parentId,
            }
          );
        });
    },
    generateChild(id) {
      const arr = this.$store.state.ivrBuilder.nodes;
      const nodes = arr.reduce((acc, val, ind, array) => {
        const childs = [];
        array.forEach((el, i) => {
          if (childs.includes(el.parentId) || el.parentId === val.id) {
            childs.push(el.id);
          }
        });
        return acc.concat({ ...val, childs });
      }, []);
      const index = nodes.findIndex((el) => {
        return el.id == id;
      });

      return nodes[index].childs;
    },
    gotoanynode(uuid) {
      document.getElementById(uuid).scrollIntoView();
      store.commit("ivrBuilder/UPDATE_BLINK_GOTO_RESOURCE_FROM_NODE", uuid);
    },
    getCurrencySign(currency) {
      if (currency == "Rs") {
        return "Rs";
      } else if (currency == "Dollar") {
        return "$";
      } else if (currency == "Dirham") {
        return "AED";
      } else if (currency == "Euro") {
        return "€";
      }
    },
    ivrInputValidate(event, limit = "") {
      //prevent enter zero on start
      if (event.target.value.length === 0 && event.key === "0") {
        event.preventDefault();
      }
      //prevent enter arithmetic operators
      if (/[\+\-\*\/]/.test(event.key)) {
        event.preventDefault();
      }
      //prevent enter on limit exceed
      if (event.target.value.length === limit) {
        if (event.keyCode != 8) {
          event.preventDefault();
        }
      }
    },
    ivrInputValidateText(event, limit = "") {
      //prevent enter arithmetic operators
      if (/[\+\-\*\/]/.test(event.key)) {
        event.preventDefault();
      }
      //Prevent enter rather then english
      if (!/^[A-Za-z0-9\s]+$/.test(event.key)) {
        event.preventDefault();
      }
      //prevent enter on limit exceed
      if (event.target.value.length === limit) {
        if (event.keyCode != 8) {
          event.preventDefault();
        }
      }
    },
  },
};

export const _ = null;
