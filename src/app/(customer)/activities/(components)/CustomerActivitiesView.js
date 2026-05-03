"use client";

import { ButtonView, CardView, InputView, SelectView } from "@/app/components";

export default function CustomerActivitiesView({
  isLoading,
  activities,

  searchTerm,
  setSearchTerm,

  category,
  setCategory,
  categories,
}) {
  return (
    <div className="w-full flex flex-col gap-6">
      {/* Hero */}
      <div className="bg-primary p-12 rounded-2xl shadow-lg flex flex-col items-center gap-6">
        <div className="text-center text-white">
          <h2 className="text-4xl font-extrabold mb-2">
            Find Your Next Adventure
          </h2>
          <p className="text-secondary text-lg opacity-90">
            Discover and book the best experiences curated for you.
          </p>
        </div>

        {/* Search */}
        <div className="w-full max-w-4xl bg-white p-2 rounded-xl flex flex-col md:flex-row gap-2 shadow-xl">
          <div className="flex-1">
            <InputView
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="w-full md:w-64">
            <SelectView
              options={categories}
              value={category}
              onChange={(val) => setCategory(val)}
            />
          </div>

          <ButtonView title="Search" />
        </div>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-clr-dark">
          {category === "ALL"
            ? "Popular Activities"
            : `${category.replace(/_/g, " ")} Activities`}
        </h3>

        {isLoading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activities.map((activity) => (
              <CardView
                key={activity.id}
                title={activity.name}
                description={activity.description}
                image={activity.image}
                size="full"
                className="!items-start !text-left hover:scale-[1.02] transition cursor-pointer overflow-hidden"
              >
                <div className="w-full flex flex-col gap-3 mt-auto">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-sm font-medium text-primary px-2 py-1 bg-blue-50 rounded">
                      {activity.category}
                    </span>

                    <span className="text-2xl font-bold text-accent">
                      ₹{activity.price}
                    </span>
                  </div>

                  <ButtonView title="Book Now" fullWidth />
                </div>
              </CardView>
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && activities.length === 0 && (
          <div className="flex flex-col items-center py-20 gap-4">
            <p>No activities found.</p>
            <ButtonView
              title="Reset"
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setCategory("ALL");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
