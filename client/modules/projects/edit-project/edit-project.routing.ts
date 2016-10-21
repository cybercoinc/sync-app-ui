import {Routes, RouterModule} from '@angular/router';
import {EditProjectComponent} from './edit-project.component';
import {PipePublicTodoComponent} from './components/pipe-public-todo.component';
import {PipePrivateTodoComponent} from './components/pipe-private-todo.component';

export const routes: Routes = [
    {
        path: 'projects/:project_id/edit-project',
        component: EditProjectComponent,
        children: [
            {
                path: '',
                redirectTo: 'pipe-public-todo'
            },

            {
                path: 'pipe-private-todo',
                component: PipePrivateTodoComponent
            },

            {
                path: 'pipe-public-todo',
                component: PipePublicTodoComponent,
            },
        ]
    },
];

export const editProjectRouting = RouterModule.forChild(routes);