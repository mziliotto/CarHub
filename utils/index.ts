import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Precio base de alquiler por día en pesos
  const mileageFactor = 1.5; // Adicional por km recorrido
  const ageFactor = 0.05; // Adicional por año del modelo del vehiculo

  // Calcula adicional basado en kilometraje y año de modelo
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calcula alquiler total por día
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {
  // Toma los parametros de la URL actual
  const searchParams = new URLSearchParams(window.location.search);

  // Setea el valor especificado de la busqueda al valor
  searchParams.set(type, value);

  // Setea el valor especificado de la busqueda al valor
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {
  // Setea el valor especificado de la busqueda al valor
  const newSearchParams = new URLSearchParams(window.location.search);

  // Borra el parametro de busqueda
  newSearchParams.delete(type.toLocaleLowerCase());

  // Construye la URL actualizada con el parametro de busqueda borrado
  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};

export async function fetchCars(filters: FilterProps) {
  const { manufacturer, year, model, limit, fuel } = filters;

  // Setea el headers para la peticion de la API
  const headers: HeadersInit = {
    "X-RapidAPI-Key": "f2db212fd4msh4cb7c2729f17447p1a6735jsn3ac2a0d73d60" || "",
    "X-RapidAPI-Host": "cars-by-api-ninjas.p.rapidapi.com",
  };

  // Setea el headers para la peticion de la API
  const response = await fetch(
    `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`,
    {
      headers: headers,
    }    
  );

  // Parsea la respuesta como JSON
  const result = await response.json();

  return result;
}

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', "hrjavascript-mastery" || "");
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  //url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 