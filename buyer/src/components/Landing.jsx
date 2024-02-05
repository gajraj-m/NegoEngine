import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { setCurrentSeller } from "../redux/slices/appSlice";

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [saps, setSaps] = useState([]);
  const dispatch = useDispatch();

  const sellerApps = [
    {
      id: 1,
      name: "App1",
      rating: 4.5,
      numberOfSales: 1000,
    },
    {
      id: 2,
      name: "App2",
      rating: 3.8,
      numberOfSales: 750,
    },
    {
      id: 3,
      name: "App3",
      rating: 4.2,
      numberOfSales: 1200,
    },
    {
      id: 4,
      name: "App4",
      rating: 4.0,
      numberOfSales: 900,
    },
    {
      id: 5,
      name: "App5",
      rating: 4.7,
      numberOfSales: 1500,
    },
    // Add more dummy objects as needed
  ];

  useEffect(() => {
    const fetchSellerApps = async () => {
      setSaps(sellerApps);
    };
    fetchSellerApps();
  }, []);

  return (
    <div className="px-12 py-8">
      <div className="mt-24 flex flex-col md:flex-row md:flex-wrap w-fit mx-auto">
        {saps.map((item) => {
          return (
            <Link
              onClick={() => {
                dispatch(setCurrentSeller(item));
              }}
              to={`/${item.id}-${item.name}`}
              key={item.id}
              className="hover:scale-105 duration-200 md:w-1/4 mt-4 mr-8"
            >
              <div
                // data-aos="fade-up"
                // data-aos-delay={item.id * 200}
                className=" p-4 rounded-lg shadow-md shadow-gray-300 flex-col space-y-3"
              >
                <p className="font-medium text-md">{item.name}</p>
                <div className="flex flex-row space-x-3 items-center">
                  <StarRating rating={item.rating} />
                  <p className="text-xs">{item.rating}</p>
                </div>
                <p className="text-xs">
                  Number of sales : {item.numberOfSales}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Landing;
