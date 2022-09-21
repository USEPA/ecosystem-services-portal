import {Path} from "./path";

export interface Step {
  id: number;
  name: string;
  path: Path;
  rationale: string;
  color: string;
  checked: boolean;
}
