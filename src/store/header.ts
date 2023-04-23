import { ActionContext, ActionTree, GetterTree } from "vuex";

import { HeaderState, State } from "./interface";

class HeaderImpl implements HeaderState {
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

export const headerActions: ActionTree<State, State> = {
  setHeaderShow(
    { state, commit }: ActionContext<State, State>,
    value: boolean
  ) {
    const headerState = new HeaderImpl(value);
    commit("changeHeaderState", headerState);
  },
  toggleHeaderShow({ state, commit }: ActionContext<State, State>) {
    const headerState = new HeaderImpl(!state.headerState.isShow);
    commit("toggleHeaderState", headerState);
  },
};

export const headerGetters: GetterTree<State, State> = {
  getHeaderShowStatus(state: State) {
    return state.headerState.isShow;
  },
};

export default HeaderImpl;
