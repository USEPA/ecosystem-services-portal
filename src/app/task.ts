import {Tool} from "./tool";
import {Step} from "./step";

export interface Task {
  id: number;
  name: string;
  step: Step;
  tools: Tool[];
  checked: boolean;
}
