export interface State {
  upIndex: string;
  activeIndex: string;
  isShowFooter: boolean;
  headerState: HeaderState;
  footerState: FooterState;
}

export interface HeaderState {
  _isShow: boolean;
  get isShow(): boolean;
  set isShow(value: boolean);
}

export interface FooterState {
  _isShow: boolean;
  get isShow(): boolean;
  set isShow(value: boolean);
}
