import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPermission,
  selectToken,
  selectUser,
  setPermission,
} from "../slices/auth.slice";
import { useGetPermissionUserByIdQuery } from "../services/userPermission";
import { useEffect, useState } from "react";

const AuthGuard = ({
  allowedRoles,
  permissionUserRoles,
  permissionSyllabusRoles,
  permissionClassRoles,
  permissionProgramRoles,
  permissionLearningRoles,
  isLogin,
  tokenUser,
  userPerRole,
  children,
}) => {
  const token = useSelector(selectToken);
  const user = useSelector(selectUser);
  const location = useLocation();
  const userId = user?.id;

  const [loading, setLoading] = useState(true);
  const { data: permissionData, isLoading } =
    useGetPermissionUserByIdQuery(userId);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && permissionData) {
      dispatch(setPermission(permissionData));
      setLoading(false);
    }
  }, [dispatch, isLoading, permissionData]);
  const permission = useSelector(selectPermission);

  const userPer = permission?.userManagementPermission;
  const syllabusPer = permission?.syllabusPermission;
  const programPer = permission?.trainingProgramPermission;
  const learningPer = permission?.learningMaterialPermission;
  const classPer = permission?.classPermission;

  if (token && location.pathname === "/login") {
    return <Navigate to="/" />;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (!user || !user.roles) {
    return <Navigate to="/403" replace />;
  }

  if (allowedRoles && !allowedRoles.some((role) => user.roles.includes(role))) {
    return <Navigate to="/403" replace />;
  }
  //UserPermission
  if (
    permissionUserRoles &&
    !permissionUserRoles.some((per) => per === userPer)
  ) {
    return <Navigate to="/403" replace />;
  }
  //Class Permission
  if (
    permissionClassRoles &&
    !permissionClassRoles.some((per) => per === classPer)
  ) {
    return <Navigate to="/403" replace />;
  }
  //Syllabus Permission
  if (
    permissionSyllabusRoles &&
    !permissionSyllabusRoles.some((per) => per === syllabusPer)
  ) {
    return <Navigate to="/403" replace />;
  }
  // Training Program
  if (
    permissionProgramRoles &&
    !permissionProgramRoles.some((per) => per === programPer)
  ) {
    return <Navigate to="/403" replace />;
  }

  //Learning
  if (
    permissionLearningRoles &&
    !permissionLearningRoles.some((per) => per === learningPer)
  ) {
    return <Navigate to="/403" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
