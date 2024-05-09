import { useEffect, useState } from "react";
import { clone, get } from "@/util";
import { IComponent } from "../types";
export const useField = function <T, S, CC extends Record<string, unknown>>(
  $comp: IComponent<S, CC>,
  key: string
) {
  const [field, setField] = useState(
    clone(get<T>($comp.raw as Record<string, unknown>, key))
  );
  useEffect(
    () =>
      $comp.watch(key, () => {
        setField(clone(get<T>($comp.raw as Record<string, unknown>, key)));
      }),
    []
  );
  return field;
};
