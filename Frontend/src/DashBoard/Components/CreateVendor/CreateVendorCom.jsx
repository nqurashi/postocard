import React from "react";
import "./style/CreateVendor.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { CreateVendor } from "../../../Redux/Action/VendorAction";
import Loading from "../../../Layout/Loading/Loading";

const CreateVendorCom = () => {
  const dispatch = useDispatch();

  const schema = Yup.object().shape({
    name: Yup.string().required("Please Enter Vendor Name"),
    street: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    Mnumber: Yup.number().required(),
    bank: Yup.number().required(),
    email: Yup.string().required(),
    rate: Yup.number().required(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      Mnumber: "",
      bank: "",
      email: "",
      rate: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const vdata = {
        VendorName: values.name,
        Address: values.street + "," + values.city + "," + values.state,
        ContactNumber: values.Mnumber,
        BankAccountNo: values.bank,
        Email: values.email,
        Rate: values.rate,
      };
      dispatch(CreateVendor(vdata));
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;
  const loading = useSelector((state)=> state.vendor.loading)

  return (
    <>
    {
      loading ? <Loading/> :<div className="CreateVendorCom">
      <h2>Create Vendor</h2>
      {/* ---------------  */}
      <div className="create_vindendor_box">
        <form onSubmit={handleSubmit}>
          <div className={`create_vindendor_input`}>
            <label htmlFor="name">Vendor Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={` ${errors.name && touched.name ? "shake" : ""}`}
            />
          </div>
          <div className={`create_vindendor_input `}>
            <label htmlFor="street">Street Address</label>
            <input
              type="text"
              name="street"
              value={values.street}
              onChange={handleChange}
              className={`${errors.street && touched.street ? "shake" : ""}`}
            />
          </div>
          <div className="flex justify-between gap-2 place-items-center">
            <div className={`create_vindendor_input w-full`}>
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                value={values.city}
                onChange={handleChange}
                className={`  ${errors.city && touched.city ? "shake" : ""}`}
              />
            </div>
            <div className={`create_vindendor_input w-full`}>
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                value={values.state}
                onChange={handleChange}
                className={` ${errors.state && touched.state ? "shake" : ""}`}
              />
            </div>
          </div>
          <div className={`create_vindendor_input `}>
            <label htmlFor="email">Email Adress</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className={` ${errors.email && touched.email ? "shake" : ""}`}
            />
          </div>
          <div className={`create_vindendor_input `}>
            <label htmlFor="rate">Rate</label>
            <input
              type="number"
              name="rate"
              value={values.rate}
              onChange={handleChange}
              className={` ${errors.rate && touched.rate ? "shake" : ""}`}
            />
          </div>
          <div className={`create_vindendor_input `}>
            <label htmlFor="Mnumber">Mobile Number</label>
            <input
              type="number"
              name="Mnumber"
              value={values.Mnumber}
              onChange={handleChange}
              className={` ${errors.Mnumber && touched.Mnumber ? "shake" : ""}`}
            />
          </div>
          <div className={`create_vindendor_input`}>
            <label htmlFor="bank">Bank Account Number</label>
            <input
              type="number"
              name="bank"
              value={values.bank}
              onChange={handleChange}
              className={` ${errors.bank && touched.bank ? "shake" : ""}`}
            />
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
    }
    </>
  );
};

export default CreateVendorCom;
