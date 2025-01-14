"use client";

import NumberFlow from "@number-flow/react";
import { useEffect, useState } from "react";

import {
  daysLeftUntilEndOfYear,
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

  const [userLocale, setUserLocale] = useState(navigator.language);

  const firstDayOfYear = new Date(selectedDate.getFullYear(), 0, 1);

  useEffect(() => {
    setSelectedDate(new Date());
    setUserLocale(navigator.language || "fr-FR");
  }, [date]);

  function generateCalendar(
    startDate: string | number | Date,
    numWeeks: number
  ) {
    const calendar: Record<string, Record<string, string>> = {};
    const daysOfWeek = ["l", "m", "mer", "j", "v", "s", "d"];

    const currentDate = new Date(startDate);
    const startDayIndex = currentDate.getDay();

    // Ajuster pour que lundi soit le premier jour
    const adjustedStartIndex = startDayIndex === 0 ? 6 : startDayIndex - 1;

    for (let week = 1; week <= numWeeks; week++) {
      const weekKey = week.toString();
      calendar[weekKey] = {};

      daysOfWeek.forEach((day, index) => {
        if (week === 1 && index < adjustedStartIndex) {
          // Ajouter des jours vides avant la première date valide
          calendar[weekKey][day] = "";
        } else {
          calendar[weekKey][day] = currentDate.toISOString();
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    }

    return calendar;
  }

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
            <button onClick={() => setSelectedDate(new Date())}>🗓️</button>{" "}
            <NumberFlow value={getWeekNumber(selectedDate)} />
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
            <div key={index} className="flex flex-row  p-px">
              {Object.entries(weekNumber).map(([day, date]) => {
                if (
                  new Date(date).getFullYear() !== selectedDate.getFullYear()
                ) {
                  return (
                    <div key={day} className={styles.calendar__day}>
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
      <div className="flex justify-center p-2.5">
        <span className="text-white font-bold text-m">
          {" "}
          <NumberFlow value={daysLeftUntilEndOfYear(selectedDate)} /> jours
          avant {selectedDate.getFullYear() + 1} 🎉
        </span>
      </div>
    </div>
  );
};
