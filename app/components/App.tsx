"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

import {
  daysLeftUntilEndOfYear,
  generateCalendar,
  getWeekNumber,
  isDateInThePast,
  isToday,
} from "@/helpers/dates";

import styles from "./app.module.css";

type AppProps = {
  serverDate: Date;
};

export const App = ({ serverDate }: AppProps) => {
  const date = serverDate;

  const [selectedDate, setSelectedDate] = useState(date);

  const [userLocale, setUserLocale] = useState("us-US");

  const firstDayOfYear = new Date(selectedDate.getFullYear(), 0, 1);

  useEffect(() => {
    setSelectedDate(new Date());
    setUserLocale(navigator.language || "fr-FR");
  }, [date]);


  const startDate = firstDayOfYear;
  const numWeeks = 53;
  const calendar = generateCalendar(startDate, numWeeks);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <time
          className={styles.headerTime}
          dateTime={selectedDate.toISOString()}
        >
          <span className={styles.headerTime__weekNumber}>

            <NumberFlow value={getWeekNumber(selectedDate)} />{" "}
            <button onClick={() => setSelectedDate(new Date())}>🗓️</button>{" "}
          </span>
          <span className={styles.headerTime__date}>
            {selectedDate.toLocaleDateString(userLocale, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </time>
      </div>

      <div className={styles.calendar}>
        {Object.values(calendar).map((weekNumber, index) => {
          return (
            <div key={index} className="flex flex-row  pb-px">
              {Object.entries(weekNumber).map(([day, date]) => {
                if (
                  new Date(date).getFullYear() !== selectedDate.getFullYear()
                ) {
                  return (
                    <div key={day} className={styles.calendar__day__outOfYear}>
                      ●
                    </div>
                  );
                }

                
                return (
                  <div
                    key={day}
                    className={styles.calendar__day}
                    style={{
                      color: isToday(date, selectedDate)
                        ? "green"
                        : isDateInThePast(date, selectedDate)
                        ? "white"
                        : "grey",
                      cursor: "pointer",
                    }}
                    onClick={() => setSelectedDate(new Date(date))}
                  >
                    ●
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center pb-10">
        <span className="text-white font-bold text-m">
          {" "}
          <NumberFlow value={daysLeftUntilEndOfYear(selectedDate)} /> jour(s)
          avant {selectedDate.getFullYear() + 1} 🎉
        </span>
      </div>
    </div>
  );
};
