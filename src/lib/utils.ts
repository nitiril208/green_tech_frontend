import ResponseTicketIcon from "@/assets/images/message.png";
import modulePdfFile from "@/assets/images/pdf-file.png";
import RequestTicketIcon from "@/assets/images/Request.png";
import ResolvedIcon from "@/assets/images/Resolved.png";
import TotalTicketIcon from "@/assets/images/ticket.png";
import PendingTicketIcon from "@/assets/images/ticket_star.png";
import xlsxFileIcon from "@/assets/images/upload_option_2.png";
import ModuleVideoPlay from "@/assets/images/video-play.png";
import wordFile from "@/assets/images/word_file.png";
import InfoIcon from "@/assets/svgs/infoIcon.svg";
import { UserRole } from "@/types/UserRole";
import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { AiOutlinePoweroff } from "react-icons/ai";
import { BsTicketPerforated } from "react-icons/bs";
import { FaUserGroup } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { GrCertificate } from "react-icons/gr";
import { LuMapPin } from "react-icons/lu";
import { PiEnvelopeThin } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TfiBook } from "react-icons/tfi";
import { twMerge } from "tailwind-merge";
import Economic from "../assets/images/Economic.svg";
import Environmental from "../assets/images/Environmental.svg";
import Governance from "../assets/images/Governance.svg";
import GreenEconomic from "../assets/images/GreenEconomic.svg";
import GreenEnvironmental from "../assets/images/GreenEnvironmental.svg";
import GreenGovernance from "../assets/images/GreenGovernance.svg";
import GreenSocialGray from "../assets/images/GreenSocial.svg";
import GreenStrategicIntegrationGray from "../assets/images/GreenStratagic.svg";
import GreenTech from "../assets/images/GreenTech.svg";
import SocialGray from "../assets/images/Social.svg";
import StrategicIntegrationGray from "../assets/images/Stratagic.svg";
import Tech from "../assets/images/Tech.svg";
import { FileType, youtubeRegex } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getImages = (name: string, active?: boolean) => {
  switch (name) {
    case "Social":
      return active ? GreenSocialGray : SocialGray;
    case "Technology & Innovation":
      return active ? GreenTech : Tech;
    case "Economics":
      return active ? GreenEconomic : Economic;
    case "Economic":
      return active ? GreenEconomic : Economic;
    case "Governance":
      return active ? GreenGovernance : Governance;
    case "Enviromental":
      return active ? GreenEnvironmental : Environmental;
    case "Strategic Intergration":
      return active ? GreenStrategicIntegrationGray : StrategicIntegrationGray;
    case "Strategic Integration":
      return active ? GreenStrategicIntegrationGray : StrategicIntegrationGray;
    default:
      return active ? GreenEnvironmental : Environmental;
  }
};

export const supportTicketIcon = (name: string) => {
  switch (name) {
    case "myrequests":
      return RequestTicketIcon;
    case "resolved":
      return ResolvedIcon;
    case "pending":
      return PendingTicketIcon;
    case "totalTickets":
      return TotalTicketIcon;
    case "responded":
      return ResponseTicketIcon;
    default:
      return TotalTicketIcon;
  }
};

