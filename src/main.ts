import 'zone.js';
import '@angular/compiler';
import './index.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) =>
  console.error('Angular bootstrap failed:', err)
);
