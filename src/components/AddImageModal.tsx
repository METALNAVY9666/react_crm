import { Modal, Dropdown } from "react-bootstrap";
import { Dispatch, SetStateAction, useState } from "react";
import { getBasicFormData } from "./Functions";
import axios from "axios";
import { apiUrl } from "./basics";

interface Props2 {
  file: File;
  fileList: Array<File>;
  setFileList: Dispatch<SetStateAction<Array<File>>>;
}

export function GetImage({ file, fileList, setFileList }: Props2) {
  const src = URL.createObjectURL(file);
  // display: affiche l'image, crop: modifier l'image

  const deleteFile = () => {
    let newFileList: Array<File> = [];
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i] != file) {
        newFileList.push(file);
      }
    }
    setFileList(newFileList);
  };

  return (
    <>
      <img key={file.name} src={src} className="w-50 h-50 mt-2" />
      <Dropdown>
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {file.name}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/*<Dropdown.Item>Découper</Dropdown.Item>
          <Dropdown.Item>Censurer</Dropdown.Item>*/}
          <Dropdown.Item onClick={deleteFile}>Supprimer</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

interface Props {
  plate: string;
  setShow: Dispatch<SetStateAction<boolean>>;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

export function AddImageModal({ plate, setShow, setChanges }: Props) {
  const [imageFiles, setImageFiles] = useState<Array<File>>([]);
  const [progressBar, setProgressBar] = useState<string>();
  const [cancellable, setCancellable] = useState<boolean>(true);

  const confirm = () => {
    if (imageFiles.length < 1) {
      return;
    }
    setChanges(true);
    setCancellable(false);
    let form = new FormData();
    let status = 1;
    const title = "Téléversement des images ...";

    setProgressBar(title);
    imageFiles.forEach((file, index) => {
      form = getBasicFormData();
      form.append("plate", plate);
      form.append("file", file);
      axios
        .post(apiUrl + "post_image", form)
        .then((response) => {
          console.log(plate + " : " + response.data.message);
          if (response.data.message == "fichier enregistré") {
            setProgressBar(
              title + "\n" + String(status) + "/" + String(imageFiles.length)
            );
            status++;
          }
        })
        .then(() => {
          if (index == imageFiles.length - 1) {
            setShow(false);
            setTimeout(function () {
              setShow(false);
            }, 2000);
          }
        });
    });
  };

  return (
    <>
      <Modal show={true} keyboard={false}>
        <Modal.Header>Ajouter des images</Modal.Header>
        <Modal.Body>
          <div id="images" className="mb-5">
            {imageFiles.map((x, index) => (
              <GetImage
                key={index}
                file={x}
                fileList={imageFiles}
                setFileList={setImageFiles}
              />
            ))}
          </div>
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg, image/jpg"
            onChange={(e) =>
              setImageFiles((imageFiles) => [
                ...imageFiles,
                ...(e.target.files ? Array.from(e.target.files) : []),
              ])
            }
          />
          {progressBar}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={confirm} disabled={imageFiles.length == 0}>
            Confirmer l'ajout des images
          </button>
          {cancellable ? (
            <button
              onClick={() => {
                setShow(false);
              }}
            >
              Annuler
            </button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </>
  );
}
