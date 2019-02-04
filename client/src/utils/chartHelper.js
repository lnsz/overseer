/*
  Converts from:

  "data" : [
    {
      "label": "Completed",
      "backgroundColor": "#41B883",
      "value": 4
    },
    {
      "label": "In Progress",
      "backgroundColor": "#E46651",
      "value": 10
    },
  ]

  To:
  "data" : {
    "labels" : [
      "Completed",
      "In Progress"
    ],
    "datasets" : [
      {
        "label" : "Data One",
        "backgroundColor" : [
          "#41B883",
          "#E46651"
        ],
        "data" : [
          4,
          10
        ]
      }
    ]
  }

 */
export const getChartData = (data) => {
  let chartData = {
    'labels': [],
    'datasets': [{
      'label': 'Data One',
      'backgroundColor': [],
      'data': []
    }]
  }
  data.forEach((item) => {
    chartData.labels.push(item.label)
    chartData.datasets[0].backgroundColor.push(item.backgroundColor)
    chartData.datasets[0].data.push(item.value)
  })
  return chartData
}
