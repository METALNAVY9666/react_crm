const publicHost = "api.imaki.org";
const localHost = "127.0.0.1";

const apiUrl = "http://" + localHost + ":8080/";

class Car {
  plate = "";
  owner = "";
  brand = "";
  model = "";
  year = "";
  fuel = "";
  price = 0;
  kilometers = 0;
  description = "";
  images = [""];
}

const traductions = {
  plate: "Plaque",
  owner: "Propriétaire",
  brand: "Marque",
  model: "Modèle",
  year: "Année",
  fuel: "Carburant",
  price: "Prix",
  kilometers: "Kilometrage",
  description: "Description",
  images: "Images",
};

export { Car, apiUrl, traductions };
