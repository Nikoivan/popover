import "../css/tooltip.css";

export default class Tooltip {
  constructor() {
    this.tooltips = [];
  }

  showTooltip(message, element) {
    const id = performance.now();

    const tooltipTitle = document.createElement("h3");
    tooltipTitle.textContent = message.title;
    tooltipTitle.classList.add("tooltip-title");

    const tooltipText = document.createElement("p");
    tooltipText.textContent = message.content;
    tooltipText.classList.add("tooltip-text");

    const tooltipEl = document.createElement("div");
    tooltipEl.classList.add("tooltip");

    tooltipEl.append(tooltipTitle);
    tooltipEl.append(tooltipText);

    document.body.append(tooltipEl);

    const { top, left } = element.getBoundingClientRect();

    tooltipEl.style.top = `${top - tooltipEl.offsetHeight - 15}px`;
    tooltipEl.style.left = `${
      left + element.offsetWidth / 2 - tooltipEl.offsetWidth / 2
    }px`;

    this.tooltips.push({ id, element: tooltipEl });

    return id;
  }

  removeTooltip(id) {
    const tooltip = this.tooltips.find((el) => el.id === id);

    tooltip.element.remove();

    this.tooltips.filter((el) => el.id !== id);
  }
}
