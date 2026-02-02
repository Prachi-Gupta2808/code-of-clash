"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const friendsData = [
  {
    username: "divyanshi123",
    fullName: "Divyanshi Sharma",
    rating: 1450,
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
  },
  {
    username: "ankur_07",
    fullName: "Ankur Gupta",
    rating: 1520,
    avatar:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
  },
  {
    username: "prachi_g",
    fullName: "Prachi Gupta",
    rating: 1600,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
  },
];

const FriendsSection = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-white text-center">Friends</h2>

      <p className="text-center text-lg text-neutral-300">
        See your friends and{" "}
        <span className="font-semibold text-(--c4)">challenge them!</span>
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {friendsData.map((friend, index) => (
          <CardContainer key={index} className="inter-var w-full">
            <CardBody
              className="bg-gray-50 relative group/card
              dark:bg-black dark:border-white/[0.2]
              border-black/[0.1]
              rounded-xl p-6 border
              w-full h-full"
            >
              <CardItem
                translateZ={50}
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {friend.username}
              </CardItem>

              <CardItem
                as="p"
                translateZ={60}
                className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
              >
                {friend.fullName}
              </CardItem>

              <CardItem
                translateZ={70}
                className="text-neutral-700 dark:text-neutral-200 font-medium mt-2"
              >
                Rating: {friend.rating}
              </CardItem>

              <CardItem translateZ={100} className="w-full mt-4">
                <img
                  src={friend.avatar}
                  alt={friend.username}
                  className="h-56 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                />
              </CardItem>

              {/* Challenge Button */}
              <div className="flex justify-center mt-6">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="
                    bg-(--c4) hover:bg-(--c3) duration-300
                    text-white px-4 py-2 text-sm poppins-bold-italic rounded-xl
                    flex gap-2 items-center justify-center
                    shadow-[0_0_20px_rgba(242,97,63,0.6)]"
                >
                  Challenge
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default FriendsSection;
