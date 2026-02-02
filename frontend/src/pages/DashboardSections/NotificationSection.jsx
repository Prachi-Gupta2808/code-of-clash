"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useState } from "react";

const friendRequests = [
  {
    from: "Divyanshi",
    avatar1:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
  },
  {
    from: "Ankur",
    avatar1:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
  },
  {
    from: "Riya",
    avatar1:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
  },
];

const challengeRequests = [
  {
    from: "Prachi",
    theme: "Binary Search",
    avatar1:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
  },
  {
    from: "Ankit",
    theme: "Dynamic Programming",
    avatar1:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
  },
  {
    from: "Neha",
    theme: "Graphs",
    avatar1:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
  },
];

const NotificationSection = () => {
  const [activeTab, setActiveTab] = useState("friends");

  const data = activeTab === "friends" ? friendRequests : challengeRequests;

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-12">
      {/* TOGGLE */}
      <div className="flex justify-center mb-8 gap-4">
        <button
          onClick={() => setActiveTab("friends")}
          className={`px-6 py-2 rounded-xl font-semibold transition-all
            ${
              activeTab === "friends"
                ? "bg-(--c4) text-white"
                : "border border-(--c4) text-(--c4)"
            }`}
        >
          Friend Requests
        </button>

        <button
          onClick={() => setActiveTab("challenges")}
          className={`px-6 py-2 rounded-xl font-semibold transition-all
            ${
              activeTab === "challenges"
                ? "bg-(--c4) text-white"
                : "border border-(--c4) text-(--c4)"
            }`}
        >
          Challenge Requests
        </button>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <CardContainer key={index} className="w-full">
            <CardBody
              className="
                bg-gray-50 dark:bg-black
                border border-black/[0.1] dark:border-white/[0.15]
                rounded-xl p-6
                w-full h-full
              "
            >
              {/* AVATARS — CENTERED & BIG */}
              <CardItem translateZ={80} className="mt-6">
                <div className="flex justify-center">
                  <div className="relative w-[96px] h-[48px]">
                    <img
                      src={item.avatar1}
                      alt=""
                      className="
                        w-14 h-14 rounded-full object-cover
                        absolute left-0 shadow-lg
                      "
                    />
                    <img
                      src={item.avatar2}
                      alt=""
                      className="
                        w-14 h-14 rounded-full object-cover
                        absolute left-8 shadow-lg
                      "
                    />
                  </div>
                </div>
              </CardItem>

              <div className="text-center text-neutral-600 dark:text-white mt-6">
                <span className="font-semibold text-(--c4)">{item.from}</span>{" "}
                sent you a{" "}
                {activeTab === "friends" ? "friend request" : "challenge"}
              </div>

              {activeTab === "challenges" && (
                <div className="text-center mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                  Theme:{" "}
                  <span className="font-semibold text-(--c4)">
                    {item.theme}
                  </span>
                </div>
              )}

              <div className="flex justify-center gap-4 mt-6">
                <CardItem
                  translateZ={30}
                  as="button"
                  className="
                    px-4 py-2 rounded-xl text-sm font-semibold
                    bg-(--c4) text-white
                    hover:bg-(--c3) transition
                  "
                >
                  Accept
                </CardItem>

                <CardItem
                  translateZ={30}
                  as="button"
                  className="
                    px-4 py-2 rounded-xl text-sm font-semibold
                    border border-red-400 text-red-400
                    hover:bg-red-400 hover:text-white transition
                  "
                >
                  Reject
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default NotificationSection;
