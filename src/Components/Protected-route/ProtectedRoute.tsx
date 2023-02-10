import { useContext, FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../Providers/Auth";

type Props = {
  children: ReactNode;
};
export const ProtectedRoute: FC<Props> = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    <Navigate to="/login" replace={true} />;
  }
  return <>{children}</>;
};
