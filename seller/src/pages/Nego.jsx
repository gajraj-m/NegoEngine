import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SimilarityProgress from "../components/SimilarityProgress";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { bouncy } from "ldrs";
import NegoForm from "../components/NegoForm";
import { axiosInstance } from "../config/axios";
import { CONST } from "../config";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../api/socket";

bouncy.register();

const Nego = () => {
  const { currentBuyer } = useSelector((state) => state.app);
  const { currentUser } = useSelector((state) => state.user);
  const [sliderValue, setSliderValue] = useState(33);
  const milestones = [75, 80, 90, 95, 99];
  const index = useRef(0);
  let dialogRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [previousFormData, setPreviousFormData] = useState({});
  const [waiting, setWaiting] = useState(false);
  const [socket, setSocket] = useState(io(SOCKET_URL));
  const [lastPrice,setLastPrice] = useState(0);
  const [secondLastPrice,setSecondLastPrice] = useState(0);    
  const [currSimilarity, setCurrSimilarity] = useState(0)

  const handleClick = () => {
    setWaiting(true);

    // Start the timer
    setTimeout(() => {
      setWaiting(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // handleClick();
      setWaiting(true);
      // socket
      // send to socket first
      socket?.emit("sendNego", {
        sender_id: currentUser._id,
        receiver_id: currentBuyer._id,
        nego: {
          ...formData,
          sender_id: currentUser._id,
          receiver_id: currentBuyer._id,
        },
      });

      const res = await axiosInstance.post(
        CONST.uri.resources.POST_NEGO +
          `/${currentBuyer._id}_${currentUser._id}`,
        {
          ...formData,
          sender_id: currentUser._id,
          receiver_id: currentBuyer._id,
        }
        
      );
      setCurrSimilarity(res.data);
      console.log("Similarity got" + res.data);
      //  navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchNegos = async () => {
      try {
        const negos = await axiosInstance.get(
          CONST.uri.resources.GET_NEGO +
            `/${currentBuyer._id}_${currentUser._id}`
        );
        const len = negos.data.negos.length;
        if (len >= 1) setFormData(negos.data.negos[len - 1]);
        console.log(negos.data.negos);

        if(len >= 1){
          setLastPrice(negos.data.negos[len - 1].declared_price);
          setSecondLastPrice(negos.data.negos[len - 2].declared_price)
        }
        // console.log(negos);
        setCurrSimilarity(negos.data.curr_similarity);
        // console.log(curr);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNegos();
    setSocket(io(SOCKET_URL));
  }, []);

  useEffect(() => {
    // add user
    socket?.emit("addUser", currentUser._id);

    // get msg
    socket?.on("getNego", (nego) => {
      setWaiting(false);
      console.log("from socket : ", nego);
      setFormData(nego);
    });
  }, [socket]);

  useEffect(() => {
    if (sliderValue > milestones[index.current]) {
      dialogRef.current?.click();
      if (index.current < milestones.length - 1) index.current++;
    }
  }, [sliderValue]);

  //   console.log(sliderValue);

  return (
    <div className="pt-8 h-screen bg-slate-50">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <div className="shadow-lg shadow-gray-300 w-fit mx-auto px-4 rounded-lg hover:scale-105 duration-200">
            <div className="text-center mb-4 text-3xl font-bold bg-customGradient text-transparent bg-clip-text">
              <h1>Negotiable TnC</h1>
            </div>
          </div>

          <div className="w-3/4 h-3/4 p-4 mx-auto rounded-lg shadow-lg shado-gray-300 text-sm font-medium flex items-center justify-center">
            {waiting ? (
              <div className="" data-aos="fade-right">
                <l-bouncy size="150" speed="1.75" color="#00b7ea"></l-bouncy>
                <p className="text-gray-500 mt-4">
                  Awaiting Buyer&apos;s response
                </p>
              </div>
            ) : (
              <NegoForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                formData={formData}
              />
            )}
          </div>

          {/* button */}
          <div className="w-fit mx-auto mt-4 flex flex-row space-x-10">
            <button
              type="submit"
              disabled={waiting}
              onClick={handleSubmit}
              className="shadow-md shadow-blue-300 bg-buttonGradient font-medium text-white px-8 py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-40 hover:scale-105 duration-200"
            >
              <span>Propose</span>
            </button>
            <button
              onClick={() => {}}
              className={`shadow-md shadow-blue-300 ${
                sliderValue > 75 ? "bg-buttonGradient" : "hidden"
              }  font-medium text-white px-8 py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:scale-105 duration-200`}
            >
              <span>Finalize</span>
            </button>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="w-64 h-64 mx-auto mt-24" data-aos="fade-left">
            {<SimilarityProgress score={currSimilarity} />
            /* <Slider
              defaultValue={[33]}
              max={100}
              step={1}
              onValueChange={(i) => setSliderValue(i)}
            /> */}
          </div>
          <Dialog>
            <DialogTrigger className="hidden" ref={dialogRef}>
              Open
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Finalize The Deal?</DialogTitle>
                <DialogDescription className="">
                  {`We have reached a consensus on ${sliderValue} of the Terms and
                  Conditions. Are you ready to proceed and finalize the deal?`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit" className="text-white">
                  Finalize
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Nego;
