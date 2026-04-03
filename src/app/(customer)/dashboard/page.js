import { ButtonView } from "@/app/components";

const CustomerDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Total Bookings</p>
          <h3 className="text-xl font-bold">12</h3>
        </div>

        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Upcoming Bookings</p>
          <h3 className="text-xl font-bold text-secondary">3</h3>
        </div>

        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Completed Bookings</p>
          <h3 className="text-xl font-bold">9</h3>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Quick Actions</h3>

        <ButtonView title="Explore Services" size="full" />
        <ButtonView title="My Bookings" size="full" />
        <ButtonView title="Update Profile" size="full" />
      </div>
    </div>
  );
};

export default CustomerDashboard;
