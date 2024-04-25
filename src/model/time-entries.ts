import { TimeEntry } from "./time-entry";

// This is the model for the response from the Redmine API
export interface TimeEntries {
  time_entries: TimeEntry[];
}
