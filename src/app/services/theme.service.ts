import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeEmitter: Subject<string> = new Subject<string>();

  private themes = {
    "default": "",
    "bubble": "https://images.unsplash.com/photo-1519751138087-5bf79df62d5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "pinky": "https://images.unsplash.com/photo-1563291074-2bf8677ac0e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=951&q=80",
    "pineapple": "https://images.unsplash.com/photo-1471286274405-579f8d7132d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    "3dshape": "https://images.unsplash.com/photo-1454117096348-e4abbeba002c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  }
  constructor() { }

  getAllThemes() {
    const tempArr = [];
    for(const key in this.themes) {
      if (this.themes.hasOwnProperty(key)) {
        tempArr.push(key);
      }
    }
    return tempArr;
  }

  getThemeEmitter() {
    return this.themeEmitter.asObservable();
  }

  setCurrentTheme(themeName: string) {
    if (!(themeName in this.themes)) {
      return;
    }
    localStorage.setItem("theme", themeName);
    this.themeEmitter.next(themeName);
  }

  getCurrentTheme() {
    const themeName = localStorage.getItem("theme");
    if (themeName == null) {
      return "default"
    }
    return themeName;
  }

  getThemeUrlByName(themeName) {
    return this.themes[themeName];
  }

  getCurrentThemeUrl() {
    const themeName = localStorage.getItem("theme");
    if (themeName == null || ! (themeName in this.themes)) {
      return null;
    } 
    return this.themes[themeName];
  }
}
