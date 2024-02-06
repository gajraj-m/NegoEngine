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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { bouncy } from "ldrs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoIosHelpCircle } from "react-icons/io";

bouncy.register();

const Nego = () => {
  const { currentSeller } = useSelector((state) => state.app);
  const [sliderValue, setSliderValue] = useState(33);
  const milestones = [75, 80, 90, 95, 99];
  const index = useRef(0);
  let dialogRef = useRef(null);
  const [formData, setFormData] = useState({});
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
    <div className="pt-8 h-screen bg-slate-100">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={70}>
          <div className="text-center mb-4 text-3xl font-bold bg-customGradient text-transparent bg-clip-text">
            <h1>Negotiable TnC</h1>
          </div>

          <div className="w-3/4 h-3/4 p-4 mx-auto rounded-lg shadow-lg shado-gray-300 text-sm font-medium flex items-center justify-center">
            {waiting ? (
              <div className="">
                <l-bouncy size="150" speed="1.75" color="#00b7ea"></l-bouncy>
                <p className="text-gray-500 mt-4">
                  Awaiting Seller&apos;s response
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full px-4"
              >
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Who collects payment</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            who collects money from the buyer
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    onValueChange={(selectedValue) =>
                      handleSelectChange("payment-collector", selectedValue)
                    }
                  >
                    <SelectTrigger className="w-1/3 h-[20px] text-xs text-gray-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Declared Price</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            (Buyer App Fee + Seller App Fee + ONDC Fee) + (GST
                            on all 3)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    type="Number"
                    id="declared-price"
                    placeholder="Price"
                    className="w-1/3 h-[20px] text-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Withholding Amount (% of DP)</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent className="w-1/3">
                          <p className="text-xs">
                            Whoever collects the payment (i.e. Buyer app or
                            Seller app) could optionally maintain a refund pool,
                            using the withholding amount from a transaction
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="w-1/3 flex flex-row items-center">
                    <Input
                      type="Number"
                      id="withholding-amount"
                      placeholder="Enter"
                      className="h-[20px] text-xs mr-2"
                      onChange={handleChange}
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Settlement Window (in days)</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent className="w-1/3">
                          <p className="text-xs">
                            Number of calendar days from settlement start time,
                            within which settlement with counterparty has to be
                            completed
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    type="Number"
                    id="settlement-window"
                    placeholder="Enter"
                    className="w-1/3 h-[20px] text-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Settlement Basis</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent className="w-1/3">
                          <p className="text-xs">
                            In case of prepaid payment, whether settlement
                            between counterparties should be on the basis of
                            collection, shipment or delivery
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Select
                    onValueChange={(selectedValue) =>
                      handleSelectChange("settlement-basis", selectedValue)
                    }
                  >
                    <SelectTrigger className="w-1/3 h-[20px] text-xs text-gray-500">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dispatch">Dispatch</SelectItem>
                      <SelectItem value="shipment">Shipment</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Commission (% of DP)</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            Your commission apart from finder fee
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="w-1/3 flex flex-row items-center">
                    <Input
                      type="Number"
                      id="commission"
                      placeholder="Enter"
                      className="h-[20px] text-xs mr-2"
                      onChange={handleChange}
                    />
                    <span>%</span>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Return window (in days)</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent className="w-1/3">
                          <p className="text-xs">
                            Number of calendar days from order delivery, after
                            which withholding amount will have to be settled, in
                            case of no returns
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    type="Number"
                    id="return-window"
                    placeholder="Enter"
                    className="w-1/3 h-[20px] text-xs"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-row items-center justify-between border-[1px] border-gray-300 px-2 py-1 rounded-lg mt-2">
                  <div className="flex flex-row items-center space-x-1">
                    {" "}
                    <p>Cancel Window</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <IoIosHelpCircle size={15} />
                        </TooltipTrigger>
                        <TooltipContent className="w-1/3">
                          <p className="text-xs">
                            Number of calendar days within which buyer can
                            cancel the order
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input
                    type="Number"
                    id="cancel-window"
                    placeholder="Enter"
                    className="w-1/3 h-[20px] text-xs"
                    onChange={handleChange}
                  />
                </div>
              </form>
            )}
          </div>

          {/* button */}
          <div className="w-fit mx-auto mt-4">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-buttonGradient font-medium text-white px-8 py-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 hover:scale-105 duration-200"
            >
              <span>Propose</span>
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