export const sidebarLayout = {
  TarinerSidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/trainer/dashboard",
      children: [],
    },
    {
      label: "Course Management",
      Icon: TfiBook,
      link: "#",
      children: [
        {
          label: "Enrollment Requests",
          link: "/trainer/enrolledrequest",
        },
        {
          label: "Enrolled Courses",
          link: "/trainer/enrolledcourses",
        },
        {
          label: "All Courses",
          link: "/trainer/allcourse",
        },
        {
          label: "Live Sessions",
          link: "/trainer/CourseLiveSession",
        },
      ],
    },
    {
      label: "Trainer  Management",
      Icon: FaUserGroup,
      link: "/trainer/trainer-management",
      children: [],
    },
    {
      label: "Certificate Management",
      Icon: LuMapPin,
      link: "#",
      children: [
        {
          label: "Certificate Template",
          link: "/trainer/certificate-template",
        },
        {
          label: "Issued Certificate",
          link: "/trainer/allocated-certificate",
        },
      ],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQ's",
          link: "/trainer/support-faqslist",
        },
        {
          label: "Training Document",
          link: "/trainer/support-training-documnet",
        },
        {
          label: "Support Request",
          link: "/trainer/support-request",
        },
      ],
    },
    {
      label: "Setting",
      Icon: FiSettings,
      link: "/trainer/setting",
      children: [],
    },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/trainer/message",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
  TarineeSidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/trainee/dashboard",
      children: [],
    },
    {
      label: "Course Management",
      Icon: TfiBook,
      link: "#",
      children: [
        // {
        //   label: "Enrollment Requests",
        //   link: "/trainee/enrolledrequest",
        // },
        {
          label: "All Courses",
          link: "/trainee/allcourse",
        },
        {
          label: "My Courses",
          link: "/trainee/mycourses",
        },
        {
          label: "Enrolled Courses",
          link: "/trainee/enrolledcourses",
        },
        {
          label: "Live Sessions",
          link: "/trainee/CourseLiveSession",
        },
      ],
    },
    {
      label: "Certificate Management",
      Icon: LuMapPin,
      link: "#",
      children: [
        {
          label: "Certificate Template",
          link: "/trainee/certificate-template",
        },
        {
          label: "Allocated Certificate",
          link: "/trainee/allocated-certificate",
        },
      ],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQ's",
          link: "/trainee/support-faqslist",
        },
        {
          label: "User Manual",
          link: "/trainee/usermenual",
        },
        {
          label: "Support Request",
          link: "/trainee/support-request",
        },
      ],
    },
    // {
    //   label: "Settings",
    //   Icon: FiSettings,
    //   link: "/trainee/employeepermission",
    //   children: [],
    // },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/trainee/message",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
  companySidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/company/dashboard",
      children: [],
    },
    {
      label: "Our Sustainability Journey",
      Icon: LuMapPin,
      link: "/company/maturityAssessment",
      children: [],
    },
    {
      label: "Course Management",
      Icon: TfiBook,
      link: "#",
      children: [
        {
          label: "Enrolled Courses",
          link: "/company/allocatedcourses",
        },
        {
          label: "Recommended Courses",
          link: "/company/coursesrecommended",
        },
        {
          label: "All Courses",
          link: "/company/allcourses",
        },
      ],
    },
    {
      label: "Team Management",
      Icon: FaUserGroup,
      link: "#",
      children: [
        {
          label: "Team List",
          link: "/company/employeelist",
        },
        {
          label: "Team Progress",
          link: "/company/teamProgress",
        },
      ],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQs",
          link: "/company/faqslist",
        },
        {
          label: "User Manual",
          link: "/company/trainingdocument",
        },
        {
          label: "Support Tickets",
          link: "/company/support-request",
        },
      ],
    },
    {
      label: "Settings",
      Icon: FiSettings,
      link: "/company/employeepermission",
      children: [],
    },
    {
      label: "Message",
      Icon: PiEnvelopeThin,
      link: "/company/message",
      children: [],
    },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
  companyEmployeeSidebar: [
    {
      label: "Dashboard",
      Icon: RxDashboard,
      link: "/employee/dashboard",
      children: [],
    },
    {
      label: "My Courses",
      Icon: TfiBook,
      link: "/employee/mycourses",
      children: [],
    },
    {
      label: "Our Sustainability Journey",
      Icon: LuMapPin,
      link: "/employee/maturityAssessment",
      children: [],
    },
    {
      label: "Certifications",
      Icon: GrCertificate,
      link: "/employee/certifications",
      children: [],
    },
    {
      label: "Support",
      Icon: BsTicketPerforated,
      link: "#",
      children: [
        {
          label: "FAQs",
          link: "/employee/faqslist",
        },
        {
          label: "User Manual",
          link: "/employee/usermenual",
        },
        {
          label: "Support Request",
          link: "/employee/support-request",
        },
      ],
    },
    // {
    //   label: "Message",
    //   Icon: PiEnvelopeThin,
    //   link: "/employee/message",
    //   children: [],
    // },
    {
      label: "Logout",
      Icon: AiOutlinePoweroff,
      link: "/auth",
      children: [],
    },
  ],
};
export const chatDPColor = (id: number) => {
  const colors = [
    "#0E9CFF",
    "#0077A2",
    "#64A70B",
    "#1FA8DC",
    "#FD9372",
    "#A81F58",
    "#58BA66",
    "#FFA25E",
    "#FF5252",
    "#606060",
  ];
  const colorIndex = id % colors.length;

  return colors[colorIndex];
};
export const TimeFormatter = (dateTime: Date | string) => {
  const today = moment().startOf("day");

  const date = moment(dateTime);

  let formattedTime;

  if (date.isSame(today, "day")) {
    formattedTime = date.format("h:mmA");
  } else if (date.isBefore(today, "day")) {
    formattedTime = date.format("D MMM");
  } else {
    formattedTime = date.format("h:mmA");
  }
  return formattedTime;
};

