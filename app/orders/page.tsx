import { auth } from '@/auth';
import { getAllOrders } from '@/sanity/lib/actions';
import React, { Suspense } from 'react'
import OrderItem from "@/components/OrderItem"
import Link from 'next/link';
import RefundButton from '@/components/RefundButton';
import { OrderItemReturnType, OrderOrderPageType, ShippingAddressType } from '@/globalTypes';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const experimental_ppr = true;

const OrdersPage = async ({params}: {params: Promise<{page: string}>}) => {
  const path = (await params).page || "/";
  
  const session = await auth();
  const userId = session?.user?.id;
  
  const ordersResponse = await getAllOrders(userId || "");
  const orders = ordersResponse.data.orders;

  const formatDate = (dateString: Date) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: ShippingAddressType) => {
    if (!address) return 'No address provided';
    const parts = [
      address.line1,
      address.line2,
      address.city,
      address.state,
      address.postalCode,
      address.country
    ].filter(Boolean);
    return parts.join(', ');
  };
  
  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      refunded: 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return colors[status?.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="flex flex-col items-center max-w-[800px] mx-auto min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-8rem)] p-4">
      <div className="flex flex-col w-full gap-y-6 pb-10 px-6 items-start justify-start bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-lg pt-6">
        
        {/* Page Header */}
        <div className="w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Orders
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Track and manage your recent purchases
          </p>
        </div>

        <div className="flex flex-col w-full gap-y-3 items-center">
                  <div className="flex flex-row w-full max-w-md border border-gray-200 rounded-md shadow-md bg-gray-50 overflow-hidden">
                  <Link href="/" className="flex-1">
                    <button className="w-full h-full py-2 font-plex-sans text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] font-bold bg-primary-200 text-white hover:bg-gray-600 active:bg-gray-700 transition-all duration-300 ease-in-out border-r border-gray-400">
                      Continue Shopping
                    </button>
                  </Link>
                </div>
                </div>

        {orders && orders.length > 0 ? (
          <div className="flex flex-col gap-y-4 w-full">
            {orders.map((order: OrderOrderPageType) => (
              <div 
                key={order.id} 
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-100">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <div className="flex flex-row gap-x-3 items-center">
                      <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Order #{order.id}
                      </h2>
                      {order.status !== "refunded" && (
                        <RefundButton userId={userId || ""} path={path} paymentIntentId={order.paymentIntentId} stripeSessionId={order.stripeSessionId} />
                      )}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1) || 'Unknown'}
                    </span>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    
                    {/* Left Column - Customer & Shipping Info */}
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Customer
                        </h3>
                        <p className="text-gray-900 font-medium">
                          {order.firstName} {order.lastName}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Shipping Address
                        </h3>
                        <p className="text-gray-900 leading-relaxed text-sm">
                          {formatAddress(order.address)}
                        </p>
                      </div>

                      {order.carrier && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            Carrier
                          </h3>
                          <p className="text-gray-900 font-medium">{order.carrier}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column - Order Details & Tracking */}
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                          <svg className="w-5 h-5 xs:w-6 xs:h-6 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                          </svg>
                          Order Total
                        </h3>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Shipping:</span>
                            <span className="text-gray-900">${(order.shippingCost / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Taxes:</span>
                            <span className="text-gray-900">${(order.taxAmount / 100).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-medium text-lg border-t border-gray-100 pt-2">
                            <span className="text-gray-900">Total:</span>
                            <span className="text-gray-900">${(order.amountTotal / 100).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      {(order.deliveryDate || order.trackingUrl) && order.status !== "refunded" && (
                        <div>
                          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Delivery & Tracking
                          </h3>
                          <div className="space-y-2">
                            {order.deliveryDate && (
                              <p className="text-sm">
                                <span className="text-gray-600">Expected delivery:</span>
                                <span className="text-gray-900 font-medium ml-2">
                                  {formatDate(order.deliveryDate)}
                                </span>
                              </p>
                            )}
                            {order.trackingUrl && (
                              <a 
                                href={order.trackingUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                              >
                                Track Package
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.items && order.items.length > 0 ? (
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        Order Items ({order.items.length})
                      </h3>
                      <div className="flex flex-col gap-y-3">
                        {order.items.map((item: OrderItemReturnType, index: number) => (
                          <Suspense key={index} fallback={
                            <div className="animate-pulse bg-gray-100 rounded-lg h-20"></div>
                          }>
                            <OrderItem orderItem={item} />
                          </Suspense>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-500 text-center py-4">
                        No items in this order
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-y-4 items-center justify-center w-full py-16 text-center">
            <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M8 11v6a2 2 0 002 2h4a2 2 0 002-2v-6M8 11h8" />
            </svg>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              No orders found
            </h2>
            <p className="text-gray-600 mb-6 max-w-md">
              {`You haven't placed any orders yet. Start shopping to see your orders here.`}
            </p>
            <Link 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8" />
              </svg>
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage