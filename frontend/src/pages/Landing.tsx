import React from "react";

import Hero from "../components/sections/Hero";
import LandingLayout from "../components/layouts/LandingLayout";

export default function Landing() {
  return (
    <LandingLayout>
      <Hero
        title="A Grocery Delivery Service That Doesn’t Hurt Your Wallet."
        subtitle="Go Crazy Over Our Insanely Affordable Prices"
        image="https://images.unsplash.com/photo-1601598851547-4302969d0614?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
        ctaText="Create Your Account Now"
        ctaLink="/signup"
      />
    </LandingLayout>
  );
}
