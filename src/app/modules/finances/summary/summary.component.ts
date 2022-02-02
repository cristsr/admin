import { Component, OnInit } from '@angular/core';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  expenseView: 'daily' | 'weekly' | 'monthly' = 'daily';

  chartGender = {
    chart: {
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false
        }
      },
      fontFamily: 'inherit',
      foreColor: 'inherit',
      height: '100%',
      type: 'donut',
      sparkline: {
        enabled: true
      }
    },
    colors: ['#319795', '#4FD1C5'],
    labels: [
      'Male',
      'Female'
    ],
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
        donut: {
          size: '70%'
        }
      }
    },
    series: [55, 45],
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    tooltip: {
      enabled: true,
      fillSeriesColor: false,
      theme: 'dark',
      custom: ({seriesIndex, w}): string => `
        <div class="flex items-center h-8 min-h-8 max-h-8 px-3">
           <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
           <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
           <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}%</div>
        </div>
      `
    }
  };

  pieOptions: ApexOptions = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: 'donut',
      width: '100%',
    },
    labels: [
      'Team Team', 'Team B', 'Team C', 'Team D', 'Team E'
    ],
    plotOptions: {
      pie: {
        customScale: 0.9,
        expandOnClick: false,
      }
    },
    states: {
      hover: {
        filter: {
          type: 'none'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    legend: {
      show: true,
      position: 'right',
      horizontalAlign: 'center',
    },
  };

  chartOptions: ApexOptions = {
    series: [
      {
        name: 'Gastos',
        data: [50000, 150000, 60000, 30000, 100000, 12300, 8000]
      },
    ],
    chart: {
      fontFamily: 'inherit',
      foreColor: 'inherit',
      width: '100%',
      type: 'bar',
      background: 'white',
      animations: {
        speed: 400,
        animateGradually: {
          enabled: false
        }
      },
      sparkline: {
        enabled: false
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#EF4444', '#0b3af5'],
    dataLabels: {
      textAnchor: 'middle',
      enabled: true,
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
    grid: {
      show: false,
      borderColor: 'gray',
    },
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    legend: {
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
    states: {
      hover: {
        filter: {
          type: 'darken',
          value: 0.75
        }
      }
    },
    stroke: {
      curve: 'smooth',
      show: false,
      width: [6, 4]
    },
    tooltip: {
      enabled: true,
      followCursor: true,
      theme: 'dark'
    },
    xaxis: {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: false,
        color: 'green'
      },
      labels: {
        style: {
          colors: 'rgba(14,20,28,0.68)',
          fontWeight: 500,
        },
      },
      tooltip: {
        enabled: false
      },
    },
    yaxis: {
      show: false,
      axisBorder: {
        show: true
      },
      labels: {
        // offsetX: -16,
        style: {
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

  ngOnInit(): void {
  }

  onclick(event: any): void {
    console.log(event);
  }

  openDialog(): void {

  }
}
