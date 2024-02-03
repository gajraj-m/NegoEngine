import React from "react";
import HeroImage from "/assets/hero.svg";
import FeatureImage1 from "/assets/feature1.svg";
import ToolImage from "/assets/tool.svg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { IoSpeedometerOutline } from "react-icons/io5";
import { LuWarehouse } from "react-icons/lu";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { MdOutlineGroups } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="px-12 py-8">
      {/* hero section */}
      
    </div>
  );
};

export default Landing;
