import ClassicLightTemplate from "./ClassicLightTemplate";
import ClassicDarkTemplate from "./ClassicDarkTemplate";

export const TEMPLATES = {
  "classic-light": {
    id: "classic-light",
    label: "Clásica Luminosa",
    defaultColor: "#c6a664",
    Component: ClassicLightTemplate,
  },
  "classic-dark": {
    id: "classic-dark",
    label: "Clásica Oscura",
    defaultColor: "#d4af37",
    Component: ClassicDarkTemplate,
  },
};

export const TEMPLATE_LIST = Object.values(TEMPLATES);
