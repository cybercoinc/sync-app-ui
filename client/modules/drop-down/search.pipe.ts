import { Pipe, Injectable, PipeTransform } from "@angular/core";
import { DropDownItemComponent } from "./drop-down-item.component";

@Pipe({
    name: 'search'
})
@Injectable()
export class SearchPipe implements PipeTransform {
    transform(items, search: string): any {
        return items.filter(item => {
            if (!search) {
                return item;
            }

            return item.toString().toLowerCase().indexOf(search.toString().toLowerCase()) > -1;
        });
    }
}