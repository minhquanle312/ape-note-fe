import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { NotesContainerComponent } from './components/notes-container/notes-container.component';

import {
  DeleteOutline,
  StepBackwardOutline,
} from '@ant-design/icons-angular/icons';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CallbackPipe } from 'src/app/pipes/callback.pipe';
import { HighLightStringPipe } from 'src/app/pipes/highlight-string.pipe';
import { NoteActionsComponent } from './components/note-actions/note-actions.component';

const icons: any[] = [StepBackwardOutline, DeleteOutline];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    HeaderComponent,
    HomeComponent,
    NoteFormComponent,
    NotesContainerComponent,
    NoteCardComponent,
    HighLightStringPipe,
    CallbackPipe,
    NoteActionsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NzCardModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzButtonModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzTypographyModule,
    NzMenuModule,
    NzIconModule.forChild(icons),
  ],
})
export class AdminModule {}
