import {Tool} from "./tool";
import {Step} from "./step";

export class Task {
  id: number;
  name: string;
  step: Step;
  tools: Tool[];
  checked: boolean;
}
