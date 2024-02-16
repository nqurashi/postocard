import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../../../Redux/Action/VendorOrdersAction";

function AllOrders() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.vendorOrders.allOrders);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = (index) => {
    setIsOpen(isOpen === index ? null : index);
  };
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, []);

  return (
    <>
      <div class="flex flex-col overflow-x-auto px-5 py-5">
        <div class="sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-x-auto">
              <table class="min-w-full text-left text-sm font-light">
                <thead class="border-b font-medium dark:border-neutral-500">
                  <tr className="bg-[lightgray]">
                    <th scope="col" class="px-6 py-4">
                      Cart ID
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Discount
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Created At
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-gray-200 !w-[100%]">
                  {allOrders?.assigned_orders?.map((order, index) => (
                    <React.Fragment key={index}>
                      <tr class="bg-white border-b-2 border-gray-200">
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {order.CartID}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {" "}
                          {order.product_details.ProductName}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {" "}
                          {order.Status}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {order.Discount}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {" "}
                          {new Intl.DateTimeFormat("en-US").format(
                            new Date(order.created_at)
                          )}
                        </td>
                        <td
                          class="whitespace-nowrap px-6 py-4"
                          onClick={() => toggleAccordion(index)}
                        >
                          {" "}
                          {isOpen === index ? "▲" : "▼"}
                        </td>
                      </tr>
                      {isOpen === index && (
                        <tr className="bg-white border-b-2 border-gray-200">
                           <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {order.CartID}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {order.CartID}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {order.CartID}
                        </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AllOrders;
