import { Component, OnInit } from '@angular/core';
import {TotalRevenue} from '../../../../models/total-revenue';
import {BrandService} from '../../../../services/brand.service';

@Component({
  selector: 'app-brand-statistical',
  templateUrl: './brand-statistical.component.html',
  styleUrls: ['./brand-statistical.component.scss']
})
export class BrandStatisticalComponent implements OnInit {
// tslint:disable-next-line:ban-types
  type = 'msline';
  dataFormat = 'json';
  data: any;
  dataSource = new Object();
  totalRevenue: TotalRevenue[];

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.brandService.statistical().subscribe(next => {
      this.totalRevenue = next;
      this.data = {
        chart: {
          caption: 'Doanh thu của sản phẩm từ 01/2019 đến 01/2020',
          subCaption: 'Thống kê tính theo số lượng bán ra',
          xAxisName: 'Sản Phẩm',
          yAxisName: 'Doanh thu bán hàng',
          numberSuffix: 'Tr',
          theme: 'fusion'
        },
        categories: [
          {
            category: [
              {
                label: this.totalRevenue[0].productName
              },
              {
                label: this.totalRevenue[1].productName
              },
              {
                label: this.totalRevenue[2].productName
              },
              {
                label: this.totalRevenue[3].productName
              },
              {
                label: this.totalRevenue[4].productName
              },
              {
                label: this.totalRevenue[5].productName
              },
              {
                label: this.totalRevenue[6].productName
              },
              {
                label: this.totalRevenue[7].productName
              },
              {
                label: this.totalRevenue[8].productName
              },
              {
                label: this.totalRevenue[9].productName
              },
            ]
          }
        ],
        dataset: [
          {
            data: [
              {
                value: this.totalRevenue[0].total
              },
              {
                value: this.totalRevenue[1].total
              },
              {
                value: this.totalRevenue[2].total
              },
              {
                value: this.totalRevenue[3].total
              },
              {
                value: this.totalRevenue[4].total
              },
              {
                value: this.totalRevenue[5].total
              },
              {
                value: this.totalRevenue[6].total
              },
              {
                value: this.totalRevenue[7].total
              },
              {
                value: this.totalRevenue[8].total
              },
              {
                value: this.totalRevenue[9].total
              },
            ]
          }
        ]
      };
      this.dataSource = this.data;
    });
  }
}

