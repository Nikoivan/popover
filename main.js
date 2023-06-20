/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/components/form.js

class FormWidget {
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
    this.activeTooltip = this.tooltipController.showTooltip({
      title: "Popover title",
      content: "And here's some amazing content. It's very engaging. Right?"
    }, this.btn);
  }
}
;// CONCATENATED MODULE: ./src/components/tooltip.js

class Tooltip {
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
    const {
      top,
      left
    } = element.getBoundingClientRect();
    tooltipEl.style.top = `${top - tooltipEl.offsetHeight - 15}px`;
    tooltipEl.style.left = `${left + element.offsetWidth / 2 - tooltipEl.offsetWidth / 2}px`;
    this.tooltips.push({
      id,
      element: tooltipEl
    });
    return id;
  }
  removeTooltip(id) {
    const tooltip = this.tooltips.find(el => el.id === id);
    tooltip.element.remove();
    this.tooltips.filter(el => el.id !== id);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const formWidget = new FormWidget("form", new Tooltip());
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;