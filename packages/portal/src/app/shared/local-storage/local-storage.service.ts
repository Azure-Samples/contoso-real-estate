import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {

  prefix = "contoso";

  save(key: string, value: object) {
    localStorage.setItem(this.formatKey(key), JSON.stringify(value));
  }

  read(key: string) {
    return JSON.parse(localStorage.getItem(this.formatKey(key)) || "{}");
  }
  remove(key: string) {
    localStorage.removeItem(this.formatKey(key));
  }

  clear() {
    localStorage.clear();
  }

  private formatKey(key: string) {
    return `${this.prefix}@${key}`;
  }
}
