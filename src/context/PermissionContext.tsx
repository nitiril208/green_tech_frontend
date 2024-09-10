/* eslint-disable react-hooks/exhaustive-deps */
import { inviteSingleEmployeeDetail } from "@/services/apiServices/employee";
import { getTrainerById } from "@/services/apiServices/trainer";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PermissionContext = React.createContext({
  permissions: {
    createCourse: false,
    updateCourse: false,
    certificate: false,
  },
  empPermissions: {
    editActionItem: false,
    retakeSelfAssessment: false,
    shareFeedback: false,
  },
});
let reCall = true;
let reEmpCall = true;

export const PermissionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userData = JSON.parse(localStorage.getItem("user") as string);
  const location = useLocation();
  const [permissions, setPermissions] = React.useState({
    createCourse: false,
    updateCourse: false,
    certificate: false,
  });
  const [empPermissions, setEmpPermissions] = React.useState({
    editActionItem: false,
    retakeSelfAssessment: false,
    shareFeedback: false,
  });

  const handleEmpPermission = async () => {
    const data = await inviteSingleEmployeeDetail(userData?.query?.detailsid);

    if (data) {
      setEmpPermissions({
        editActionItem: data?.editActionItem,
        retakeSelfAssessment: data?.retakeSelfAssessment,
        shareFeedback: data?.shareFeedback,
      });
    }
    reEmpCall = false;
  };

  const handlePermission = async () => {
    const data = await getTrainerById({ id: userData?.query?.detailsid });
    if (data) {
      setPermissions({
        createCourse: data?.data?.approved,
        updateCourse: data?.data?.editCourses,
        certificate: data?.data?.assignCertificate,
      });
    }
    reCall = false;
  };

  useEffect(() => {
    if (
      ["maturityAssessment", "mycourses"].includes(
        location.pathname?.split("/").pop() || ""
      )
    ) {
      reEmpCall = true;
    }
  }, [location]);

  useEffect(() => {
    if (
      [
        "allcourse",
        "mycourses",
        "allocated-certificate",
        "certificate-template",
        "enrolledcourses",
      ].includes(location.pathname?.split("/").pop() || "")
    ) {
      reCall = true;
    }
  }, [location]);

  useEffect(() => {
    if (reCall && userData?.query?.role === "3") {
      handlePermission();
    }
  }, [reCall, userData]);

  useEffect(() => {
    if (reEmpCall && userData?.query?.role === "4") {
      handleEmpPermission();
    }
  }, [reEmpCall, userData]);

  return (
    <PermissionContext.Provider value={{ permissions, empPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
};
