import { ButtonView } from "@/app/components";

const PartnerDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Total Bookings</p>
          <h3 className="text-xl font-bold">32</h3>
        </div>

        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Active Services</p>
          <h3 className="text-xl font-bold">5</h3>
        </div>

        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Total Earnings</p>
          <h3 className="text-xl font-bold text-secondary">₹12,500</h3>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Quick Actions</h3>

        <ButtonView title="Manage Business" size="full" />
        <ButtonView title="View Bookings" size="full" />
        <ButtonView title="Manage Services" size="full" />
      </div>
    </div>
  );
};

export default PartnerDashboard;
