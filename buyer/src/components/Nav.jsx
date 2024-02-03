import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu.jsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/slices/userSlice";

const products = [
  {
    title: "Themes",
    href: "/products/themes",
    description:
      "Explore beautifully designed themes for your LMS websites. Customize and enhance the look of your online courses with ease.",
  },

  // LMS Tools
  {
    title: "Tools",
    href: "/products/tools",
    description:
      "Discover powerful tools to streamline your online teaching experience. From analytics to interactive quizzes, optimize your LMS for success.",
  },
];

const company = [
  {
    title: "Career",
    href: "/company/career",
    description:
      "Join our team and be part of an exciting journey. Explore career opportunities and find the perfect fit for your skills and passion.",
  },

  // About
  {
    title: "About",
    href: "/company/about",
    description:
      "Learn more about our company, mission, and values. Discover our story and the people behind the scenes shaping the future of online education.",
  },
];

const resources = [
  // ... (previous sections)

  // Blog
  {
    title: "Blog",
    href: "/resources/blog",
    description:
      "Stay updated with the latest trends and insights in online education. Explore articles, tips, and success stories on our educational blog.",
  },

  // Community
  {
    title: "Community",
    href: "/resources/community",
    description:
      "Connect with other educators and learners in our vibrant community. Share experiences, ask questions, and collaborate to enhance your teaching journey.",
  },

  // Videos
  {
    title: "Videos",
    href: "/resources/videos",
    description:
      "Watch instructional videos, tutorials, and success stories. Our video library is a valuable resource to enhance your understanding of our LMS platform.",
  },

  // Help Center
  {
    title: "Help Center",
    href: "/resources/help-center",
    description:
      "Find answers to common questions and troubleshoot issues with our comprehensive help center. Access documentation and support resources anytime you need assistance.",
  },
];

const ListItem = ({ title, desc, href }) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {desc}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};

const Nav = () => {
  const [state, setState] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    //
    <nav className="bg-background w-full px-6 py-1 fixed z-40">
      <div className="items-center max-w-screen-xl mx-auto md:flex">
        <div className="flex items-center justify-between py-3  md:block">
          <a href="/" className="flex space-x-3">
            <FaUniversity size={34} />
            <h1 className="text-3xl font-bold">N*** Engine</h1>
          </a>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              <HiMenuAlt2 size={30} color="#000" />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            <NavigationMenu>
              <NavigationMenuList className="md:flex">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {products.map((product) => (
                        <ListItem
                          key={product.title}
                          title={product.title}
                          href={product.href}
                          desc={product.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* company */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {company.map((comp) => (
                        <ListItem
                          key={comp.title}
                          title={comp.title}
                          href={comp.href}
                          desc={comp.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* res */}

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {resources.map((res) => (
                        <ListItem
                          key={res.title}
                          title={res.title}
                          href={res.href}
                          desc={res.description}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink className="font-medium text-sm hover:text-slate-900">
                    <a href="">Pricing</a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </div>

        {/* sign in */}
        <div
          className={`justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={currentUser.profilePicture}
                    alt=""
                    className="rounded-full"
                  />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <FaRegUser className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    dispatch(signOut());
                    navigate("/login");
                  }}
                >
                  <IoExitOutline className="mr-2 h-4 w-4" />
                  <span>Sign Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
