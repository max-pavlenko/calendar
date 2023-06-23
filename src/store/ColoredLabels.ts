import {makeAutoObservable} from 'mobx';
import {DEFAULT_LABEL_COLORS} from "@/constants/LabelColors";
import {ColoredLabel, ColoredLabelRecord} from "@/types/Labels";

class ColoredLabels {
   labelColors: ColoredLabelRecord = {};

   constructor() {
      makeAutoObservable(this);
      this.initializeLabelColors();
   }

   initializeLabelColors() {
      this.labelColors = Object.entries(DEFAULT_LABEL_COLORS).reduce((prev, [key, value]) => {
         return { ...prev, [crypto.randomUUID()]: { color: value, label: key } };
      }, {});
   }

   addColoredLabel(coloredLabel: ColoredLabel) {
      const id = crypto.randomUUID();
      this.labelColors[id] = coloredLabel;
   }

   removeColoredLabel(id: string) {
      delete this.labelColors[id];
   }

   editColoredLabel(id: string, coloredLabel: Partial<ColoredLabel>) {
      const labelToEdit = this.labelColors[id];
      this.labelColors[id] = { ...labelToEdit, ...coloredLabel };
   }

   get getLabelColors() {
      return this.labelColors;
   }

   set setLabelColors(newValues: typeof this.labelColors) {
      this.labelColors = newValues;
   }
}

export default new ColoredLabels();
