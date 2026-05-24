import "./styles.css";

import { useState, useEffect } from "react";
import Card from "./Card.jsx";

export default function App() {
  const [inp, setInp] = useState(localStorage.getItem("inp") || "");
  const [array, setArray] = useState([0]);
  const [arrayInOrder, setArrayInOrder] = useState([0]);

  const [mean, setMean] = useState(0);
  const [median, setMedian] = useState(0);
  const [range, setRange] = useState(0);
  const [sum, setSum] = useState(0);
  const [mode, setMode] = useState(0);
  const [variance, setVariance] = useState(0);

  const [warnHidden, setWarnHidden] = useState(true);

  const allowed = /^(10|[1-9])(,(10|[1-9]))*$/;

  function getMin(array) {
    let min = array[0];

    for (let i = 0; i < array.length; i++) {
      if (array[i] < min) {
        min = array[i];
      }
    }
    return min;
  }
  function getMax(array) {
    let max = array[0];

    for (let i = 0; i < array.length; i++) {
      if (array[i] > max) {
        max = array[i];
      }
    }
    return max;
  }
  function getMedian(sortedArray) {
    if (sortedArray.length % 2 == 0) {
      let index = sortedArray.length / 2;

      let avg = (sortedArray[index] + sortedArray[index - 1]) / 2;

      return avg;
    } else {
      return sortedArray[Math.trunc(sortedArray.length / 2)];
    }
  }

  function handleInpChange(val) {
    let globalArray;
    setWarnHidden(true);
    if (val.includes(" ")) {
      globalArray = val
        .split(" ")
        .filter((x) => x !== "")
        .map(Number);
    } else {
      globalArray = val
        .split(",")
        .filter((x) => x !== "")
        .map(Number);
    }

    if (globalArray.includes(NaN)) {
      setWarnHidden(false);
    }

    const sortedArray = globalArray.sort((a, b) => a - b);

    setArrayInOrder(`${sortedArray}`);
    setMode(`${getMode(globalArray)}`);
    setSum(globalArray.reduce((acc, value) => acc + value, 0));
    setMean(
      +(
        globalArray.reduce((acc, value) => acc + value, 0) / globalArray.length
      ).toFixed(2)
    );
    setMedian(() => {
      if (Number.isNaN(getMedian(globalArray))) {
        return 0;
      } else {
        return getMedian(globalArray);
      }
    });
    setRange(getMax(globalArray) - getMin(globalArray));
    setVariance(globalArray.length);
  }
  function getMode(array) {
    let frequencies = {};

    array.forEach((n) => (frequencies[n] = (frequencies[n] || 0) + 1));

    const max = Math.max(...Object.values(frequencies));

    if (max == 1) {
      return "none";
    } else {
      return Object.keys(frequencies)
        .filter((k) => frequencies[k] === max)
        .map(Number);
    }
  }
  function getVariance(array) {
    return array.length;
  }

  useEffect(() => {
    localStorage.setItem("inp", inp);
    handleInpChange(inp);
  }, [inp]);

  return (
    <div className="App">
      <p style={{ position: "absolute" }}>
        <i>made by nick btw</i>
      </p>
      <div
        style={{
          display: "grid",
          gap: "10px",
          placeItems: "center",
          gridTemplateColumns: "repeat(2, 200px)",
          gridTemplateRows: "repeat(2, 125px)",
          justifyContent: "center",
        }}>
        <Card
          title="Mean"
          number={mean}></Card>
        <Card
          title="Median"
          number={median}></Card>
        <Card
          title="Mode"
          number={mode}></Card>
        <Card
          title="Range"
          number={range}></Card>
        <Card
          title="Sum of Array"
          number={sum}></Card>
        <Card
          title="Length"
          number={variance}></Card>
      </div>
      <p
        style={{
          spacing: "3px",

          display: "flex",
          justifyContent: "center",
        }}>
        Array in arranging order:
      </p>
      <h1>{arrayInOrder}</h1>
      <p
        style={{ color: "red" }}
        hidden={warnHidden}>
        Invalid Array
      </p>

      <hr />
      <input
        type="text"
        placeholder="Enter array of numbers"
        value={inp}
        onChange={(event) => {
          if (/^[0-9 ,]*$/.test(event.target.value)) {
            setInp(event.target.value);
            handleInpChange(event.target.value);
          }
        }}
      />
    </div>
  );
}
