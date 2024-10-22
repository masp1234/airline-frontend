import { ReactNode } from "react";
interface Props {
    children: ReactNode;
  }
const Container = ({ children }: Props) => {
  return (
    <div>
      {children}
    </div>
  )
}

export default Container
