import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { MapPin, Truck, Compass, Calendar, ShoppingBag, DollarSign, CheckCircle2 } from 'lucide-react';

const Orders = () => {
  const { orders, navigateTo } = useContext(CartContext);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [localOrders, setLocalOrders] = useState([]);

  // Mock initial demo order if no order has been made yet
  useEffect(() => {
    if (orders.length > 0) {
      setLocalOrders(orders);
      setSelectedOrder(orders[0]);
    } else {
      // Set a mock demo order representing a package flown from Odisha to Bangalore
      const demoOrder = {
        orderId: 'AK-382910',
        trackingNumber: 'TRK928401928',
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [
          {
            id: 'khaja',
            name: 'Ghee Khaja',
            price: 180,
            quantity: 2,
            selectedWeight: '250g',
            image: '/assets/khaja.png',
          },
          {
            id: 'chhena-poda',
            name: 'Baked Chhena Poda',
            price: 250,
            quantity: 1,
            selectedWeight: '500g',
            image: '/assets/chhena_poda.png',
          }
        ],
        pricing: {
          subtotal: 610,
          discount: 61,
          shipping: 0,
          tax: 27,
          total: 576,
        },
        shippingAddress: {
          name: 'Debasis Das',
          phone: '9556964425',
          street: 'Block 2C, Palm Meadows, Whitefield',
          city: 'Bangalore',
          state: 'Karnataka',
          pin: '560066',
        },
        paymentMethod: 'upi',
        // In transit
        status: 'In Transit',
        history: [
          { status: 'Order Placed & Received', date: 'Received at 10:15 AM', active: true },
          { status: 'Sourcing authentic ingredients from local Karigars in Puri', date: 'Sourced at 2:30 PM', active: true },
          { status: 'Packed & Dispatched from Bhubaneswar Saffron Hub', date: 'Shipped at 6:45 PM', active: true },
          { status: 'In Transit via Air Express (Hub -> Bangalore Airport)', date: 'In Transit - Flown', active: true },
          { status: 'Out for Delivery (Bangalore Hub)', date: 'Expected Tomorrow', active: false },
          { status: 'Delivered', date: 'Pending', active: false }
        ]
      };
      setLocalOrders([demoOrder]);
      setSelectedOrder(demoOrder);
    }
  }, [orders]);

  if (localOrders.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-6">
        <p className="text-gray-500">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Title */}
      <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-darkbrown mb-8 relative pb-2 inline-block">
        Track Your Traditional Orders
        <span className="absolute bottom-0 left-0 w-12 h-1 bg-terracotta rounded-full"></span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Orders list sidebar - Left */}
        <div className="space-y-4">
          <h3 className="font-serif text-sm font-bold text-gray-400 uppercase tracking-wider">Your Order List</h3>
          
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {localOrders.map((ord) => (
              <div
                key={ord.orderId}
                onClick={() => setSelectedOrder(ord)}
                className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col gap-2 ${
                  selectedOrder?.orderId === ord.orderId
                    ? 'border-terracotta bg-terracotta/5 shadow-md'
                    : 'border-gold/10 bg-white hover:border-gold/25'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-darkbrown uppercase font-bold">{ord.orderId}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider ${
                    ord.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.status === 'Received'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {ord.status}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {ord.date}
                  </span>
                  <span className="font-bold text-darkbrown font-sans">₹{ord.pricing.total}</span>
                </div>
                
                <div className="text-[10px] text-gray-400 border-t border-gray-100/50 pt-2 font-medium line-clamp-1">
                  Deliver to: {ord.shippingAddress.name} ({ord.shippingAddress.city})
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Order Tracking Stepper - Right */}
        <div className="lg:col-span-2 space-y-6">
          {selectedOrder && (
            <div className="bg-white border border-gold/10 p-6 md:p-8 rounded-3xl shadow-premium space-y-8">
              
              {/* Top summary card */}
              <div className="flex flex-col sm:flex-row justify-between border-b border-gray-100 pb-5 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Tracking Number</span>
                  <p className="text-base font-extrabold text-darkbrown tracking-wide">{selectedOrder.trackingNumber}</p>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase">Destination City: {selectedOrder.shippingAddress.city} ({selectedOrder.shippingAddress.pin})</p>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">Estimated Delivery</span>
                  <span className="text-sm font-bold text-terracotta">2-3 Days via Air Cargo Express</span>
                </div>
              </div>

              {/* Graphical tracking steps */}
              <div className="relative">
                <h3 className="font-serif text-sm font-bold text-darkbrown mb-6 flex items-center gap-1.5 uppercase tracking-wide">
                  <Truck className="w-5 h-5 text-terracotta" />
                  Live Express Journey Tracker
                </h3>

                {/* Progress bar line */}
                <div className="absolute left-[17px] top-[48px] bottom-[16px] w-[2px] bg-gray-200 -z-10"></div>
                
                {/* Stepper list */}
                <div className="space-y-6">
                  {selectedOrder.history.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      
                      {/* Step circle indicator */}
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 ${
                        step.active
                          ? 'bg-terracotta border-terracotta text-cream-light shadow-md shadow-terracotta/25'
                          : 'bg-white border-gray-200 text-gray-400'
                      }`}>
                        {step.active ? (
                          <CheckCircle2 className="w-5 h-5 fill-terracotta text-cream" />
                        ) : (
                          <span className="text-xs font-bold font-sans">{idx + 1}</span>
                        )}
                      </div>

                      {/* Step label text */}
                      <div className="flex-1 space-y-0.5">
                        <h4 className={`text-xs md:text-sm font-bold ${step.active ? 'text-darkbrown font-extrabold' : 'text-gray-400'}`}>
                          {step.status}
                        </h4>
                        <span className={`text-[10px] ${step.active ? 'text-terracotta font-semibold' : 'text-gray-400'}`}>
                          {step.date}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items in this order */}
              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-serif text-sm font-bold text-darkbrown uppercase tracking-wide flex items-center gap-1.5">
                  <ShoppingBag className="w-4.5 h-4.5 text-terracotta" />
                  Items in this Shipment
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-cream-light border border-gold/10 rounded-xl">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-gold/5 bg-white">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-serif text-xs font-bold text-darkbrown truncate">{item.name}</h5>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">{item.selectedWeight} × {item.quantity}</span>
                      </div>
                      <span className="text-xs font-bold text-darkbrown shrink-0">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Orders;
