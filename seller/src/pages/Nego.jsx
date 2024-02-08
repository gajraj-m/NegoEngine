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

bouncy.register();

const Nego = () => {
  const initialValues = {
    "payment-collector": "buyer",
    "declared-price": 100, // Example value
    "withholding-amount": 5, // Example value
    "settlement-window": 7, // Example value
    "settlement-basis": "dispatch",
    commission: 2, // Example value
    "return-window": 14, // Example value
    "cancel-window": 3, // Example value
  };

  const { currentSeller } = useSelector((state) => state.app);
  const [sliderValue, setSliderValue] = useState(33);
  const milestones = [75, 80, 90, 95, 99];
  const index = useRef(0);
  let dialogRef = useRef(null);
  const [formData, setFormData] = useState(initialValues);
  const [waiting, setWaiting] = useState(false);

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
      console.log(formData);
      handleClick();
      //  navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

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
              onClick={handleSubmit}
              className="shadow-md shadow-blue-300 bg-buttonGradient font-medium text-white px-8 py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:scale-105 duration-200"
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
            <SimilarityProgress score={sliderValue} />
            <Slider
              defaultValue={[33]}
              max={100}
              step={1}
              onValueChange={(i) => setSliderValue(i)}
            />
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
