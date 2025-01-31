import { VehicleReqSubmit } from "./types";

export async function handleSubmit(values: VehicleReqSubmit) {
      
    try {
      console.log("Données à envoyer:", values);
      // Make sure the imageFile is correctly passed as a file object and not a string
      if (values.file) {
        const formData = new FormData();
        // Append other fields
        formData.append("brand", values.brand||"");
        formData.append("modelId", values.modelId!.toString());
        formData.append("year", values.year!.toString()||"");
        formData.append("description", values.description||"");
        formData.append("price", values.price!.toString());
        formData.append("isAvailable", values.isAvailable.toString());

        // Append image file
        formData.append("imageFile", values.file!);
        console.log(formData)
    
        //await onSubmit(formData as VehicleReqSubmit); // Assuming onSubmit handles FormData
      } else {
        //await onSubmit(values); // If no image is uploaded, submit the regular data
      }

    } catch (error) {
      console.log(error)
    }
  }