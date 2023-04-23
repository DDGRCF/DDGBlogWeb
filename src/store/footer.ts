import { ActionContext, ActionTree, GetterTree } from "vuex";

import { FooterState, State } from "./interface";

class FooterImpl implements FooterState {
  _isShow = true;

  constructor(isShow: boolean) {
    this._isShow = isShow;
  }

  get isShow() {
    return this._isShow;
  }

  set isShow(value: boolean) {
    this._isShow = value;
  }
}

export const footerActions: ActionTree<State, State> = {
  changeFooterShow(
    { state, commit }: ActionContext<State, State>,
    value: boolean
  ) {
    const footerState = new FooterImpl(value);
    commit("setFooterState", footerState);
  },
  toggleFooterShow({ state, commit }: ActionContext<State, State>) {
    const footerState = new FooterImpl(!state.headerState.isShow);
    commit("setFooterState", footerState);
  },
  // 其他footer相关的actions...
};

export const footerGetters: GetterTree<State, State> = {
  getFooterShowStatus(state: State) {
    return state.footerState.isShow;
  },
};

export default FooterImpl;
