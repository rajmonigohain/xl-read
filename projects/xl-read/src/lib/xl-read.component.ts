import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'lib-xl-read',
  template: `
  <div><input type="file" #file (change)="onFilesAdded($event)" /></div>
  <div #container id="no-more-tables"></div>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" *ngFor="let list of sheets;let i=index;" (click)="loadSheet(list,i)">
      <a class="nav-link" [ngClass]="{'active-tab':currentIndex==i}" data-toggle="tab" href="#home">
        {{list}}
      </a>
    </li>
  </ul>
  <div class="tab-content">
    <div id="home" class="tab-pane active">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8" *ngIf="headerx" style="width: 100%;">
        <ng-container [matColumnDef]="column" *ngFor="let column of headerx">
          <th mat-header-cell *matHeaderCellDef> {{column}} </th>
          <td mat-cell *matCellDef="let element"> {{element[column]}} </td>
        </ng-container>
  
        <tr mat-header-row *matHeaderRowDef="headerx"></tr>
        <tr mat-row *matRowDef="let row; columns:headerx;"></tr>
      </table>
      <mat-paginator [length]="totalData" style="width: 100%;display: flex; justify-content: center" [pageSize]="'10'"
        [pageSizeOptions]="[5, 10, 15]">
      </mat-paginator>
    </div>
  </div>
  `,
  styles: [
    ` .active-tab {
      background: lavender;
    }`
  ]
})
export class XlReadComponent implements OnInit {

  title = 'excelReader9';
  // @Input('xlConfig') configData: any;
  data;
  global;
  headerx: any;
  excelData: any;
  slIndex;
  workBook;
  totalData = 1000;
  dataSource: MatTableDataSource<any>;
  sheets: any = [];
  currentIndex: any;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(public renderer: Renderer2) { }

  onFilesAdded(event) {
    const target: DataTransfer = <DataTransfer>event.target;
    this.sheets = []
    if (target.files.length !== 1) { throw new Error('Cannot use multiple files'); }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
      this.workBook = wb;

      /* grab first sheet */
      for (let i = 0; i < wb.SheetNames.length; i++) {
        this.sheets.push(wb.SheetNames[i])
      }
      this.loadSheet(wb.SheetNames[0], 0)
    };
    reader.readAsBinaryString(target.files[0]);
  }

  ngAfterViewInit() { }

  loadSheet(sheetName, index) {
    this.currentIndex = index;
    const wsname: string = sheetName
    const ws: XLSX.WorkSheet = this.workBook.Sheets[wsname];
    const range = XLSX.utils.decode_range(this.workBook.Sheets[wsname]['!ref']);
    range.s.r = 0;
    this.workBook.Sheets[wsname]['!ref'] = XLSX.utils.encode_range(range);
    this.data = <any>XLSX.utils.sheet_to_json(ws);
    this.headerx = this.get_header_row(ws);
    this.excelData = this.data;
    this.dataSource = new MatTableDataSource(this.excelData);
    this.dataSource.paginator = this.paginator;
  }

  get_header_row(sheet) {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet['!ref']);
    let C,
      R = range.s.r; /* start in the first row */
    console.log('header range===>>>', range.e.c);
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      const cell =
        sheet[
        XLSX.utils.encode_cell({
          c: C,
          r: R
        })
        ];

      let hdr = 'UNKNOWN ' + C; // <-- replace with your desired default
      if (cell && cell.t) { hdr = XLSX.utils.format_cell(cell); }
      if (
        hdr.indexOf('UNKNOWN') == -1 &&
        hdr.indexOf('Fill data from this row') == -1
      ) {
        headers.push(hdr);
      }
    }

    return headers;
  }

  ngOnInit() { }

}
