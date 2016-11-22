import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { SettingsService } from '../../shared/settings/settings.service';

@Component({
	moduleId: module.id,
	selector: 'settings-grid',
	templateUrl: 'settings-grid.component.html'
})

export class SettingsGridComponent implements OnInit {
	public rows: Array<any> = [];
	public allColumns: Array<any> = [
		{
			title: 'Application',
			name: 'application',
			sort: false,
			filtering: { filterString: '', placeholder: 'Filter by application' }
		},
		{
			title: 'Environment',
			name: 'environment',
			sort: false,
			filtering: { filterString: '', placeholder: 'Filter by environment' }
		},
		{
			title: 'Fullpath',
			name: 'fullpath',
			sort: false,
			filtering: { filterString: '', placeholder: 'Filter by fullpath' }
		},
		{
			title: 'Updated',
			name: 'updated',
			sort: true
		}
	];

	public availableColumns: Array<any>;

	public page: number = 1;
	public itemsPerPage: number = 10;
	public maxSize: number = 5;
	public numPages: number = 1;
	public length: number = 0;
	public currentApp: string = null;
	public currentEnv: string = null;

	public config: any = {
		paging: true,
		sorting: { columns: this.availableColumns },
		filtering: { filterString: '' },
		className: ['table-bordered', 'table-hover', 'table-pointer']
	};

	private data: Array<any> = [];

	public constructor(private router: Router,
		private settingsService: SettingsService,
		private activeRoute: ActivatedRoute) {
		this.length = this.data.length;
	}

	public ngOnInit(): void {

		this.activeRoute.params.forEach((params: Params) => {
			let app = params['app'];
			let env = params['env'];

			this.availableColumns = this.allColumns;
			if (app != null) {
				this.availableColumns = this.availableColumns.filter((v, i) => v.name !== 'application');
				this.currentApp = app;
			}
			if (env != null) {
				this.availableColumns = this.availableColumns.filter((v, i) => v.name !== 'environment');
				this.currentEnv = env;
			}

			this.settingsService.getSettings(app, env, false)
				.then(res => {
					this.data = res;
					this.onChangeTable(this.config);
				})
				.catch(e => {
					//
				});
		});
	}

	public changePage(page: any, data: Array<any> = this.data): Array<any> {
		let start = (page.page - 1) * page.itemsPerPage;
		let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
		return data.slice(start, end);
	}

	public changeSort(data: any, config: any): any {
		if (!config.sorting) {
			return data;
		}

		let columns = this.config.sorting.columns || [];
		let columnName: string = void 0;
		let sort: string = void 0;

		for (let i = 0; i < columns.length; i++) {
			if (columns[i].sort !== '' && columns[i].sort !== false) {
				columnName = columns[i].name;
				sort = columns[i].sort;
			}
		}

		if (!columnName) {
			return data;
		}

		// simple sorting
		return data.sort((previous: any, current: any) => {
			if (previous[columnName] > current[columnName]) {
				return sort === 'desc' ? -1 : 1;
			} else if (previous[columnName] < current[columnName]) {
				return sort === 'asc' ? -1 : 1;
			}
			return 0;
		});
	}

	public changeFilter(data: any, config: any): any {
		let filteredData: Array<any> = data;
		this.availableColumns.forEach((column: any) => {
			if (column.filtering) {
				filteredData = filteredData.filter((item: any) => {
					return item[column.name].match(column.filtering.filterString);
				});
			}
		});

		if (!config.filtering) {
			return filteredData;
		}

		if (config.filtering.columnName) {
			return filteredData.filter((item: any) =>
				item[config.filtering.columnName].match(this.config.filtering.filterString));
		}

		let tempArray: Array<any> = [];
		filteredData.forEach((item: any) => {
			let flag = false;
			this.availableColumns.forEach((column: any) => {
				if (item[column.name].toString().match(this.config.filtering.filterString)) {
					flag = true;
				}
			});
			if (flag) {
				tempArray.push(item);
			}
		});
		filteredData = tempArray;

		return filteredData;
	}

	public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
		if (config.filtering) {
			Object.assign(this.config.filtering, config.filtering);
		}

		if (config.sorting) {
			Object.assign(this.config.sorting, config.sorting);
		}

		let filteredData = this.changeFilter(this.data, this.config);
		let sortedData = this.changeSort(filteredData, this.config);
		this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
		this.length = sortedData.length;
	}

	public onCellClick(data: any): any {
		// navigating to setting detail
		if (data != null && data.row != null && data.row.id != null) {
			// TODO: perform this transformations generically
			this.router.navigate(['settings', data.row.application, data.row.environment, data.row.id, 'detail']);
		}
	}
}
