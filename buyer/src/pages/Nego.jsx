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

const Nego = () => {
  const { currentSeller } = useSelector((state) => state.app);
  const [sliderValue, setSliderValue] = useState(33);
  const milestones = [75, 80, 90, 95, 99];
  const index = useRef(0);
  let dialogRef = useRef(null);

  useEffect(() => {
    if (sliderValue > milestones[index.current]) {
      console.log(sliderValue + " " + index.current);
      dialogRef.current?.click();
      if (index.current < milestones.length - 1) index.current++;
    }
  }, [sliderValue]);

  //   console.log(sliderValue);

  return (
    <div className="pt-8 h-screen bg-slate-100">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel>
          <div className="text-center mb-4 text-3xl font-bold bg-customGradient text-transparent bg-clip-text">
            <h1>Negotiable TnC</h1>
          </div>
          <div className="w-3/4 h-3/4 p-4 mx-auto rounded-lg shadow-lg shado-gray-300 text-sm font-medium">
            <p>Who collects payment</p>
            <p>Withholding Amount</p>
            <p>Settlement Window</p>
            <p>Settlement Basis</p>
            <p>Declared Price</p>
            <p>Commission</p>
            <p>Return window</p>
            <p>Cancel Window</p>
            <p>Settlement Window</p>
          </div>
          {/* button */}
          <div className="w-fit mx-auto mt-4">
            <button className="bg-buttonGradient font-medium text-white px-8 py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
              Propose
            </button>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div className="w-52 h-52 mx-auto mt-24">
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
