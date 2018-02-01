import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { CybercoNg2Module } from '../cyberco-ng2/cyberco-ng2.module';

import { routing } from './projects.routing';

import { PipeRowComponent } from './edit-project/components/shared/pipe-row.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { PipeStepRowComponent } from './edit-project/components/shared/pipe-step-row.component';
import { PipePublicTodoComponent } from './edit-project/components/pipe-public-todo/pipe-public-todo.component';
import { PipePrivateTodoComponent } from './edit-project/components/pipe-private-todo/pipe-private-todo.component';

import { SmartsheetConnectionPublicComponent } from './edit-project/components/pipe-public-todo/smartsheet-connection-public.component';
import { SmartsheetConnectionPrivateComponent } from './edit-project/components/pipe-private-todo/smartsheet-connection-private.component';
import { SmartsheetConnectionComponent } from './edit-project/components/shared/smartsheet-connection/smartsheet-connection.component';
import { ColumnsMatchingComponent } from './edit-project/components/shared/columns-matching/columns-matching.component';

import { PipeSettingsPrivateComponent } from './edit-project/components/pipe-private-todo/pipe-settings-private.component';
import { PipeSettingsPublicComponent } from './edit-project/components/pipe-public-todo/pipe-settings-public.component';
import { PipeSettingsComponent } from './edit-project/components/shared/pipe-settings/pipe-settings.component';

import { IndexComponent } from './index/index.component';

import { SyncSessionsComponent } from './sync-sessions/sync-sessions.component';
import { SyncSessionsListComponent } from './sync-sessions/list/sync-sessions-list.component';

import { SyncSessionRowComponent } from './sync-sessions/sync-session-row/sync-session-row.component';

import { ItemChangesComponent } from './sync-sessions/item-changes/item-changes.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ItemChangesDetailComponent } from './sync-sessions/item-changes/item-changes-detail/item-changes-detail.component';
import { ItemChangesRowComponent } from './sync-sessions/item-changes/item-changes-row/item-changes-row.component';
import { ProjectSettingsComponent } from './edit-project/components/project-settings/project-settings.component';
import { StatusRowComponent } from './edit-project/components/shared/status-row/status-row.component';
import { DeleteProjectComponent } from './delete-project/delete-project.component';
import { PipeTasksTodoComponent } from './edit-project/components/pipe-tasks/pipe-tasks.component';
import { SmartsheetConnectionTasksComponent } from './edit-project/components/pipe-tasks/smartsheet-connection-tasks.component';
import { TasksSettingsComponent } from './edit-project/components/pipe-tasks/tasks-settings/tasks-settings.component';
import { PipeDeleteComponent } from './edit-project/components/shared/pipe-delete/pipe-delete.component';
import { WorkspaceManagementComponent } from './edit-project/components/project-settings/workspace-management/workspace-management.component';

import { ChartComponent } from './chart/chart.component';
import { CreateBaselineDialog } from './chart/create-baseline.dialog';
import { ScheduleConnectionComponent } from './edit-project/components/shared/schedule-connection/schedule-connection.component';
import { TaskNotificationsComponent } from './edit-project/components/project-settings/task-notifications/task-notifications.component';
import { ChartWorkingDaysComponent } from './edit-project/components/shared/chart-working-days/chart-working-days.component';
import { PrimaryBillingUser } from './edit-project/components/project-settings/primary-billing-user/primary-billing-user.component';
import { CanDeactivateChart } from './chart/chart.deactivate';
import { SmartsheetScheduleChooseComponent } from './edit-project/components/shared/smartsheet-schedule-choose/smartsheet-schedule-choose.component';
import { PolicyComponent } from './edit-project/components/project-settings/task-notifications/policy/policy.component';
import { ProcoreWebhookComponent } from './edit-project/components/project-settings/procore-webhook/procore-webhook.component';
import { ProjectDirectoryComponent } from './edit-project/components/project-settings/project-directory/project-directory.component';
import { SetGanttAccessDialog } from './edit-project/components/project-settings/project-directory/dialogs/set-gantt-access.dialog';
import { ResourcesManagementComponent } from './edit-project/components/pipe-tasks/resources-management/resources-management.component';
import { AddResourceDialog } from './edit-project/components/pipe-tasks/resources-management/add-resource.dialog';
import { CreateDocumentPipeComponent } from './edit-project/components/document-pipes/create-document-pipe/create-document-pipe.component';

@NgModule({
    imports: [
        MaterialModule.forRoot(),
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        CybercoNg2Module,
        routing
    ],
    providers: [
        CanDeactivateChart
    ],
    exports: [],
    declarations: [
        IndexComponent,
        SyncSessionsComponent,
        SyncSessionsListComponent,
        SyncSessionRowComponent,
        ItemChangesComponent,
        ItemChangesDetailComponent,
        ItemChangesRowComponent,
        CreateProjectComponent,
        PipeRowComponent,
        EditProjectComponent,
        PipeStepRowComponent,
        PipePublicTodoComponent,

        ProcoreWebhookComponent,

        PipeTasksTodoComponent,
        SmartsheetConnectionTasksComponent,
        TasksSettingsComponent,

        PipePrivateTodoComponent,
        ProjectSettingsComponent,
        SmartsheetConnectionPublicComponent,
        SmartsheetConnectionPrivateComponent,
        SmartsheetConnectionComponent,
        ScheduleConnectionComponent,
        ColumnsMatchingComponent,
        StatusRowComponent,
        DeleteProjectComponent,
        PipeSettingsPrivateComponent,
        PipeSettingsPublicComponent,
        PipeSettingsComponent,
        TaskNotificationsComponent,
        PolicyComponent,

        PipeDeleteComponent,
        WorkspaceManagementComponent,

        SmartsheetScheduleChooseComponent,

        PrimaryBillingUser,
        ChartComponent,
        ChartWorkingDaysComponent,
        CreateBaselineDialog,

        ProjectDirectoryComponent,
        SetGanttAccessDialog,

        ResourcesManagementComponent,
        AddResourceDialog,

        CreateDocumentPipeComponent

    ],
    entryComponents: [
        CreateBaselineDialog,
        AddResourceDialog,
        SetGanttAccessDialog
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class ProjectsModule {
}