export const TimesFormatter = (dateTime: Date | string) => {
  const date = moment(dateTime);

  const formattedTime = date.format("h:mm A");
  return formattedTime;
};

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const handleScrollToBottom = (
  containerRef: React.MutableRefObject<any>
) => {
  const element = containerRef.current;
  const duration = 500;
  const start = element.scrollTop;
  const end = element.scrollHeight - element.clientHeight;
  const startTime = performance.now();

  const animateScroll = (currentTime: any) => {
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(1, elapsedTime / duration);
    const easedProgress = easeInOutQuad(scrollProgress);
    const scrollTop = start + (end - start) * easedProgress;

    element.scrollTop = scrollTop;

    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  };

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

  requestAnimationFrame(animateScroll);
};

export const getFileType = (name: number) => {
  const fileType = Object.values(FileType).find((type) => type.enum === name);
  return fileType;
};

export function mapTimeDuration(timeDuration: string) {
  const [hours, minutes] = timeDuration.split(":").map(Number);

  if (
    hours !== 0 &&
    minutes !== 0 &&
    hours !== undefined &&
    minutes !== undefined
  ) {
    return `${hours}h ${minutes}min`;
  } else if (hours !== 0) {
    return `${hours}h`;
  } else if (minutes !== 0 && minutes !== undefined) {
    return `${minutes}min`;
  } else {
    return `0sec`;
  }
}

export const calculateTotalReadingTime = (sections: any) => {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;
  console.log("sectionssections", sections);

  sections.forEach((section: any) => {
    const time = section.readingTime;
    console.log("timetimetime", time, section.isLive || section.isLive === 0);

    const assessmentTime =
      section?.module?.assessment?.length > 0 &&
      section?.module?.assessment?.[0]?.timeDuration;
    totalHours += time?.hour || assessmentTime?.hours + time?.hour || 0;
    totalMinutes += time?.minute || assessmentTime?.minutes + time?.minute || 0;
    totalSeconds += time?.second || assessmentTime?.seconds + time?.second || 0;
  });
  console.log("sectionssections", totalHours, totalMinutes, totalSeconds);

  // Convert total seconds to minutes and hours if necessary
  totalMinutes += Math.floor(totalSeconds / 60);
  totalSeconds = totalSeconds % 60;

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  // Format the result as a string
  let result = "";
  if (totalHours > 0) {
    result += `${totalHours}hr `;
  }
  if (totalMinutes > 0) {
    result += `${totalMinutes}min `;
  }
  if (totalSeconds > 0 || (totalHours === 0 && totalMinutes === 0)) {
    result += `${totalSeconds}sec`;
  }

  return result.trim();
};

export const getExtension = (filename: string) => {
  return filename && filename?.split(".")?.at(-1)?.toLowerCase();
};

export const fileValidation = (
  filename: string,
  allowedFileTypes: string[] | undefined
) => {
  const fileExtension = getExtension(filename);
  if (
    allowedFileTypes &&
    fileExtension &&
    allowedFileTypes.includes(fileExtension)
  ) {
    return true;
  } else {
    return false;
  }
};

export const getRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getTotalDuration = (data: any) => {
  return data?.reduce((totalSeconds: any, readingTime: any) => {
    return readingTime?.hour >= 0 &&
      readingTime?.minute >= 0 &&
      readingTime?.second >= 0
      ? totalSeconds +
      +readingTime?.hour * 3600 +
      +readingTime?.minute * 60 +
      +readingTime?.second
      : +totalSeconds +
      +readingTime?.hours * 3600 +
      +readingTime?.minutes * 60 +
      +readingTime?.seconds;
  }, 0);
};

