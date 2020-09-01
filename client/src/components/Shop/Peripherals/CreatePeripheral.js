import React from "react";
import CreateProduct from "../../ProductForm";
import FormSelect from "../../FormElements/FormSelect";
import branchProdSchema from "../../../helpers/branchProdSchema";
import * as Yup from "yup";

const typeOptions = ["Mouse", "Keyboard", "Headphone", "Speakers"];

const additionalRules = {
  type: Yup.string().test(
    "required",
    "required",
    (value) => value !== "initial"
  )
};
const schema = branchProdSchema(additionalRules);

export default () => (
  <CreateProduct
    mode="create"
    position="top"
    collection="peripherals"
    schema={schema}
    renderOtherInput={(getFieldError, watch, register) => {
      return (
        <>
          <FormSelect
            current={watch("type", "initial")}
            fieldError={getFieldError("type")}
            id="type"
            ref={register}
            options={typeOptions}
            initial="Select type"
          />
        </>
      );
    }}
  />
);
