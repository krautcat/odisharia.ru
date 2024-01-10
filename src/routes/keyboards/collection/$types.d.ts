import Keyboard from "$lib/types/api/keyboards";

export type LoadResponse = {
  total: number;
  per_page: number;
  items_on_page: number;
  items: Keyboard[];
}
