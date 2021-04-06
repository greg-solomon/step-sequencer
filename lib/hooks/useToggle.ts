import React from "react";

export type ToggleHandlers = {
  on: () => void;
  off: () => void;
  toggle: () => void;
};
const useToggle = (initialState = false): [boolean, ToggleHandlers] => {
  const [toggle, set] = React.useState(initialState);

  const handlers = React.useMemo(
    () => ({
      on: () => {
        set(true);
      },
      off: () => {
        set(false);
      },
      toggle: () => {
        set(!toggle);
      },
    }),
    [toggle]
  );

  return [toggle, handlers];
};

export { useToggle };
