"use client";

import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const dummyMatches = [
  {
    player1: "Prachi",
    player2: "Ankur",
    avatar1:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
    theme: "Binary Search",
  },
  {
    player1: "Divyanshi",
    player2: "Riya",
    avatar1:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2560&auto=format&fit=crop",
    theme: "Dynamic Programming",
  },
  {
    player1: "Neha",
    player2: "Ankit",
    avatar1:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=2560&auto=format&fit=crop",
    avatar2:
      "https://images.unsplash.com/photo-1502767089025-6572583495b4?q=80&w=2560&auto=format&fit=crop",
    theme: "Graphs",
  },
];

const MatchSection = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        Recent Matches
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {dummyMatches.map((match, index) => (
          <CardContainer key={index} className="w-full">
            <CardBody className="bg-gray-50 dark:bg-black border border-black/[0.1] dark:border-white/[0.15] rounded-xl p-6 w-full h-full">
              <CardItem translateZ={80} className="mt-6">
                <div className="flex justify-center relative w-[96px] h-[48px]">
                  <img
                    src={match.avatar1}
                    alt={match.player1}
                    className="w-14 h-14 rounded-full object-cover absolute left-0 shadow-lg"
                  />
                  <img
                    src={match.avatar2}
                    alt={match.player2}
                    className="w-14 h-14 rounded-full object-cover absolute left-8 shadow-lg"
                  />
                </div>
              </CardItem>

              <div className="text-center text-neutral-600 dark:text-white mt-6">
                <span className="font-semibold text-orange-500">
                  {match.player1}
                </span>{" "}
                vs{" "}
                <span className="font-semibold text-orange-500">
                  {match.player2}
                </span>
              </div>

              <div className="text-center mt-2 text-sm text-neutral-500 dark:text-neutral-300">
                Theme:{" "}
                <span className="font-semibold text-orange-500">
                  {match.theme}
                </span>
              </div>

              <div className="flex justify-center mt-6">
                <CardItem
                  translateZ={30}
                  as="button"
                  className="
                    px-4 py-2 rounded-xl text-sm font-semibold
                    bg-(--c4) text-white
                    hover:bg-(--c3) transition
                  "
                >
                  Submission History
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default MatchSection;
