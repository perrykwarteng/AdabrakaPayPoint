import { ReactNode } from "react";

export const Layouts = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>
      <p>Head</p>
      {children}
      <p>Footer</p>
    </div>
  );
};
