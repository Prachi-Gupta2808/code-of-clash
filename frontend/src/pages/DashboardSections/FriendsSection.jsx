"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const friendsData = [
  {
    username: "divya555",
    fullName: "Divyanshi",
    rating: 1450,
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
  },
  {
    username: "pro_prachi_2808",
    fullName: "Prachi",
    rating: 1520,
    avatar:
      "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    username: "yash_1804",
    fullName: "Yash",
    rating: 1600,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
  },
  {
    username: "ankur_mLover",
    fullName: "Ankur",
    rating: 1600,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
  },
];

const FriendsSection = () => {
  return (
    <div className="w-full max-w-300 mx-auto px-4 py-12 flex flex-col items-center">
      <div className="friendText flex flex-col items-center">
        <h2 className="text-[80px] font-bold text-white">Friends</h2>
        <p className="text-center text-md text-neutral-300 max-w-50">
          See your friends and{" "}
          <span className="font-semibold text-(--c4)">challenge them!</span>
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {friendsData.map((friend, index) => (
          <CardContainer key={index} className="inter-var w-full cursor-pointer">
            <CardBody
              className="bg-gray-50 relative group/card
              dark:bg-black dark:border-white/20
              border-black/10
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
                  className="h-56 w-full object-cover object-center rounded-xl group-hover/card:shadow-xl"
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
                    shadow-[0_0_20px_rgba(242,97,63,0.6)] cursor-pointer"
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
