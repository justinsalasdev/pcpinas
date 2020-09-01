import React from "react";
import CreateProduct from "../../ProductForm";
import FormSelect from "../../FormElements/FormSelect";
import branchProdSchema from "../../../helpers/branchProdSchema";
import * as Yup from "yup";

const formOptions = ["micro ATX", "ATX", "mini ITX"];
const socketOptions = ["FM2", "FM2+", "LGA1115", "LGA775"];

const additionalRules = {
  form: Yup.string().test(
    "required",
    "required",
    (value) => value !== "initial"
  ),
  socket: Yup.string().test(
    "required",
    "required",
    (value) => value !== "initial"
  )
};
const schema = branchProdSchema(additionalRules);

export default () => (
  <CreateProduct
    mode="create"
    collection="motherboards"
    schema={schema}
    renderOtherInput={(getFieldError, watch, register) => {
      return (
        <>
          <FormSelect
            current={watch("form", "initial")}
            fieldError={getFieldError("form")}
            id="form"
            ref={register}
            options={formOptions}
            initial="form factor"
          />
          <FormSelect
            current={watch("socket", "initial")}
            fieldError={getFieldError("socket")}
            id="socket"
            ref={register}
            options={socketOptions}
            initial="socket"
          />
        </>
      );
    }}
  />
);
