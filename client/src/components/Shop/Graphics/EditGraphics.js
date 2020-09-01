import React from "react";
import branchProdSchema from "../../../helpers/branchProdSchema";
import ProductForm from "../../ProductForm";

const schema = branchProdSchema({}, "edit");

export default () => {
  return (
    <ProductForm
      mode="edit"
      collection="graphics"
      schema={schema}
      renderOtherInput={(getFieldError, watch, register) => {
        return null;
      }}
    />
  );
};
