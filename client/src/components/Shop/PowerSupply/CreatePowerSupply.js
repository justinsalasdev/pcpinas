import React from "react";
import CreateProduct from "../../ProductForm";
import branchProdSchema from "../../../helpers/branchProdSchema";

const schema = branchProdSchema({});

export default () => (
  <CreateProduct
    mode="create"
    collection="powersupplies"
    schema={schema}
    renderOtherInput={(getFieldError, watch, register) => {
      return (
        <div className="range__container--rating">
          <div className="range">
            <label className="range__label" htmlFor="rating">
              Rating{" "}
              <span className="range__value">{watch("rating", "300")} W</span>
            </label>

            <input
              className="range__dial"
              ref={register}
              type="range"
              id="rating"
              name="rating"
              min="300"
              max="1500"
              step="10"
            />
          </div>
        </div>
      );
    }}
  />
);
