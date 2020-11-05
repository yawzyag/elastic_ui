import React, { useState } from "react";
import { EuiDatePicker, EuiDatePickerRange } from "@elastic/eui";
import moment from "moment";

export const Demo = (props: any) => {
  const [startDate, setStartDate] = useState<any>(moment());
  const [endDate, setEndDate] = useState<any>(moment().add(11, "d"));

  const handleChangeStart = (date: any) => {
    setStartDate(date);
  };

  const handleChangeEnd = (date: any) => {
    setEndDate(date);
  };

  return (
    <EuiDatePickerRange
      startDateControl={
        <EuiDatePicker
          selected={startDate}
          onChange={handleChangeStart}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="Start date"
          showTimeSelect
        />
      }
      endDateControl={
        <EuiDatePicker
          selected={endDate}
          onChange={handleChangeEnd}
          startDate={startDate}
          endDate={endDate}
          isInvalid={startDate > endDate}
          aria-label="End date"
          showTimeSelect
        />
      }
    />
  );
};

export default Demo;
