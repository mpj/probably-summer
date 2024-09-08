---
title: Lol some temps
---


```js
const temps = FileAttachment("data/tempbulk.csv").csv()
```

```js
const tempsDecorated = temps.map(d => {
  let date = new Date(d.time)
  return {
    dateKey: d.time,
    date,
    tavg: parseFloat(d.tavg),
    tmax: parseFloat(d.tmax),
    tmin: parseFloat(d.tmin),
    year: date.getFullYear()
  }

})

```

```js
tempsDecorated
```


```js
const getDayOfYear = (d) => {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};
```

```js
const groupedData = {};
tempsDecorated.forEach(({ date, tmax }) => {
  const dayOfYear = getDayOfYear(date);
  if (!groupedData[dayOfYear]) groupedData[dayOfYear] = [];
  groupedData[dayOfYear].push(tmax);
});

const calculatePercentile = (data, threshold) => {
  const count = data.filter(temp => temp > threshold).length;
  return (count / data.length) * 100;
};

const thresholds = [10, 12, 15, 17, 18, 20, 22, 24, 26]; // Thresholds for calculating percentiles

const percentileProbabilities = {};
Object.keys(groupedData).forEach(dayOfYear => {
  const temps = groupedData[dayOfYear];
  percentileProbabilities[dayOfYear] = thresholds.map(threshold => ({
    threshold,
    probability: calculatePercentile(temps, threshold)
  }));
});
```

```js
const dayOfInterest = getDayOfYear(new Date('2024-09-08'));
const probabilitiesDayOfInterest = percentileProbabilities[dayOfInterest];
```

```js
const daysWithProbabilities = tempsDecorated.map(d => {
  const dayOfYear = getDayOfYear(d.date)
  const probabilities = percentileProbabilities[dayOfYear]
  return {
    ...d,
    probabilities
  }
})
```

```js
daysWithProbabilities
```

# On sept 8th, the probability of the temp being above a certain threshold

${probabilitiesDayOfInterest.map(p => ` - ${p.threshold}°C: ${p.probability}%`)}




```js
Plot.plot({
  height: 800 ,
  width: 1200,
  y: { type: "pow",  domain: [ -20, 26, ], ticks: 20, grid: true },
  marks: [
    Plot.lineY(tempsDecorated, {x: "date", y: "tavg", z: "year"}),
    Plot.linearRegressionY(tempsDecorated, {x: "date", y: "tavg", stroke: "red"}),

  ]
})
```


```js
Plot.lineY( tempsDecorated, {x: "date", y: "tavg", z: "year"}).plot()
```