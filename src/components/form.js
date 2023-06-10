import "../css/form.css";

export default class FormWidget {
  constructor(widgetSelector, tooltipController) {
    this.form = document.querySelector(`.${widgetSelector}`);
    this.elements = [...this.form.elements];
    this.tooltipController = tooltipController;
    this.btn = this.form.querySelector(".btn");

    this.onSubmit = this.onSubmit.bind(this);

    this.form.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.activeTooltip) {
      this.tooltipController.removeTooltip(this.activeTooltip);
      this.activeTooltip = null;
      return;
    }

    this.activeTooltip = this.tooltipController.showTooltip(
      {
        title: "Popover title",
        content: "And here's some amazing content. It's very engaging. Right?",
      },
      this.btn
    );
  }
}
