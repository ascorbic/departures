import * as React from "react";

import {
  mainTable,
  tableWrapper,
  main,
  noServices,
  timeStyle,
  tdR,
} from "./departure-boards.module.css";
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

interface Props {
  crs: string;
  time?: string;
}
export const DepartureBoards: React.FC<Props> = function DepartureBoards({
  crs,
  time,
}) {
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
    <div className={main}>
      <div className={tableWrapper}>
        <table className={mainTable}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Destination</th>
              <th className={tdR}>Plat</th>
              <th className={tdR}>Expected</th>
            </tr>
          </thead>
          <tbody>
            {departures.length ? (
              departures.map((service) => (
                <tr>
                  <td>{service.std}</td>
                  <td>{service.destination[0].name}</td>
                  <td className={tdR}>{service.platform}</td>
                  <td className={tdR}>{service.etd}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={noServices} colSpan={4}>
                  No services
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {time && (
          <div className={timeStyle}>
            <span>{time}</span>
          </div>
        )}

        <h2>Departures</h2>
      </div>
      <div className={tableWrapper}>
        <table className={mainTable}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Origin</th>
              <th className={tdR}>Plat</th>
              <th className={tdR}>Expected</th>
            </tr>
          </thead>
          <tbody>
            {arrivals.length ? (
              arrivals.map((service) => (
                <tr>
                  <td>{service.sta}</td>
                  <td>{service.origin[0].name}</td>
                  <td className={tdR}>{service.platform}</td>
                  <td className={tdR}>{service.eta}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className={noServices} colSpan={4}>
                  No services
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {time && (
          <div className={timeStyle}>
            <div>{time}</div>
          </div>
        )}
        <h2>Arrivals</h2>
      </div>
    </div>
  );
};
