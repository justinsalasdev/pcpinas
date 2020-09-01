import React from "react";
import CreateProduct from "../../ProductForm";
import branchProdSchema from "../../../helpers/branchProdSchema";
import * as Yup from "yup";

const schema = branchProdSchema({
  type: Yup.string().required("is required")
});

export default () => (
  <CreateProduct
    mode="create"
    collection="storage"
    schema={schema}
    renderOtherInput={(getFieldError, watch, register) => {
      return (
        <>
          <div className="range__container--capacity">
            <div className="range">
              <label className="range__label" htmlFor="capacity">
                Capacity{" "}
                <span className="range__value">
                  {Number(watch("capacity", "20")).toFixed(1)} TB
                </span>
              </label>
              <input
                className="range__dial"
                ref={register}
                type="range"
                id="capacity"
                name="capacity"
                min="0.5"
                max="20"
                step="0.5"
              />
            </div>
          </div>
          <div className="radio__container">
            <div className="radio">
              <p className="radio__label">
                Type
                <span className="radio__toolkit"> {getFieldError("type")}</span>
              </p>
              <div className="radio__option">
                <input
                  type="radio"
                  id="hdd"
                  name="type"
                  value="email"
                  ref={register}
                />
                <label className="radio__name" htmlFor="hdd">
                  HDD
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  id="ssd"
                  name="type"
                  value="ssd"
                  ref={register}
                />
                <label className="radio__name" htmlFor="ssd">
                  SSD
                </label>
              </div>
            </div>
          </div>
        </>
      );
    }}
  />
);
