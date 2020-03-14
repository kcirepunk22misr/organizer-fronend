import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private _http: HttpClient) { 
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
    return new Promise(function(resolve, reject) {

      var formData = new FormData();
      var xhr = new XMLHttpRequest();

      for(var i = 0; i < files.length; i++){
        formData.append(name, files[i], files[i].name);
      }

      xhr.onreadystatechange = function(){
        if(xhr.readyState == 4) {
          if(xhr.status == 200){
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      }

      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }

  createdInventory(inventory) {
    return this._http.post(`${environment.url}/inventory/add-inventory`, inventory);
  }

  getToolsById(id: string) {
    return this._http.get(`${environment.url}/inventory/inventory/${id}`)
               .pipe(
                map((resp: any) => {
                  resp = resp.inventory;
                  return resp;
                })
               )
  }

  getTools() {
    return this._http.get(`${environment.url}/inventory/inventorys`)
  }

  updateTool(inventory) {
    return this._http.put(`${environment.url}/inventory/update-inventory`, inventory);
  }

  deleteTools(inventory) {
    return this._http.put(`${environment.url}/inventory/delete-inventory`, inventory);
  }

  search(busqueda) {
    return this._http.get(`${environment.url}/inventory/tools/${busqueda}`)
               .pipe(
                 map((tools:any) => {
                  tools = tools.tools;
                  return tools;
                 })
               )
  }

}