export function getTimeAgo(time: Date | string) {
  const currentTime = new Date();
  const givenTime = time instanceof Date ? time : new Date(time);

  const timeDiff: number = Math.abs(
    currentTime.valueOf() - givenTime.valueOf()
  );

  const minutesAgo = Math.floor(timeDiff / (1000 * 60));
  const hoursAgo = Math.floor(timeDiff / (1000 * 60 * 60));
  const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const weeksAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));

  if (minutesAgo < 1) {
    return "Just now";
  } else if (minutesAgo < 60) {
    return `${minutesAgo} min${minutesAgo === 1 ? "" : "s"} ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hr${hoursAgo === 1 ? "" : "s"} ago`;
  } else if (daysAgo < 7) {
    return `${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
  } else {
    return `${weeksAgo} week${weeksAgo === 1 ? "" : "s"} ago`;
  }
}

export const fetchMessageRoles = (role: number) => {
  let MessageRoles: any = [];
  if (role === UserRole.Trainer) {
    MessageRoles = ["client", "employee", "company", "trainer"];
  } else if (role === UserRole.Company) {
    MessageRoles = ["client", "employee", "trainer", "trainer Company"];
  } else if (role === UserRole.Trainee) {
    MessageRoles = ["client", "employee", "company"];
  } else if (role === UserRole.Employee) {
    MessageRoles = ["company", "trainer", "trainer Company"];
  }
  return MessageRoles;
};

export const documentType = (type: string) => {
  if (type?.split("/")?.[3]?.includes("pdf")) {
    return "pdf";
  } else if (
    type?.split("/")?.[3]?.includes("mp4") ||
    type === "url" ||
    youtubeRegex.test(type)
  ) {
    return "mp4";
  } else if (type?.split("/")?.[3]?.includes("xlsx")) {
    return "xlsx";
  } else if (type?.split("/")?.[3]?.includes("doc")) {
    return "doc";
  } else if (type?.includes("www.youtube.com")) {
    return "video";
  }
};

export const documentIcon = (type: string) => {
  if (type?.split("/")?.[3]?.includes("pdf")) {
    return modulePdfFile;
  } else if (type?.split("/")?.[3]?.includes("mp4") || type === "url") {
    return ModuleVideoPlay;
  } else if (type?.split("/")?.[3]?.includes("xlsx")) {
    return xlsxFileIcon;
  } else if (type?.split("/")?.[3]?.includes("doc")) {
    return wordFile;
  } else {
    return InfoIcon;
  }
};

export const isSessionOngoingAtTime = (
  date: string,
  startTime: string,
  sessionDuration: number
): boolean => {
  const targetDate = moment();
  const sessionStart = moment(`${date} ${startTime}`, "YYYY-MM-DD hh:mm A");
  const sessionEnd = sessionStart.clone().add(sessionDuration, "minutes");
  return targetDate.isBetween(sessionStart, sessionEnd, null, "[)");
};

export const calculateEndTime = (
  startTime: string,
  sessionDuration: string
) => {
  const [time, period] = startTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const startDate = new Date();

  let startHours = hours;
  if (period?.toUpperCase() === "PM" && hours !== 12) {
    startHours = hours + 12;
  } else if (period?.toUpperCase() === "AM" && hours === 12) {
    startHours = 0;
  }

  startDate.setHours(startHours);
  startDate.setMinutes(minutes);
  startDate.setSeconds(0);
  startDate.setMilliseconds(0);
  const durationInMinutes = Number(sessionDuration);
  const endDate = new Date(startDate.getTime() + durationInMinutes * 60000);

  const endHours = endDate.getHours();
  const endMinutes = endDate.getMinutes();
  const endPeriod = endHours >= 12 ? "PM" : "AM";
  const formattedHours = endHours % 12 || 12;
  const formattedMinutes = endMinutes.toString().padStart(2, "0");

  return `${formattedHours}:${formattedMinutes} ${endPeriod}`;
};

export function objectsAreEqual(obj1: any, obj2: any) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function arraysAreEqual(arr1: any, arr2: any) {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    if (!objectsAreEqual(arr1[i], arr2[i])) return false;
  }

  return true;
}

export const IstDate = (time: Date | string) => {
  // Parse the input as a Date object
  const timeUTC = new Date(time);

  // Check if the date is valid
  if (isNaN(timeUTC.getTime())) {
    throw new Error("Invalid date provided");
  }

  // Convert the input time to UTC by removing the timezone offset
  const utcTime = new Date(
    timeUTC.getTime() + timeUTC.getTimezoneOffset() * 60000
  );

  // Format the date to IST
  const formattedTime = utcTime.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedTime;
};
