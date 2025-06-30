"use client";
import Link from "next/link"
import Navbar from "./components/ui/nav"
import { Hero8 } from "@/app/components/ui/hero"
import { Timeline3 } from "./components/ui/features"
import { Testimonial14 } from "./components/ui/testimonials"
import { Footer7 } from "./components/ui/footer"
import { useEffect, useState } from "react";
import useWebSocketConnectionHook from "@/lib/socket-hooks";
import { WebsocketEventEnum } from "@/app/typings/platforms";
export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useWebSocketConnectionHook(() => {
    console.log("WebSocket connected");
    setIsConnected(true);
  }, WebsocketEventEnum.Connected);


  useEffect(() => {
   
  }, []);

  const features = [
    {
      image: "https://imgs.search.brave.com/hsKWRp14wQhEvK__Dkz4NTj3uJM_7DHMHZTWllQlulE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9i/dXNpbmVzc21hbi1i/b3hpbmctY29ucGV0/aXRpb24tZmlnaHRp/bmctc3BvcnQtYWdy/ZXNzaXZlLWNvbmNl/cHRfNTM4NzYtMTIw/MzY0LmpwZz9zZW10/PWFpc19oeWJyaWQm/dz03NDA",
      title: "Find an Opponent",
      description: "Join the matchmaking queue and get paired with a coder of similar skill."
    },
    {
      image: "https://img.freepik.com/premium-photo/hand-holding-drawing-virtual-lightbulb-with-brain-bokeh-background-creative-smart-thinking-idea-concep_50039-3033.jpg?ga=GA1.1.2081559228.1747904061&semt=ais_hybrid&w=740",
      title: "Solve the Challenge",
      description: "Compete head-to-head by solving coding problems in real-time."
    },
    {
      image: "https://img.freepik.com/free-vector/leader-concept-illustration_114360-7854.jpg?ga=GA1.1.2081559228.1747904061&semt=ais_hybrid&w=740",
      title: "Earn Elo & Climb Ranks",
      description: "Win matches to increase your Elo rating and climb the leaderboard."
    },
    {
      image: "https://img.freepik.com/free-vector/rising-concept-illustration_114360-930.jpg?ga=GA1.1.2081559228.1747904061&semt=ais_hybrid&w=740",
      title: "Improve Your Skills",
      description: "Analyze match results, learn from your mistakes, and get better every day."
    }
  ]

  console.log("Socket connected:", isConnected);
  console.log("Socket transport:", transport);
  return (
    <main className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto">
        <Hero8 />
      </section>
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mt-10">
        <Timeline3
          heading="How CodeLo Works"
          description="Join coding battles, improve your skills, and climb the ranks with our real-time 1v1 challenges."
          features={features}
          buttons={
            {
              primary: {
                text: "Get Started",
                url: "/signup"
              },
              secondary: {
                text: "Learn More",
                url: "/about"
              }
            }
          }
        />
      </section>
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mt-10">
        <Testimonial14 />
      </section>
      <section className="px-4 sm:px-6 md:px-10 max-w-7xl mx-auto mt-10">
        <Footer7 />
      </section>
    </main>
  )
}
