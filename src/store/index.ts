import { createStore } from "vuex";

import FooterImpl, { footerActions, footerGetters } from "./footer";
import HeaderImpl, { headerActions, headerGetters } from "./header";
import { FooterState, HeaderState, State } from "./interface";

const store = createStore<State>({
  state: {
    upIndex: "",
    activeIndex: "",
    isShowFooter: true,
    headerState: new HeaderImpl(true),
    footerState: new FooterImpl(true),
  },
  getters: {
    getActInd: (state: State) => (isUp: boolean) => {
      return isUp ? state.upIndex + "-" + state.activeIndex : state.activeIndex;
    },
    ...headerGetters,
    ...footerGetters,
  },
  actions: {
    ...headerActions,
    ...footerActions,
  },
  mutations: {
    changeFooterShow(state: State, value: boolean) {
      state.isShowFooter = value;
    },
    setHeaderState(state: State, headerState: HeaderState) {
      state.headerState = Object.assign({}, state.headerState, headerState);
    },

    setFooterState(state: State, footerState: FooterState) {
      state.footerState = Object.assign({}, state.footerState, footerState);
    },

    changeActInd(state: State, index: string) {
      state.activeIndex = index;
    },
    changeUpInd(state: State, upIndex: string) {
      state.upIndex = upIndex;
    },
  },
});

export default store;
