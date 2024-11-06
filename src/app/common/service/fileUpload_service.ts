import { Injectable } from "@angular/core";
import { NextCallback, ErrorCallback, ServiceHelper } from "../../common/service/service.helper";
import { ErrorModel } from "../../common/models/common/error.model";
import { TokenModel } from "../../auth/models/token.model";
import { FileUploaderModel } from "../models/common/file-uploader.model";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})

export class FileUploadService {

    constructor(private _: ServiceHelper) { }

    public Upload_file(callback: NextCallback<TokenModel>, error: ErrorCallback<HttpErrorResponse>, files: Array<any>) {

        const subscription = this._.api().url('general/upload')
            .sendFile(this.to_file_array(files, 'files') , new Date().getTime(), (p:any) => {
            }).subscribe({
                next:(response) => {
                    
                    if (callback)
                    callback(response)
                  }, 
                error: (e:HttpErrorResponse) => {
                    if (error)
                      error(e)
                  }
            });
            
    }



    private to_file_array(files:Array<File>, _payload_name:string): Array<FileUploaderModel> {
        
         var arr_files:Array<FileUploaderModel> = []
        
        for (const f of files) {
            arr_files.push({_name:_payload_name, payload:f})
        }

        return arr_files
    }







}