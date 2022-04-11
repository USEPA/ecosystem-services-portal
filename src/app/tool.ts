export interface Tool {
  id: number;
  name: string;
  short_name: string;
  slug: string;
  description: string;
  url: string;
  image_file: string;
  related_steps: string[];
  detail: string[];
  matching_step_name: string;
  matching_task_id: number;
}
