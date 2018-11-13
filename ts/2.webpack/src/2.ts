interface downLoadFace {
  url: string;
  isFirst?: boolean;
}

class Down implements downLoadFace {
  public url: string;
  public isFirst: boolean;
  private isVip:boolean = false;

  constructor(url: string, isFirst: boolean = false) {
    this.url = url;
    this.isFirst = isFirst
  }
}

export = Down