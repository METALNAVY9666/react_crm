import axios from "axios";
import { getBasicFormData } from "./Functions";
import { apiUrl } from "./basics";
import { useEffect, useState } from "react";
import { Plate } from "./Plate";
import CarModal from "./CarModal";
import CarImage from "./CarImage";

interface Props {
  data: Array<any>;
}

export function CarThumbnail({ data }: Props) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [images, setImages] = useState<Array<string>>([]);
  const plate = data[0];
  const [divClass, setDivClass] = useState<string>("border rounded");
  const [updateThisImage, setUpdateThisImage] = useState<boolean>(false);

  // setting the image list
  useEffect(() => {
    const formData = getBasicFormData();
    formData.append("plate", plate);
    axios.post(apiUrl + "get_image_list", formData).then((response) => {
      const images = response.data.images;
      setImages(images);
    });
  }, []);

  if (updateThisImage) {
    setUpdateThisImage(false);
    const formData = getBasicFormData();
    formData.append("plate", plate);
    axios.post(apiUrl + "get_image_list", formData).then((response) => {
      const images = response.data.images;
      setImages(images);
    });
  }

  return (
    <>
      <div className="col-3 my-2">
        <CarModal
          data={data}
          show={showModal}
          setShow={setShowModal}
          setUpdateParentImage={setUpdateThisImage}
        />
        <div
          className={divClass}
          role="button"
          onMouseEnter={() => setDivClass("border rounded shadow-lg")}
          onMouseLeave={() => setDivClass("border rounded")}
          onClick={() => setShowModal(true)}
        >
          <Plate plate={plate} />
          <CarImage
            plate={plate}
            filename={images[0]}
            className="d-block mx-auto"
            style={{ maxHeight: "30vh", maxWidth: "100%" }}
          />
        </div>
      </div>
    </>
  );
}
