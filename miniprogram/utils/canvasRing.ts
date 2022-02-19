export class CanvasRing {
  id: string;
  pies: Array<{ id: string; value: number; color: string; }>;
  ctx: WechatMiniprogram.CanvasContext;

  constructor(id: string, pies: Array<{ id: string; value: number; color: string; }>) {
    this.id = id;
    this.pies = pies;
    this.ctx = wx.createCanvasContext(id);
  }

  /** 绘制圆形进度条方法 弧度：θ=nπ/180 或者 a=l/r（半径是：r，弧长是：l）
   *  x: number, 圆心的 x 坐标
   *  y: number, 圆心的 y 坐标
   *  radius: number, 圆心的 半径
   *  radianstart: number, 起始弧度，单位弧度（在3点钟方向）
   *  radianend: number, 终止弧度
   */
  run(x: number, y: number, radius: number, radianstart: number, radianend: number, color?: string, lineWidth?: number) {
    const _color = color || "#ff5000";
    const _lineWidth = lineWidth || 20;

    //每个间隔绘制的弧度
    this.ctx.arc(x, y, radius - _lineWidth, radianstart, radianend);
    this.ctx.setStrokeStyle(_color);
    this.ctx.setLineWidth(_lineWidth);
    this.ctx.setLineCap("butt");
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.setFillStyle(_color);
    this.ctx.save();
  }

  canvasTap(x: number, y: number, radius: number) {
    const that = this;
    // 此处求起止弧度
    let radianstart = 0;
    let radianend = 0;
    this.pies.forEach((item, index) => {
      const arclength = (item.value / 100 * 360) * Math.PI * (radius / 180)
      if (index === 0) {
        radianend = arclength / radius;
        that.run(x, y, radius, radianstart, radianend, item.color);
      } else {
        radianstart = radianend;
        radianend = radianstart + arclength / radius;
        this.ctx.restore();
        that.run(x, y, radius, radianstart, radianend, item.color);
      }
    })
    this.ctx.draw();
  }

  /**
   * id canvas画板id
   * percent 进度条百分比
   * time 画图动画执行的时间
   */
  draw() {
    const that = this;
    // const time = animTime / end;
    // 监听canvas的宽高
    wx.createSelectorQuery().select('#' + this.id).boundingClientRect(function (rect) {
      const center = { x: 0, y: 0 }
      // 获取canvas宽的的一半
      center.x = rect.width / 2;
      // 获取canvas高的一半
      center.y = rect.height / 2;

      // 半径
      const radius = center.x;

      that.canvasTap(center.x, center.y, radius);
    }).exec();
  }
}
