import { Component } from '@angular/core';
import { marker as gettext } from '@biesbjerg/ngx-translate-extract-marker';

import { DatatablePageConfig } from '~/app/core/components/limn-ui/models/datatable-page-config.type';

@Component({
  template: '<omv-limn-datatable-page [config]="this.config"></omv-limn-datatable-page>'
})
export class RsyncTaskDatatablePageComponent {
  public config: DatatablePageConfig = {
    autoReload: false,
    stateId: 'cf6a2c62-fdf5-4c6e-b315-25b06a756668',
    sorters: [
      {
        dir: 'asc',
        prop: 'srcname'
      }
    ],
    store: {
      proxy: {
        service: 'Rsync',
        get: {
          method: 'getList'
        }
      }
    },
    columns: [
      {
        name: gettext('Enabled'),
        prop: 'enable',
        flexGrow: 1,
        sortable: true,
        cellTemplateName: 'checkIcon'
      },
      {
        name: gettext('Scheduling'),
        prop: '',
        flexGrow: 1,
        cellTemplateName: 'template',
        cellTemplateConfig:
          '{% set _minute = minute %}' +
          '{% set _hour = hour %}' +
          '{% set _dayofmonth = dayofmonth %}' +
          '{% if everynminute %}{% set _minute %}*/{{ minute }}{% endset %}{% endif %}' +
          '{% if everynhour %}{% set _hour %}*/{{ hour }}{% endset %}{% endif %}' +
          '{% if everyndayofmonth %}{% set _dayofmonth %}*/{{ dayofmonth }}{% endset %}{% endif %}' +
          '{{ _minute }} {{ _hour }} {{ _dayofmonth }} {{ month }} {{ dayofweek }}'
      },
      {
        name: gettext('Type'),
        prop: 'type',
        flexGrow: 1,
        sortable: true,
        cellTemplateName: 'chip',
        cellTemplateConfig: {
          map: {
            local: { value: gettext('Local') },
            remote: { value: gettext('Remote') }
          }
        }
      },
      {
        name: gettext('Source'),
        prop: 'srcname',
        flexGrow: 1,
        sortable: true
      },
      {
        name: gettext('Destination'),
        prop: 'destname',
        flexGrow: 1,
        sortable: true
      },
      {
        name: gettext('Comment'),
        prop: 'comment',
        flexGrow: 1,
        sortable: true
      }
    ],
    actions: [
      {
        template: 'create',
        execute: {
          type: 'url',
          url: '/services/rsync/tasks/create'
        }
      },
      {
        template: 'edit',
        execute: {
          type: 'url',
          url: '/services/rsync/tasks/edit/{{ _selected[0].uuid }}'
        }
      },
      {
        type: 'iconButton',
        icon: 'start',
        tooltip: gettext('Run'),
        enabledConstraints: {
          minSelected: 1,
          maxSelected: 1
        },
        execute: {
          type: 'taskDialog',
          taskDialog: {
            config: {
              title: gettext('Run rsync task'),
              request: {
                service: 'Rsync',
                method: 'execute',
                params: {
                  uuid: '{{ _selected[0].uuid }}'
                }
              }
            }
          }
        }
      },
      {
        template: 'delete',
        execute: {
          type: 'request',
          request: {
            service: 'Rsync',
            method: 'delete',
            params: {
              uuid: '{{ uuid }}'
            }
          }
        }
      }
    ]
  };
}
