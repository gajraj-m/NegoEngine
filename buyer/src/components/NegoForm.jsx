import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoIosHelpCircle } from "react-icons/io";

const NegoForm = ({
  handleChange,
  handleSubmit,
  handleSelectChange,
  formData,
}) => {
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full px-4">
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
                <p className="text-xs">who collects money from the buyer</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          defaultValue={formData["payment-collector"]}
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
                  (Buyer App Fee + Seller App Fee + ONDC Fee) + (GST on all 3)
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
          value={formData["declared-price"]}
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
                  Whoever collects the payment (i.e. Buyer app or Seller app)
                  could optionally maintain a refund pool, using the withholding
                  amount from a transaction
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
            value={formData["withholding-amount"]}
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
                  Number of calendar days from settlement start time, within
                  which settlement with counterparty has to be completed
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
          value={formData["settlement-window"]}
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
                  In case of prepaid payment, whether settlement between
                  counterparties should be on the basis of collection, shipment
                  or delivery
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <Select
          defaultValue={formData["settlement-basis"]}
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
                <p className="text-xs">Your commission apart from finder fee</p>
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
            value={formData["commission"]}
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
                  Number of calendar days from order delivery, after which
                  withholding amount will have to be settled, in case of no
                  returns
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
          value={formData["return-window"]}
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
                  Number of calendar days within which buyer can cancel the
                  order
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
          value={formData["cancel-window"]}
        />
      </div>
    </form>
  );
};

export default NegoForm;
