"use client";
import { initiateRefund } from "@/sanity/lib/actions";
import React, { useState } from "react";
import { toast } from "sonner";

const RefundButton = ({
  userId,
  path,
  paymentIntentId,
  stripeSessionId,
}: {
  userId: string;
  path: string;
  paymentIntentId: string;
  stripeSessionId: string;
}) => {
  const [isRefunding, setIsRefunding] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const handleRefundClick = () => {
    setShowConfirmModal(true);
  };

  const handleCancelRefund = () => {
    setShowConfirmModal(false);
  };

  const handleConfirmRefund = async () => {
    setShowConfirmModal(false);
    setIsRefunding(true);

    try {
      setIsRefunding(true);
      let redirectPath = path;
      if (path.includes("checkout/return")) {
        redirectPath = path + "?session_id=" + stripeSessionId;
      }
      const response = await initiateRefund(
        userId,
        paymentIntentId,
        stripeSessionId,
        redirectPath
      );
      if (response.status === "ERROR") {
        toast.error("ERROR", {
          description: response.error,
        });
        setIsRefunding(false);
        return;
      }
      toast.success("SUCCESS", {
        description: "Refund request sent successfully",
      });
    } catch (error) {
      console.error("Refund error:", error);
    } finally {
      setIsRefunding(false);
    }
  };
  return (
    <>
      <button
        className="font-plex-sans text-[12px] lg:text-[14px] px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-300 ease-in-out active:scale-95"
        onClick={handleRefundClick}
        disabled={isRefunding}
      >
        {isRefunding ? "Refunding..." : "Refund"}
      </button>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#ffffff] p-6 rounded-lg shadow-xl max-w-md w-full opacity-100">
            <h3 className="text-lg font-semibold mb-4">
              Confirm Refund Request
            </h3>
            <div className="mb-4 text-sm text-gray-700">
              <p className="mb-2">
                <strong>Terms and Services:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Refunds may take 5-10 business days to process</li>
                <li>Original payment method will be credited</li>
                <li>Shipping costs are non-refundable</li>
                <li>Items must be in original condition</li>
                <li>Refunds must be made within 30 days of purchase</li>
              </ul>
            </div>
            <p className="mb-6 text-gray-800">
              Are you sure you want to proceed with this refund request?
            </p>

            <div className="flex space-x-3">
              <button
                onClick={handleCancelRefund}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRefund}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Continue Refund
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RefundButton;
