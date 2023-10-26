"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { ja } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Icon from "../elements/icons";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  selectedDate?: Date;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  onDayClick,
  selectedDate,
}: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      locale={ja}
      today={selectedDate}
      selected={selectedDate}
      captionLayout="dropdown-buttons"
      fromYear={1987}
      toYear={new Date().getFullYear() + 10}
      onDayClick={onDayClick}
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        vhidden: "hidden",
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium hidden",
        caption_dropdowns: "flex flex-row-reverse space-x-2",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-Sumi-500 rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-Sumi-100 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        day_selected:
          "bg-light-Button-Active text-white hover:bg-light-Button-Active hover:text-Sumi-50 focus:bg-light-Button-Active focus:text-Sumi-50",
        day_today: "bg-Sumi-100 text-black",
        day_outside: "text-Sumi-500 opacity-50",
        day_disabled: "text-Sumi-500 opacity-50",
        day_range_middle:
          "aria-selected:bg-Sumi-100 aria-selected:text-Sumi-900",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <Icon name="navigateBefore" />,
        IconRight: () => <Icon name="navigateNext" />,
      }}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
