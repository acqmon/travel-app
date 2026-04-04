"use client";

import { useState } from "react";
import { ButtonView, CardView, InputView, SelectView } from "@/app/components";

export default function CustomerActivities() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("ALL");

  const categories = [
    { label: "All Categories", value: "ALL" },
    { label: "Water Sports", value: "WATER_SPORTS" },
    { label: "Sightseeing", value: "SIGHTSEEING" },
    { label: "Adventure", value: "ADVENTURE" },
  ];

  //  Dummy data
  const activities = [
    {
      id: "1",
      name: "Scuba Diving",
      description:
        "Explore the amazing underwater world and discover unique marine life.",
      category: "Water Sports",
      price: "3000",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400",
    },
    {
      id: "2",
      name: "City Tour",
      description:
        "Experience the history and culture of the city with our expert guides.",
      category: "Sightseeing",
      price: "1500",
      image:
        "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=400",
    },
    {
      id: "3",
      name: "Mountain Trek",
      description:
        "Enjoy a thrilling hike through scenic trails and breathtaking views.",
      category: "Adventure",
      price: "2500",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400",
    },
    {
      id: "4",
      name: "Paragliding",
      description:
        "Soar through the skies and witness the landscape from a bird's eye view.",
      category: "Adventure",
      price: "4500",
      image:
        "https://switzerland-tour.com/storage/media/the-swiss-capital-bern-paragliding-in-the-bernese-oberland-s-interlaken/bird-s-eye-view-of-swiss-nature-and-mountains.webp",
    },
    {
      id: "5",
      name: "River Rafting",
      description: "Conquer the rapids and experience the rush of adrenaline.",
      category: "Water Sports",
      price: "2000",
      image:
        "https://kalitide.com/wp-content/uploads/2020/07/Rafting-1024x682-1_joex8u.jpg",
    },
  ];

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      category === "ALL" ||
      activity.category.toUpperCase().replace(" ", "_") === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full flex flex-col gap-6 ">
      {/*  Hero/Search Section */}
      <div className="bg-primary p-12 rounded-2xl  shadow-lg flex flex-col items-center gap-6">
        <div className="text-center text-white">
          <h2 className="text-4xl font-extrabold mb-2">
            Find Your Next Adventure
          </h2>
          <p className="text-secondary text-lg opacity-90">
            Discover and book the best experiences curated for you.
          </p>
        </div>

        <div className="w-full max-w-4xl bg-white p-2 rounded-xl flex flex-col items-center md:flex-row gap-2 shadow-xl border border-white/20">
          <div className="flex-1">
            <InputView title="Search" required={false} />
          </div>
          <div className="w-full md:w-64">
            <SelectView title="Category" required={false} />
          </div>
          <ButtonView title="Search" className="px-8" />
        </div>
      </div>

      {/*  Activities Grid */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-clr-dark">
          {category === "ALL"
            ? "Popular Activities"
            : `${category.replace("_", " ")} Activities`}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredActivities.map((activity) => (
            <CardView
              key={activity.id}
              title={activity.name}
              description={activity.description}
              image={activity.image}
              size="full"
              className="!items-start !text-left hover:scale-[1.02] transition-transform duration-200 cursor-pointer overflow-hidden border border-border-light group"
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

        {filteredActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-clr-medium gap-4">
            <p className="text-lg">No activities found matching your search.</p>
            <ButtonView
              title="Browse All"
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
