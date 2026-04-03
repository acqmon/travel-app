import { ButtonView } from "@/app/components";

const AdminDashboard = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Total Users</p>
          <h3 className="text-xl font-bold">120</h3>
        </div>

        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Partners</p>
          <h3 className="text-xl font-bold">45</h3>
        </div>

        <div className="p-4 border border-clr-light rounded-lg bg-white shadow-base">
          <p className="text-sm text-clr-medium">Pending Approvals</p>
          <h3 className="text-xl font-bold text-accent">8</h3>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">Quick Actions</h3>

        <ButtonView title="View All Users" size="full" />
        <ButtonView title="Manage Partners" size="full" />
        <ButtonView title="Approve Businesses" size="full" />
      </div>
    </div>
  );
};

export default AdminDashboard;
