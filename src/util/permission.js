import store from "../store/index.js";

export function hasPermission(permission) {
    // console.log(store);
    let btns = store.store.getters.permissList;
    // console.log(typeof (btns));
    // console.log(btns.split(","));
    return btns.split(",").indexOf(permission) > -1;
}