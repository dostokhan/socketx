const COLORS = [
  'blue',
  'red',
  'green',
  'orange',
  'yellow',
  'magenta',
  'cyan',
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
];



export const createChartData = (datapoints) => {
  let users  = {};
  let lineChartData = {
    type: 'scatter',
    data: {
        datasets: []
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom'
            }]
        }
    }
  };


  datapoints.forEach((datapoint) => {
    if (!users[datapoint.user.username]) {
      users[datapoint.user.username] = [];
    }
    users[datapoint.user.username].push({ x: datapoint.x, y: datapoint.y });
  });

  Object.keys(users).forEach((username, index) => {
    lineChartData.data.datasets.push({
        label: username,
        borderColor: COLORS[index],
        backgroundColor: COLORS[index],
        fill: false,
        data: users[username],
    });
  });

  return lineChartData;

  // return {
  //     type: 'line',
  //       data: {
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //             ],
  //             borderColor: [
  //                 'rgba(255,99,132,1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero:true
  //                 }
  //             }]
  //           }
  //         }
  //   };
};
