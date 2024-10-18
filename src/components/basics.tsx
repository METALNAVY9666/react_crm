import apiConstUrl from "../assets/settings.json";

const apiUrl = "http://" + apiConstUrl + ":8080/";

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
