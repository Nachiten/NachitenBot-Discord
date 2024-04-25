import { IdNameModal } from "./id-name-modal";
import { IdModal } from "./id-modal";

export interface TimeEntry {
  id: number;
  project: IdNameModal;
  issue: IdModal;
  user: IdNameModal;
  activity: IdNameModal;
  hours: number;
  comments: string;
  spent_on: string;
  created_on: string;
  updated_on: string;
}
