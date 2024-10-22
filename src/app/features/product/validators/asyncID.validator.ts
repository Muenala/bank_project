import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { catchError, map, of, switchMap, timer } from "rxjs";
import { ProductService } from "../services/product.service";

export function AsyncID(
    productService: ProductService,
    isEditMode: boolean = true,
    id: string = ""
): AsyncValidatorFn {
    return (control: AbstractControl) => {
        return timer(500).pipe(
            switchMap(() =>
                productService.getProduct(control.value).pipe(
                    map(isTaken => ( isEditMode?(isTaken ? { "uniqueId": true } : null):isTaken.id!=id? { "uniqueId": true } : null)))
            ),    catchError(() => of(null)))
    };
}