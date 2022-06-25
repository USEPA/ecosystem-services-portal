import {Path} from "./path";

export class Step {

  id: number;
  name: string;
  path: Path;
  rationale: string;
  color: string;
  checked?: boolean;

  // constructor(id: number, name: string, path: Path, rationale: string, color: string) {
  //   this.id = id;
  //   this.name = name;
  //   this.path = path;
  //   this.rationale = rationale;
  //   this.color = color;
  // }

}
