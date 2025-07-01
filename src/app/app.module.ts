import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { AudioVisualizerComponent } from './components/audio-visualizer/audio-visualizer.component';
import { AudioControlsComponent } from './components/audio-controls/audio-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    PlaylistComponent,
    AudioVisualizerComponent,
    AudioControlsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
