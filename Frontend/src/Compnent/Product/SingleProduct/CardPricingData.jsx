import React, { useEffect, useState } from "react";
import "./Styles/CardPricingData.css";
import ViewMainProduct from "../ViewMainProduct";
import AddReview from "../Addreview/AddReview";
import { useDispatch, useSelector } from "react-redux";
import { CreateCartFunction } from "../../../Redux/Action/CartAction";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BiErrorCircle } from "react-icons/bi";
import { getuseraddress } from "../../../Redux/Action/UserAction";
import SpinnerLoading from "../../../Layout/Loading/SpinnerLoading";
import axios from "axios";

const CardPricingData = ({ active, name, content }) => {
  const allProduct = useSelector((state) => state.product.allProduct);
  const singleproduct = useSelector((state) => state.product.singleproduct);
  const cartloading = useSelector((state) => state.cart.isloading);
  const userAddress = useSelector((state) => state.user.userAddress);
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  // ===== filter by category name
  const relatedProduct = allProduct?.filter(
    (item) =>
      item?.sub_category_details?.category_details?.CategoryName ===
      singleproduct?.sub_category_details?.category_details?.CategoryName
  );
  const sliceProduct = relatedProduct && relatedProduct.slice(0, 4);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedStates, setSelectedStates] = useState("");
  const [selectedCities, setSelectedCities] = useState("");

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [checkbox, setcheckbox] = useState(0);
  const [show, setShow] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);

  const disptch = useDispatch();
  const { id } = useParams();

  const ProductId = id;
  const Message = content;
  // const Signature = name;

  const isLoading = useSelector((state) => state.product.singleProductLoad);
  // -------- schema
  const Schema = Yup.object().shape({
    fname: Yup.string().required("Please Enter First Name"),
    // lname: Yup.string().required("Please Enter Last Name"),
    country: Yup.string().required("Plaese Enter Your Country"),
    address: Yup.string().required("Plaese Enter Your Address"),
    state: Yup.string().required("Plaese Enter Your State"),
    state: Yup.string().required("Plaese Enter Your State"),
    town: Yup.string().required("Plaese Enter Your Town"),
    city: Yup.string().required("Plaese Enter Your City"),
    phone: Yup.string().required("Plaese Enter Your Phone Number"),
    postocode: Yup.string().required("Plaese Enter Your PostoCode"),
    email: Yup.string()
      .required("Plaese Enter Your Email")
      .email("Plaese Enter Valid Email"),
  });
  const formik = useFormik({
    initialValues: {
      fname: "",
      // lname: "",
      country: "",
      address: "",
      state: "",
      town: "",
      city: "",
      phone: "",
      postocode: "",
      email: "",
    },
    validationSchema: Schema,
    onSubmit: (values) => {},
  });

  // ---- get the single address
  const [singleAddress, setSingleaddress] = useState([]);
  useEffect(() => {
    const filteraddress = userAddress?.filter(
      (item) => item.id === Number(savedAddress)
    );
    setSingleaddress(filteraddress);
  }, [savedAddress]);
  const { errors, values, touched, handleChange, handleSubmit } = formik;
  const additemtocart = () => {
    setShow(false);
    // if (name === "") {
    //   return toast.error("Please enter your name");
    // }
    if (content === "") {
      return toast.error("Please enter your description");
    }
    // console.log(userAddress);
    if ((savedAddress && checkbox === 0) || checkbox === null) {
      var CartCode = localStorage.getItem("cartcode");
      var FullName = singleAddress[0]?.full_name;
      var StreetAddress = singleAddress[0]?.street_address;
      var City = singleAddress[0]?.city;
      var State = singleAddress[0]?.state;
      var Country = singleAddress[0]?.country;
      var MobileNo = singleAddress[0]?.phone;
      var NewAddress = checkbox === 1 || checkbox === null ? 0 : 1;
    } else {
      var CartCode = localStorage.getItem("cartcode");
      var FullName = values.fname;
      var StreetAddress = values.address;
      // var City = values.city;
      // var State = values.state;
      // var Country = values.country;
      var City = selectedCities;
      var State = selectedStates;
      var Country = selectedCountry;
      var MobileNo = values.phone;
      var NewAddress = checkbox === 1 || checkbox === null ? 0 : 1;
    }
    disptch(
      CreateCartFunction(
        ProductId,
        Message,
        // Signature,
        CartCode ? CartCode : null,
        FullName,
        StreetAddress,
        City,
        State,
        Country,
        MobileNo,
        NewAddress,
        "user_address_id" ? Number(savedAddress) : null
      )
    );
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getuseraddress());
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://countriesnow.space/api/v0.1/countries"
        );
        console.log(res.data.data);
        const specificCountries = res.data.data.filter(
          (item) =>
            item.country === "United States" || item.country === "Canada"
        );
        setCountries(specificCountries);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        if (selectedCountry) {
          const response = await axios.get(
            `https://countriesnow.space/api/v0.1/countries/states`
          );

          //  response.data.data.forEach(element => {

          //  });
          setStates(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedStates) {
          const response = await axios.post(
            "https://countriesnow.space/api/v0.1/countries/state/cities",
            {
              country: selectedCountry,
              state: selectedStates,
            }
          );

          setCities(response.data.data);
          console.log(response.data.data);
        }
      } catch (error) {
        console.log("Error fetching states:", error);
      }
    };

    fetchCities();
  }, [selectedStates]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const handleStateChange = (event) => {
    setSelectedStates(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCities(event.target.value);
  };

  // console.log(NewAddress);
  console.log(selectedCountry);
  console.log(selectedStates);
  console.log(selectedCities);
  return (
    <div className="cardpricing-parent">
      {isLoading ? (
        <p>loading...</p>
      ) : (
        <div className="CardPricingData_parent px-[60px]">
          <div className="CardPricingData flex justify-between place-items-center gap-[10px] py-2 my-[50px]">
            <h2>{singleproduct && singleproduct.ProductName}</h2>
            <div className="price flex justify-between place-items-center gap-2 ">
              <p>
                $
                {singleproduct?.Discount > 0
                  ? singleproduct?.Price - singleproduct?.Discount
                  : singleproduct?.Price}
              </p>
              {singleproduct?.Discount > 0 && (
                <font className="text-[gray]">
                  $ {singleproduct?.Discount > 0 && singleproduct?.Price}
                </font>
              )}

              <span className="sold">15+ Sold</span>
            </div>
            {/* ================= */}
            {show && (
              <div className="fixed z-30  left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10">
                <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-white relative">
                  <div className="w-full px-2 ">
                    <div className="m-8 my-20 max-w-[400px] mx-auto px-2">
                      <RxCross1
                        className="text-2xl cursor-pointer absolute top-[20px] right-[20px]"
                        onClick={() => {
                          setShow(false);
                        }}
                      />
                      {/* <button>Billing Adress</button> */}
                      <div className="flex justify-between place-items-center gap-2">
                        <div className="flex justify-start place-items-center gap-1 text-[17px]">
                          <input
                            type="checkbox"
                            checked={checkbox === 1}
                            onClick={() => setcheckbox(1)}
                            onChange={() => {}}
                            className="w-[20px] h-[20px]"
                          />
                          <span
                            className="cursor-pointer"
                            onClick={() => setcheckbox(1)}
                          >
                            Shipping Address
                          </span>
                        </div>
                        <span className="mx-2 text-[17px]">OR</span>
                        {/* <button>New Adress</button> */}
                        <div className="flex justify-start place-items-center gap-1 text-[17px]">
                          <input
                            type="checkbox"
                            checked={checkbox === 2}
                            onChange={() => {}}
                            onClick={() => setcheckbox(2)}
                            className="w-[20px] h-[20px]"
                          />
                          <span
                            className="cursor-pointer"
                            onClick={() => setcheckbox(2)}
                          >
                            New Adress
                          </span>
                        </div>
                      </div>

                      {/* --------------  */}
                      {user?.name && (
                        <div className="block my-3 w-full  overflow-y-auto">
                          <p className="!text-[17px]">
                            Select from saved address
                          </p>
                          <select
                            className="my-1 w-full outline-none !max-h-[300px]"
                            value={savedAddress}
                            onChange={(e) => {
                              setSavedAddress(e.target.value);
                              setcheckbox(null);
                            }}
                          >
                            <option value="">Select Address</option>
                            {loading ? (
                              <SpinnerLoading />
                            ) : (
                              userAddress?.map((item, index) => {
                                return (
                                  <option value={item.id} key={index}>
                                    {item.address_name}
                                  </option>
                                );
                              })
                            )}
                          </select>
                        </div>
                      )}
                    </div>
                    {/* ===========  */}
                    {checkbox === 2 && (
                      <div className="left_payment px-2">
                        <h2 className="text-center">Shipping address</h2>
                        <div className="inputs_box ">
                          <input
                            type="text"
                            placeholder="Full Name"
                            className={
                              errors.fname && touched.fname
                                ? "red first"
                                : "first"
                            }
                            value={values.fname}
                            name=""
                            id="fname"
                            onChange={handleChange}
                          />
                          {errors.fname && touched.fname && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.fname}
                            </p>
                          )}

                          {/* <input
                            type="text"
                            placeholder="Last Name"
                            value={values.lname}
                            name=""
                            id="lname"
                            onChange={handleChange}
                            className={
                              errors.lname && touched.lname ? "red" : null
                            }
                          />
                          {errors.lname && touched.lname && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.lname}
                            </p>
                          )} */}

                          {/* <input
                            type="text"
                            placeholder="Country"
                            value={values.country}
                            name=""
                            id="country"
                            onChange={handleChange}
                            className={
                              errors.country && touched.country ? "red" : null
                            }
                          />
                          {errors.country && touched.country && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.country}
                            </p>
                          )} */}

                          <input
                            type="text"
                            placeholder="Street Adress"
                            value={values.address}
                            id="address"
                            name=""
                            onChange={handleChange}
                            className={
                              errors.address && touched.address ? "red" : null
                            }
                          />
                          {errors.address && touched.address && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.address}
                            </p>
                          )}

                          {/* <input
                            type="text"
                            placeholder="Town"
                            value={values.town}
                            name=""
                            id="town"
                            onChange={handleChange}
                            className={
                              errors.town && touched.town ? "red" : null
                            }
                          />
                          {errors.town && touched.town && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.town}
                            </p>
                          )} */}
                          <div>
                            <label htmlFor="country">Select a country:</label>
                            <select
                              id="country"
                              value={selectedCountry}
                              onChange={handleCountryChange}
                            >
                              <option value="">Select...</option>
                              {countries?.map((country) => (
                                <option
                                  key={country.country}
                                  value={country.country}
                                >
                                  {country.country}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="state">Select a state:</label>
                            <select
                              id="state"
                              value={selectedStates}
                              onChange={handleStateChange}
                            >
                              <option value="">Select...</option>
                              {states &&
                                states.map((countryStates) =>
                                  selectedCountry === countryStates.name
                                    ? countryStates.states.map((state) => (
                                        <option
                                          key={state.name}
                                          value={state.name}
                                        >
                                          {state.name}
                                        </option>
                                      ))
                                    : null
                                )}
                            </select>
                          </div>

                          <div>
                            <label htmlFor="country">Select a city:</label>
                            <select
                              id="country"
                              value={selectedCities}
                              onChange={handleCityChange}
                              className={
                                errors.city && touched.city ? "red" : null
                              }
                            >
                              <option value="">Select...</option>
                              {cities?.map((city, index) => (
                                <option key={index} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                            {errors.city && touched.city && (
                              <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                                {" "}
                                <BiErrorCircle />
                                {errors.city}
                              </p>
                            )}
                          </div>

                          {/* <input
                            type="text"
                            placeholder="City"
                            value={values.city}
                            name=""
                            id="city"
                            onChange={handleChange}
                            className={
                              errors.city && touched.city ? "red" : null
                            }
                          />
                          {errors.city && touched.city && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.town}
                            </p>
                          )} */}

                          {/* <input
                            type="text"
                            placeholder="State"
                            value={values.state}
                            name=""
                            id="state"
                            onChange={handleChange}
                            className={
                              errors.state && touched.state ? "red" : null
                            }
                          />
                          {errors.state && touched.state && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.state}
                            </p>
                          )} */}

                          <input
                            type="number"
                            placeholder="Phone"
                            value={values.phone}
                            name=""
                            id="phone"
                            onChange={handleChange}
                            className={
                              errors.phone && touched.phone ? "red" : null
                            }
                          />
                          {errors.phone && touched.phone && (
                            <p className="my-2 px-1 text-[red] font-[Poppins] flex justify-start place-items-center gap-[8px] error_touched">
                              {" "}
                              <BiErrorCircle />
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                    <button
                      onClick={additemtocart}
                      className=" w-full text-center my-2 flex justify-center place-items-center"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* ============ */}
            {cartloading ? (
              <button className="rounded-sm" disabled>
                Add to cart
              </button>
            ) : (
              <button className="rounded-md" onClick={() => setShow(!show)}>
                Add to cart
              </button>
            )}
          </div>
          {/* --------description  */}
          {active === 1 && (
            <div className="CardPricingData_description">
              {/* <h2>Custom Message :</h2> */}
              {/* <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, See more...
              </p> */}
            </div>
          )}
          <div className="also_like">
            <h2>You may also like</h2>
          </div>
          {active === 2 && <AddReview />}
          {sliceProduct?.length > 0 ? (
            <div className="also_like">
              <ViewMainProduct data={sliceProduct} />
            </div>
          ) : (
            <div>
              <h2 className="p-3 my-2 text-[18px]  bg-[#80808079]">
                No products match.
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPricingData;
