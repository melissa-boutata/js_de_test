const dataset = [
  {
    "Cheese": 22.2,
    "CHOCOLATE": 10.3,
    "Impulse": 1.5,
    "period": "2021_26"
  },
  {
    "Cheese": 21.8,
    "CHOCOLATE": 9.8,
    "Impulse": 1.5,
    "period": "2021_27"
  },
  {
    "Cheese": 21.2,
    "CHOCOLATE": 9.7,
    "Impulse": 1.4,
    "period": "2021_28"
  }
];

/**
 * calculates the average of the numerical values inside a record in the dataset
 * @param {*} value A record from the dataset
 * @returns the calculated average of the values of the passed record
 */
const calculateAverage = (record) => {
  let average = 0;
  for (let key in record) {
    if(key !== "period") {
     average += record[key] / 3; 
    }
  }
  return average
}

/**
 * Prepares the data by adding a new element to each record in the dataset.
 * The element that is added for now is 'Average', its value is obtained using calculateAverage()
 * @param {*} rawData Array of raw data
 * @returns Array of prepared data
 */ 
const prepareData = (rawData) => {
  return rawData.map(record => ({...record, Average: calculateAverage(record)}));
}

/**
 * Generates the graph based on the values passed through props
 * @param {*} preparedData The data prepared using prepareData function
 */
const generateGraph = (preparedData) => {
  let graphValues = [
    {
      label: "Cheese",
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      data: [],
    },
    {
      label: "CHOCOLATE",
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      data: [],
    },
    {
      label: "Impulse",
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      data: [],
    },
    {
      label: "Average",
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      data: [],
    }
  ];
  
  for (const graphValue of graphValues) {
    const {label} = graphValue;
    for (const record of preparedData) {
      // Fill the array 'data' in graphValues with the values of the element in dataset records that 
      // has the same name as the label of the graphValues
      graphValue.data.push(record[label]);
    }
  }
  // The for-function above could be replaced by the line below, but we will keep the for-function for readability 
  // preparedData.forEach(record => graphValue.data.push(record[graphValue.label]))

  const context = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(context, {
    type: 'line',
    data: {
      // The labels in the graph are the 'period' element of each record in the dataset
      labels: preparedData.map(element => element.period),
      datasets: graphValues
    }
  });
}

/** Call the functions to prepare the data and display the graph  **/ 
const preparedData= prepareData(dataset);
generateGraph(preparedData);