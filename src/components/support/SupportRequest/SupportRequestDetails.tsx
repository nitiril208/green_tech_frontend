import { cn } from "@/lib/utils";
import { DataAnalytics } from "@/types/SupportRequest";
import SupportMetric from "./SupportMetric";

interface SupportRequestDetailsProps {
  data?: DataAnalytics;
}

const SupportRequestDetails = ({ data }: SupportRequestDetailsProps) => {
  return (
    <div
      className={cn(
        `w-full grid xl:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5`
      )}
    >
      <SupportMetric
        label="Total Tickets"
        value={data?.totalTickets}
        iconName="totalTickets"
      />
      <SupportMetric
        label="Responded"
        value={data?.responded}
        iconName="responded"
      />
      <SupportMetric
        label="Resolved"
        value={data?.resolved}
        iconName="resolved"
      />
      <SupportMetric label="Pending" value={data?.pending} iconName="pending" />
    </div>
  );
};

export default SupportRequestDetails;
