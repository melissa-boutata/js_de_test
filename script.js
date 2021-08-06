const data = [
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

// A function to prepare the data that'll be displayed in the chart
const prepareData = () => {
  
  const dataWithTotal = [];

  // Loop over our data and calculate the total 
  data.forEach((value,index)=> {
      const temp = value;
      total=0; 

      for (let key in value) {
        if(key !== "period") {
          total += value[key];
        }
      }
      temp.total = total / 3;
      dataWithTotal.push(temp);
  });
    
    // Get th different periods
    const labels =[];
    for (let i = 0; i < dataWithTotal.length; i++) {
      labels.push(dataWithTotal[i]['period']);
    }

  return {labels, dataWithTotal};
}

const generateGraph = (data) => {
  
  const graphValues = [];
  const keys = Object.keys(data.dataWithTotal[0]);
  
  keys.forEach((key,index)=> {
    if(key !== "period") {
     let temp = {
        label: key, 
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ], 
      };
      for (let n = 0; n < data.dataWithTotal.length; n++) {
         temp.data.push(data.dataWithTotal[n][key])
       }
        
      graphValues.push(temp);
    }
  });
  
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: graphValues
    }
  });
}

// Call the functions to prepare the data and display the graph 
const preparedData= prepareData();
console.log(preparedData);
generateGraph(preparedData);