import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "./StarRating";
import { setCurrentSeller } from "../redux/slices/appSlice";
import { axiosInstance } from "../config/axios";
import { CONST } from "../config";

const Landing = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [saps, setSaps] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSellerApps = async () => {
      try {
        const sellers = await axiosInstance.get(
          CONST.uri.resources.GET_SELLERS
        );
        setSaps(sellers.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSellerApps();
  }, []);

  return (
    <div className="px-12 py-8">
      <div className="mt-24 flex flex-col md:flex-row md:flex-wrap w-fit mx-auto">
        {saps?.map((item, idx) => {
          return (
            <Link
              onClick={() => {
                dispatch(setCurrentSeller(item));
              }}
              to={`/${item._id}-${item.fullname}`}
              key={idx}
              className="hover:scale-105 duration-200 md:w-1/4 mt-4 mr-8"
            >
              <div
                data-aos="fade-up"
                data-aos-delay={idx * 200}
                className=" p-4 rounded-lg shadow-md shadow-gray-300 flex-col space-y-3"
              >
                <p className="font-medium text-md">{item.fullname}</p>
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
