import * as React from "react";

import "../style/style.css";

import { mainTable, station, main } from "./home.module.css";

interface Station {
  name: string;
  crs: string;
}

interface ServiceBase {
  std?: string;
  etd?: string;
  sta?: string;
  eta?: string;
  platform: string;
  operator: string;
  operatorCode: string;
  serviceId: string;
  rsid: string;
  origin: Array<Station>;
  destination: Array<Station>;
}

interface Departure extends ServiceBase {
  std: string;
  etd: string;
}

interface Arrival extends ServiceBase {
  sta: string;
  eta: string;
}

type Service = Arrival | Departure;

const IndexPage = () => {
  const [crs, setCrs] = React.useState("WSB");
  const [departures, setDepartures] = React.useState<Array<Departure>>([]);
  const [arrivals, setArrivals] = React.useState<Array<Arrival>>([]);

  React.useEffect(() => {
    async function getData() {
      const data = await fetch(
        `/.netlify/functions/board?station=${crs}`
      ).then((res) => res.json());

      const services: Array<Service> = data?.message?.trainServices;
      if (!services) {
        return;
      }
      console.log({ services });
      const deps: Array<Departure> = services.filter(
        (service): service is Departure => !!service.std
      );
      const arrs: Array<Arrival> = services.filter(
        (service): service is Arrival => !!service.sta
      );

      setDepartures(deps);
      setArrivals(arrs);
    }
    getData();
  }, [crs]);

  return (
    <main className={main}>
      <title>Home Page</title>
      <section>
        <h1 className={station}>Departures</h1>
        <table className={mainTable}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Destination</th>
              <th>Plat</th>
              <th>Expected</th>
            </tr>
          </thead>
          <tbody>
            {departures.map((service) => (
              <tr>
                <td>{service.std}</td>
                <td>{service.destination[0].name}</td>
                <td>{service.platform}</td>
                <td>{service.etd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section>
        <h1 className={station}>Arrivals</h1>
        <table className={mainTable}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Destination</th>
              <th>Plat</th>
              <th>Expected</th>
            </tr>
          </thead>
          <tbody>
            {arrivals.map((service) => (
              <tr>
                <td>{service.sta}</td>
                <td>{service.origin[0].name}</td>
                <td>{service.platform}</td>
                <td>{service.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
};

export default IndexPage;
