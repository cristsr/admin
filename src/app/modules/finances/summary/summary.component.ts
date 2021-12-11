import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  expenseView: 'daily' | 'weekly' | 'monthly' = 'daily';

  chartOptions: ApexOptions = {
    series: [
      {
        name: 'Gastos',
        data: [50000, 150000, 60000, 30000, 100000, 12300, 8000]
      },
    ],
    chart: {
      fontFamily: 'inherit',
      foreColor : 'inherit',
      // height: 200,
      width     : '100%',
      type: 'bar',
      background: 'white',
      animations: {
        speed           : 400,
        animateGradually: {
          enabled: false
        }
      },
      sparkline : {
        enabled: false
      },
      toolbar   : {
        show: false
      },
      zoom      : {
        enabled: false
      }
    },
    colors     : ['#EF4444', '#0b3af5', ],
    dataLabels : {
      textAnchor: 'middle',
      enabled : true,
      style: {
        colors: ['black'],
        fontSize: '10px',
      },
      offsetY: -18
      // enabledOnSeries: [0],
    },
    fill: {
      colors: undefined,
      opacity: 0.4,
      type: 'solid',
    },
    grid       : {
      show: false,
      borderColor: 'gray',
      // padding    : {
      //   top   : 0,
      //   bottom: 0,
      //   left  : 0,
      //   right : 0
      // },
      // position: 'back',
      // xaxis: {
      //   lines: {
      //     offsetX: 0.5,
      //     offsetY: 0.5
      //   }
      // }
    },
    labels  : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    legend     : {
      show: true
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top'
        },
        borderRadius: 5,
        // horizontal: false
        columnWidth: '50%'
      }
    },
    states     : {
      hover: {
        filter: {
          type : 'darken',
          value: 0.75
        }
      }
    },
    stroke     : {
      curve: 'smooth',
      show: false,
      width: [6, 4]
    },
    tooltip    : {
      enabled: true,
      followCursor: true,
      theme       : 'dark'
    },
    xaxis: {
      axisBorder: {
        show: true
      },
      axisTicks : {
        show: false,
        color: 'green'
      },
      labels    : {
        style: {
          colors: 'rgba(14,20,28,0.68)',
          fontWeight: 500,
        },
      },
      tooltip   : {
        enabled: false
      },
    },
    yaxis      : {
      show: false,
      axisBorder: {
        show: true
      },
      labels: {
        // offsetX: -16,
        style  : {
          colors: 'gray'
        }
      }
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          plotOptions: {
            bar: {
              dataLabels: {
                position: 'top'
              },
              // borderRadius: 5
              // horizontal: false
              // columnWidth: '50%'
            }
          },
        }
      }
    ]
  };

  chartDonutOptions: ApexOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: 'donut',
      height: 200
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  doughnut = {
    label: 'Ingresos',
    data: [
      {
        label: 'Sueldo',
        value: 3000000,
        color: '#26de81'
      },
      {
        label: 'Acciones',
        value: 300000,
        color: '#fed330'
      },
      {
        label: 'Acciones2',
        value: 200000,
        color: '#fc5c65'
      },
      {
        label: 'otra',
        value: 200001,
        color: '#fc5c65'
      }
    ],
    options: {
      hoverOffset: 0,
      cutout: 55,
      padding: 0,
      textCenter: false
    }
  };

  doughnut2 = {
    label: 'Ingresos',
    data: [
      {
        label: 'Sueldo',
        value: 3000000,
        color: '#26de81'
      },
      {
        label: 'Acciones',
        value: 300000,
        color: '#fed330'
      },
      {
        label: 'Acciones2',
        value: 200000,
        color: '#fc5c65'
      },
      {
        label: 'otra',
        value: 200001,
        color: '#fc5c65'
      }
    ],
    options: {
      hoverOffset: 0,
      cutout: 50,
      padding: 0,
      textCenter: false
    }
  };

  ngOnInit(): void {
  }

  onclick(event: any): void {
    console.log(event);
  }
}
